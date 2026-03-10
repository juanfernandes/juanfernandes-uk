/* scripts/add-tv-season.cjs
 *
 * Add all episodes from a TMDb TV season to src/_data/watchlog.json
 *
 * Usage:
 *   TMDB_API_KEY=xxx node scripts/add-tv-season.cjs <tmdbId> <seasonNumber> <startDate>
 *
 * Example:
 *   TMDB_API_KEY=xxx node scripts/add-tv-season.cjs 1396 1 2026-03-01
 *
 * What it does:
 * - fetches season details from TMDb
 * - creates one watchlog entry per episode
 * - sets watchedOn sequentially from startDate
 * - skips duplicates already in watchlog.json
 * - keeps your existing { entries: [...] } structure
 */

const fs = require("node:fs");
const path = require("node:path");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
if (!TMDB_API_KEY) {
  console.error("Missing TMDB_API_KEY env var");
  process.exit(1);
}

const [, , tmdbIdArg, seasonArg, startDateArg] = process.argv;

if (!tmdbIdArg || !seasonArg || !startDateArg) {
  console.error(
    "Usage: TMDB_API_KEY=xxx node scripts/add-tv-season.cjs <tmdbId> <seasonNumber> <startDate>\n" +
      "Example: TMDB_API_KEY=xxx node scripts/add-tv-season.cjs 1396 1 2026-03-01"
  );
  process.exit(1);
}

const tmdbId = Number(tmdbIdArg);
const seasonNumber = Number(seasonArg);
const startDate = startDateArg;

if (!Number.isInteger(tmdbId) || tmdbId <= 0) {
  console.error("tmdbId must be a positive integer");
  process.exit(1);
}

if (!Number.isInteger(seasonNumber) || seasonNumber < 0) {
  console.error("seasonNumber must be an integer >= 0");
  process.exit(1);
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
  console.error("startDate must be YYYY-MM-DD");
  process.exit(1);
}

const WATCHLOG_FILE = path.join(process.cwd(), "src", "_data", "watchlog.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function addDays(isoDate, days) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function entryKey(entry) {
  return [
    entry.type,
    entry.tmdbId,
    entry.season ?? "",
    entry.episode ?? "",
    entry.watchedOn ?? ""
  ].join("|||");
}

function tmdbUrl(pathname) {
  const url = new URL(`https://api.themoviedb.org/3/${pathname}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  return url.toString();
}

function isRetryable(status) {
  return status === 429 || (status >= 500 && status <= 599);
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, { retries = 5, baseDelayMs = 500 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": "juanfernandes.uk (watchlog season import)" }
    });

    if (res.ok) return res.json();

    if (!isRetryable(res.status) || attempt === retries) {
      const body = await res.text().catch(() => "");
      throw new Error(`TMDb HTTP ${res.status} for ${url}\n${body.slice(0, 250)}`);
    }

    const delay = baseDelayMs * Math.pow(2, attempt) + Math.floor(Math.random() * 250);
    console.log(`[tmdb] HTTP ${res.status}, retrying in ${delay}ms`);
    await sleep(delay);
  }
}

async function getSeasonDetails(showId, seasonNum) {
  return fetchJson(tmdbUrl(`tv/${showId}/season/${seasonNum}`));
}

function sortWatchlogEntries(entries) {
  return entries.slice().sort((a, b) => {
    // newest watched first
    if ((a.watchedOn || "") > (b.watchedOn || "")) return -1;
    if ((a.watchedOn || "") < (b.watchedOn || "")) return 1;

    // movies before tv only as a stable-ish tiebreaker
    if ((a.type || "") > (b.type || "")) return 1;
    if ((a.type || "") < (b.type || "")) return -1;

    // then show/movie id, season, episode
    if ((a.tmdbId || 0) !== (b.tmdbId || 0)) return (a.tmdbId || 0) - (b.tmdbId || 0);
    if ((a.season || 0) !== (b.season || 0)) return (a.season || 0) - (b.season || 0);
    return (a.episode || 0) - (b.episode || 0);
  });
}

(async () => {
  if (!fs.existsSync(WATCHLOG_FILE)) {
    throw new Error(`Watchlog not found: ${WATCHLOG_FILE}`);
  }

  const watchlog = readJson(WATCHLOG_FILE);
  const entries = Array.isArray(watchlog?.entries) ? watchlog.entries : [];

  const season = await getSeasonDetails(tmdbId, seasonNumber);

  const showName = season?.name || `TMDb show ${tmdbId}`;
  const episodes = Array.isArray(season?.episodes) ? season.episodes : [];

  if (episodes.length === 0) {
    throw new Error(`No episodes found for tmdbId=${tmdbId} season=${seasonNumber}`);
  }

  // Existing keys so we can skip duplicates
  const existingKeys = new Set(entries.map(entryKey));

  const additions = [];
  let skipped = 0;

  for (let i = 0; i < episodes.length; i++) {
    const ep = episodes[i];
    const episodeNumber = Number(ep?.episode_number);

    if (!Number.isInteger(episodeNumber) || episodeNumber <= 0) {
      continue;
    }

    const watchedOn = addDays(startDate, i);

    const newEntry = {
      type: "tv",
      tmdbId,
      show: showName,
      year: season?.air_date ? Number(String(season.air_date).slice(0, 4)) || null : null,
      poster: season?.poster_path ? `https://image.tmdb.org/t/p/w342${season.poster_path}` : "",
      tmdbUrl: `https://www.themoviedb.org/tv/${tmdbId}`,
      watchedOn,
      season: seasonNumber,
      episode: episodeNumber,
      rewatch: false
    };

    if (newEntry.year === null) {
      delete newEntry.year;
    }
    if (!newEntry.poster) {
      delete newEntry.poster;
    }

    const key = entryKey(newEntry);
    if (existingKeys.has(key)) {
      skipped++;
      continue;
    }

    additions.push(newEntry);
    existingKeys.add(key);
  }

  const updated = sortWatchlogEntries(entries.concat(additions));
  writeJson(WATCHLOG_FILE, { ...watchlog, entries: updated });

  console.log(`Show: ${showName}`);
  console.log(`Season: ${seasonNumber}`);
  console.log(`Episodes in season: ${episodes.length}`);
  console.log(`Added: ${additions.length}`);
  console.log(`Skipped duplicates: ${skipped}`);
  console.log(`Updated file: ${WATCHLOG_FILE}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
