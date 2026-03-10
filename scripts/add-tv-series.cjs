/* scripts/add-tv-series.cjs
 *
 * Add all episodes from multiple TMDb TV seasons to src/_data/watchlog.json
 *
 * Usage:
 *   TMDB_API_KEY=xxx node scripts/add-tv-series.cjs <tmdbId> <startSeason> <endSeason> <startDate>
 *
 * Example:
 *   TMDB_API_KEY=xxx node scripts/add-tv-series.cjs 1396 1 5 2026-03-01
 *
 * What it does:
 * - fetches show details from TMDb
 * - fetches each season in the range
 * - creates one watchlog entry per episode
 * - sets watchedOn sequentially from startDate across the whole run
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

const [, , tmdbIdArg, startSeasonArg, endSeasonArg, startDateArg] = process.argv;

if (!tmdbIdArg || !startSeasonArg || !endSeasonArg || !startDateArg) {
  console.error(
    "Usage: TMDB_API_KEY=xxx node scripts/add-tv-series.cjs <tmdbId> <startSeason> <endSeason> <startDate>\n" +
      "Example: TMDB_API_KEY=xxx node scripts/add-tv-series.cjs 1396 1 5 2026-03-01"
  );
  process.exit(1);
}

const tmdbId = Number(tmdbIdArg);
const startSeason = Number(startSeasonArg);
const endSeason = Number(endSeasonArg);
const startDate = startDateArg;

if (!Number.isInteger(tmdbId) || tmdbId <= 0) {
  console.error("tmdbId must be a positive integer");
  process.exit(1);
}

if (!Number.isInteger(startSeason) || startSeason < 0) {
  console.error("startSeason must be an integer >= 0");
  process.exit(1);
}

if (!Number.isInteger(endSeason) || endSeason < startSeason) {
  console.error("endSeason must be an integer >= startSeason");
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
      headers: { "User-Agent": "juanfernandes.uk (watchlog series import)" }
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

async function getShowDetails(showId) {
  return fetchJson(tmdbUrl(`tv/${showId}`));
}

async function getSeasonDetails(showId, seasonNum) {
  return fetchJson(tmdbUrl(`tv/${showId}/season/${seasonNum}`));
}

function sortWatchlogEntries(entries) {
  return entries.slice().sort((a, b) => {
    if ((a.watchedOn || "") > (b.watchedOn || "")) return -1;
    if ((a.watchedOn || "") < (b.watchedOn || "")) return 1;

    if ((a.type || "") > (b.type || "")) return 1;
    if ((a.type || "") < (b.type || "")) return -1;

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

  const show = await getShowDetails(tmdbId);
  const showName = show?.name || `TMDb show ${tmdbId}`;
  const showYear = show?.first_air_date ? Number(String(show.first_air_date).slice(0, 4)) || null : null;
  const poster = show?.poster_path ? `https://image.tmdb.org/t/p/w342${show.poster_path}` : "";
  const tmdbShowUrl = `https://www.themoviedb.org/tv/${tmdbId}`;

  const existingKeys = new Set(entries.map(entryKey));

  const additions = [];
  let skipped = 0;
  let dayOffset = 0;

  for (let seasonNum = startSeason; seasonNum <= endSeason; seasonNum++) {
    const season = await getSeasonDetails(tmdbId, seasonNum);
    const episodes = Array.isArray(season?.episodes) ? season.episodes : [];

    if (episodes.length === 0) {
      console.log(`Season ${seasonNum}: no episodes found, skipping`);
      continue;
    }

    for (const ep of episodes) {
      const episodeNumber = Number(ep?.episode_number);
      if (!Number.isInteger(episodeNumber) || episodeNumber <= 0) continue;

      const watchedOn = addDays(startDate, dayOffset);
      dayOffset += 1;

      const newEntry = {
        type: "tv",
        tmdbId,
        show: showName,
        watchedOn,
        season: seasonNum,
        episode: episodeNumber,
        rewatch: false,
        tmdbUrl: tmdbShowUrl
      };

      if (showYear !== null) newEntry.year = showYear;
      if (poster) newEntry.poster = poster;

      const key = entryKey(newEntry);
      if (existingKeys.has(key)) {
        skipped++;
        continue;
      }

      additions.push(newEntry);
      existingKeys.add(key);
    }

    await sleep(120);
  }

  const updated = sortWatchlogEntries(entries.concat(additions));
  writeJson(WATCHLOG_FILE, { ...watchlog, entries: updated });

  console.log(`Show: ${showName}`);
  console.log(`Season range: ${startSeason}–${endSeason}`);
  console.log(`Added: ${additions.length}`);
  console.log(`Skipped duplicates: ${skipped}`);
  console.log(`Updated file: ${WATCHLOG_FILE}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
