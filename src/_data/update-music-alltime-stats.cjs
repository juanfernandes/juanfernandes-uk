/* scripts/update-music-alltime-stats.cjs */
const fs = require("node:fs");
const path = require("node:path");

const API_KEY = process.env.LASTFM_API_KEY;
const USER = process.env.LASTFM_USER;

if (!API_KEY || !USER) {
  console.error("Missing LASTFM_API_KEY or LASTFM_USER env vars");
  process.exit(1);
}

const OUT_FILE = path.join(process.cwd(), "src", "_data", "musicAllTimeStats.json");

function lastfmUrl(method, params = {}) {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", method);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    url.searchParams.set(k, String(v));
  });
  return url.toString();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isRetryableStatus(status) {
  return status === 429 || (status >= 500 && status <= 599);
}

/**
 * Fetch JSON with retries + exponential backoff.
 * Last.fm can throw intermittent 500s on deep pages.
 */
async function fetchJson(url, { retries = 6, baseDelayMs = 600 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": "juanfernandes.uk (all-time stats)" }
    });

    if (res.ok) return res.json();

    const status = res.status;

    // Try to capture a small snippet for debugging (don’t spam logs)
    let snippet = "";
    try {
      snippet = (await res.text()).slice(0, 200);
    } catch {}

    const retryable = isRetryableStatus(status);
    const lastAttempt = attempt === retries;

    if (!retryable || lastAttempt) {
      throw new Error(`HTTP ${status} for ${url}${snippet ? `\n${snippet}` : ""}`);
    }

    const jitter = Math.floor(Math.random() * 250);
    const delay = baseDelayMs * Math.pow(2, attempt) + jitter;

    console.log(
      `[lastfm] HTTP ${status} (attempt ${attempt + 1}/${retries + 1}) — retrying in ${delay}ms`
    );
    await sleep(delay);
  }

  throw new Error(`Exhausted retries for ${url}`);
}

async function countAllPages({ method, listPath, attrPath }) {
  // listPath: e.g. ["toptracks","track"]
  // attrPath: e.g. ["toptracks","@attr"]

  // 1000 can work, but big payloads + rapid paging increases 500s.
  // 500 is a good compromise; adjust if you want.
  const limit = 500;

  let page = 1;
  let totalPages = 1;
  let totalCount = 0;

  // If Last.fm is flaky mid-run, stop early rather than failing the whole build.
  let failures = 0;
  const MAX_FAILURES = 2;

  while (page <= totalPages) {
    const url = lastfmUrl(method, {
      user: USER,
      period: "overall",
      limit,
      page
    });

    let data;
    try {
      data = await fetchJson(url);
      failures = 0;
    } catch (err) {
      failures += 1;
      console.error(`[lastfm] Failed page ${page}/${totalPages} for ${method}: ${err.message}`);

      if (failures >= MAX_FAILURES) {
        console.error(`[lastfm] Too many failures. Stopping early at page ${page}.`);
        break;
      }

      // brief pause before trying next loop iteration (or you could retry same page)
      await sleep(1500);
      continue;
    }

    // Read list
    let list = data;
    for (const k of listPath) list = list?.[k];
    const items = Array.isArray(list) ? list : [];

    // Read paging attr
    let attr = data;
    for (const k of attrPath) attr = attr?.[k];
    totalPages = Number(attr?.totalPages || 1);

    totalCount += items.length;
    page += 1;

    // Polite pacing (also reduces intermittent 500s)
    await sleep(350);
  }

  return totalCount;
}

(async () => {
  const artists = await countAllPages({
    method: "user.getTopArtists",
    listPath: ["topartists", "artist"],
    attrPath: ["topartists", "@attr"]
  });

  const albums = await countAllPages({
    method: "user.getTopAlbums",
    listPath: ["topalbums", "album"],
    attrPath: ["topalbums", "@attr"]
  });

  const tracks = await countAllPages({
    method: "user.getTopTracks",
    listPath: ["toptracks", "track"],
    attrPath: ["toptracks", "@attr"]
  });

  const out = {
    updatedAt: new Date().toISOString(),
    artists,
    albums,
    tracks
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log("Wrote", OUT_FILE, out);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
