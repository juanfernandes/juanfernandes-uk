/* scripts/enrich-watchlog-tmdb.cjs */
const fs = require("node:fs");
const path = require("node:path");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
if (!TMDB_API_KEY) {
  console.error("Missing TMDB_API_KEY env var");
  process.exit(1);
}

const WATCHLOG_FILE = path.join(process.cwd(), "src", "_data", "watchlog.json");

const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "tmdb-details.json");
const FORCE = String(process.env.TMDB_FORCE_REFRESH || "").toLowerCase() === "true";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function tmdbUrl(pathname) {
  const url = new URL(`https://api.themoviedb.org/3/${pathname}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  return url.toString();
}

function isRetryable(status) {
  return status === 429 || (status >= 500 && status <= 599);
}

async function fetchJson(url, { retries = 6, baseDelayMs = 600 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": "juanfernandes.uk (watchlog enrich)" }
    });

    if (res.ok) return res.json();

    const status = res.status;
    if (!isRetryable(status) || attempt === retries) {
      const body = await res.text().catch(() => "");
      throw new Error(`TMDb HTTP ${status} for ${url}\n${body.slice(0, 250)}`);
    }

    const jitter = Math.floor(Math.random() * 250);
    const delay = baseDelayMs * Math.pow(2, attempt) + jitter;
    console.log(`[tmdb] HTTP ${status} (attempt ${attempt + 1}/${retries + 1}) — retrying in ${delay}ms`);
    await sleep(delay);
  }
}

function yearFromDate(s) {
  if (!s || typeof s !== "string") return null;
  const m = s.match(/^(\d{4})-/);
  return m ? Number(m[1]) : null;
}

function needsEnrich(entry) {
  if (!entry || !entry.tmdbId || !entry.type) return false;

  if (entry.type === "movie") {
    return !entry.title || !entry.year || !entry.tmdbUrl;
  }

  if (entry.type === "tv") {
    return !entry.show || !entry.year || !entry.tmdbUrl;
  }

  return false;
}

function cacheKey(entry) {
  return `${entry.type}:${entry.tmdbId}`;
}

async function getDetails(entry, cache) {
  const key = cacheKey(entry);
  if (!FORCE && cache[key]) return cache[key];

  const endpoint = entry.type === "movie" ? `movie/${entry.tmdbId}` : `tv/${entry.tmdbId}`;
  const data = await fetchJson(tmdbUrl(endpoint));

  cache[key] = data;
  return data;
}

(async () => {
  ensureDir(CACHE_DIR);

  const watchlog = readJson(WATCHLOG_FILE);
  const entries = Array.isArray(watchlog?.entries) ? watchlog.entries : [];

  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cache = readJson(CACHE_FILE);
    } catch {
      cache = {};
    }
  }

  let enrichedCount = 0;

  for (const e of entries) {
    if (!needsEnrich(e)) continue;

    const details = await getDetails(e, cache);

    if (e.type === "movie") {
      e.title = e.title || details?.title || "";
      e.year = e.year || yearFromDate(details?.release_date) || null;
      e.poster = e.poster || (details?.poster_path ? `https://image.tmdb.org/t/p/w342${details.poster_path}` : "");
      e.tmdbUrl = e.tmdbUrl || `https://www.themoviedb.org/movie/${e.tmdbId}`;
    }

    if (e.type === "tv") {
      e.show = e.show || details?.name || "";
      e.year = e.year || yearFromDate(details?.first_air_date) || null;
      e.poster = e.poster || (details?.poster_path ? `https://image.tmdb.org/t/p/w342${details.poster_path}` : "");
      e.tmdbUrl = e.tmdbUrl || `https://www.themoviedb.org/tv/${e.tmdbId}`;
    }

    enrichedCount += 1;

    // be polite to TMDb
    await sleep(120);
  }

  writeJson(CACHE_FILE, cache);
  writeJson(WATCHLOG_FILE, { ...watchlog, entries });

  console.log(`Enriched ${enrichedCount} entries`);
  console.log(`Updated: ${WATCHLOG_FILE}`);
  console.log(`Cache: ${CACHE_FILE}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
