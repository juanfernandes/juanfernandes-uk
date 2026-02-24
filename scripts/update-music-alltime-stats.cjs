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

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "juanfernandes.uk (all-time stats)" }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function countAllPages({ method, listPath, attrPath }) {
  // listPath: e.g. ["toptracks","track"]
  // attrPath: e.g. ["toptracks","@attr"]
  const limit = 1000; // Last.fm supports limits; if they cap lower, it'll still work.
  let page = 1;
  let totalPages = 1;
  let totalCount = 0;

  while (page <= totalPages) {
    const url = lastfmUrl(method, {
      user: USER,
      period: "overall",
      limit,
      page
    });

    const data = await fetchJson(url);

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

    // Small delay to be polite / reduce chance of rate limiting
    await new Promise((r) => setTimeout(r, 150));
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
