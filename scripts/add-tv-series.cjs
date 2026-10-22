/* scripts/add-tv-series.cjs
 *
 * Bulk-import TMDb TV episodes as individual files in src/watchlog/.
 * This matches src/_data/watch.cjs, which reads JSON files recursively under src/watchlog/.
 *
 * Usage:
 *   TMDB_API_KEY=xxx node scripts/add-tv-series.cjs <tmdbId> <startSeason> <endSeason> [startDate | --undated]
 *   TMDB_API_KEY=xxx node scripts/add-tv-series.cjs <tmdbId> --all [startDate | --undated]
 *
 * Examples:
 *   TMDB_API_KEY=xxx node scripts/add-tv-series.cjs 1396 --all
 *   TMDB_API_KEY=xxx node scripts/add-tv-series.cjs 1396 1 5
 *   TMDB_API_KEY=xxx node scripts/add-tv-series.cjs 1396 1 5 2026-03-01
 *
 * Dated entries:  src/watchlog/YYYY/tv-1396-s01e01-2026-03-01.json
 * Undated entries: src/watchlog/undated/tv-1396-s01e01.json
 *
 * - No date means watchedOn: null (not 1970-01-01).
 * - Scans ALL existing watchlog JSON files before adding episodes.
 * - Skips episodes already logged when importing without dates.
 * - A dated import can give an existing undated entry a date: the file is
 *   moved to the appropriate year directory, preserving other fields.
 * - Preserves the earlier behaviour of allowing multiple viewings with
 *   different known dates (but never duplicates the exact same viewing).
 * - --all skips season 0 and episodes with known future air dates.
 */

const fs = require("node:fs");
const path = require("node:path");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const WATCHLOG_DIR = path.join(process.cwd(), "src", "watchlog");

if (!TMDB_API_KEY) {
  console.error("Missing TMDB_API_KEY env var");
  process.exit(1);
}

function usage() {
  console.error(
    "Usage:\n" +
      "  TMDB_API_KEY=xxx node scripts/add-tv-series.cjs <tmdbId> <startSeason> <endSeason> [startDate | --undated]\n" +
      "  TMDB_API_KEY=xxx node scripts/add-tv-series.cjs <tmdbId> --all [startDate | --undated]\n" +
      "Examples:\n" +
      "  TMDB_API_KEY=xxx node scripts/add-tv-series.cjs 1396 --all\n" +
      "  TMDB_API_KEY=xxx node scripts/add-tv-series.cjs 1396 1 5\n" +
      "  TMDB_API_KEY=xxx node scripts/add-tv-series.cjs 1396 1 5 2026-03-01"
  );
  process.exit(1);
}

function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

const args = process.argv.slice(2);
const tmdbId = Number(args[0]);
const allSeasons = args[1] === "--all";

if (!args[0] || !Number.isInteger(tmdbId) || tmdbId <= 0) usage();

let startSeason;
let endSeason;
let dateArg;

if (allSeasons) {
  if (args.length > 3) usage();
  dateArg = args[2];
} else {
  if (args.length < 3 || args.length > 4) usage();
  startSeason = Number(args[1]);
  endSeason = Number(args[2]);

  if (!Number.isInteger(startSeason) || startSeason < 0) {
    throw new Error("startSeason must be an integer >= 0");
  }
  if (!Number.isInteger(endSeason) || endSeason < startSeason) {
    throw new Error("endSeason must be an integer >= startSeason");
  }
  dateArg = args[3];
}

if (dateArg && dateArg !== "--undated" && !isValidIsoDate(dateArg)) {
  throw new Error("startDate must be YYYY-MM-DD or --undated");
}
const startDate = dateArg && dateArg !== "--undated" ? dateArg : null;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function addDays(isoDate, days) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function episodeKey(entry) {
  if (entry?.type !== "tv") return null;
  const id = Number(entry.tmdbId);
  const season = Number(entry.season);
  const episode = Number(entry.episode);
  if (!Number.isInteger(id) || !Number.isInteger(season) || !Number.isInteger(episode)) return null;
  return `${id}|${season}|${episode}`;
}

function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
    const filePath = path.join(dir, item.name);
    if (item.isDirectory()) return listJsonFiles(filePath);
    return item.isFile() && item.name.endsWith(".json") ? [filePath] : [];
  });
}

function scanExistingEntries() {
  const records = [];
  for (const filePath of listJsonFiles(WATCHLOG_DIR)) {
    const data = readJson(filePath);
    // watch.cjs supports a JSON array or a single object per file.
    for (const entry of Array.isArray(data) ? data : [data]) {
      if (entry && typeof entry === "object") {
        records.push({ entry, filePath, arrayFile: Array.isArray(data) });
      }
    }
  }
  return records;
}

function tmdbUrl(pathname) {
  const url = new URL(`https://api.themoviedb.org/3/${pathname}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  return url.toString();
}

function isRetryable(status) {
  return status === 429 || (status >= 500 && status <= 599);
}

function sleep(ms) {
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
      throw new Error(`TMDb HTTP ${res.status} for ${new URL(url).pathname}\n${body.slice(0, 250)}`);
    }

    const delay = baseDelayMs * 2 ** attempt + Math.floor(Math.random() * 250);
    console.log(`[tmdb] HTTP ${res.status}, retrying in ${delay}ms`);
    await sleep(delay);
  }
}

function fileBaseName(entry) {
  const s = String(entry.season).padStart(2, "0");
  const e = String(entry.episode).padStart(2, "0");
  return `tv-${entry.tmdbId}-s${s}e${e}${entry.watchedOn ? `-${entry.watchedOn}` : ""}`;
}

function fileDirectory(entry) {
  return path.join(WATCHLOG_DIR, entry.watchedOn ? entry.watchedOn.slice(0, 4) : "undated");
}

// Never overwrite another watchlog file, even if the filename convention differs.
function chooseFilePath(entry, reservedPaths) {
  const directory = fileDirectory(entry);
  const base = fileBaseName(entry);
  let suffix = 1;
  let result;
  do {
    result = path.join(directory, `${base}${suffix === 1 ? "" : `-${suffix}`}.json`);
    suffix++;
  } while (reservedPaths.has(result) || fs.existsSync(result));
  reservedPaths.add(result);
  return result;
}

function writeEntry(filePath, entry) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(entry, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
}

(async () => {
  if (!fs.existsSync(WATCHLOG_DIR)) {
    throw new Error(`Watchlog directory not found: ${WATCHLOG_DIR}`);
  }

  const existingRecords = scanExistingEntries();
  const reservedPaths = new Set(existingRecords.map(({ filePath }) => filePath));
  const existingByEpisode = new Map();

  for (const record of existingRecords) {
    const key = episodeKey(record.entry);
    if (!key) continue;
    if (!existingByEpisode.has(key)) existingByEpisode.set(key, []);
    existingByEpisode.get(key).push(record);
  }

  const show = await fetchJson(tmdbUrl(`tv/${tmdbId}`));
  const showName = show?.name || `TMDb show ${tmdbId}`;
  const showYear = show?.first_air_date
    ? Number(String(show.first_air_date).slice(0, 4)) || null
    : null;
  const poster = show?.poster_path ? `https://image.tmdb.org/t/p/w342${show.poster_path}` : "";
  const tmdbShowUrl = `https://www.themoviedb.org/tv/${tmdbId}`;

  const seasons = allSeasons
    ? [...new Set((Array.isArray(show?.seasons) ? show.seasons : [])
        .map((season) => Number(season?.season_number))
        .filter((num) => Number.isInteger(num) && num > 0))].sort((a, b) => a - b)
    : Array.from({ length: endSeason - startSeason + 1 }, (_, i) => startSeason + i);

  if (!seasons.length) throw new Error(`No seasons available for ${showName}`);

  // Plan changes before touching local files. TMDb failures cannot leave a
  // partially fetched series imported.
  const additions = [];
  const dateUpdates = [];
  let skipped = 0;
  let skippedUpcoming = 0;
  let dayOffset = 0;
  const today = new Date().toISOString().slice(0, 10);

  for (const seasonNum of seasons) {
    const season = await fetchJson(tmdbUrl(`tv/${tmdbId}/season/${seasonNum}`));
    const episodes = Array.isArray(season?.episodes) ? season.episodes : [];

    if (!episodes.length) {
      console.log(`Season ${seasonNum}: no episodes found, skipping`);
      continue;
    }

    for (const ep of episodes) {
      const episodeNumber = Number(ep?.episode_number);
      if (!Number.isInteger(episodeNumber) || episodeNumber <= 0) continue;

      if (allSeasons && ep.air_date && ep.air_date > today) {
        skippedUpcoming++;
        continue;
      }

      const watchedOn = startDate ? addDays(startDate, dayOffset) : null;
      if (startDate) dayOffset++;

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

      const key = episodeKey(newEntry);
      const existing = existingByEpisode.get(key) || [];

      if (!startDate) {
        // For an undated import, any logged viewing means 'already watched'.
        if (existing.length) {
          skipped++;
          continue;
        }
      } else {
        if (existing.some(({ entry }) => entry.watchedOn === watchedOn)) {
          skipped++;
          continue;
        }

        const unknown = existing.find(({ entry }) => !entry.watchedOn);
        if (unknown) {
          if (unknown.arrayFile) {
            throw new Error(`Cannot automatically move an undated entry from an array file: ${unknown.filePath}`);
          }
          const updatedEntry = { ...unknown.entry, watchedOn };
          const destination = chooseFilePath(updatedEntry, reservedPaths);
          dateUpdates.push({ source: unknown.filePath, destination, entry: updatedEntry });
          existing.splice(existing.indexOf(unknown), 1);
          existing.push({ entry: updatedEntry, filePath: destination });
          continue;
        }
      }

      const destination = chooseFilePath(newEntry, reservedPaths);
      additions.push({ destination, entry: newEntry });
      existing.push({ entry: newEntry, filePath: destination });
      existingByEpisode.set(key, existing);
    }

    await sleep(120);
  }

  for (const { destination, entry } of additions) {
    writeEntry(destination, entry);
  }
  for (const { source, destination, entry } of dateUpdates) {
    writeEntry(destination, entry);
    fs.unlinkSync(source);
  }

  console.log(`Show: ${showName}`);
  console.log(`Seasons: ${allSeasons ? "all numbered seasons" : `${startSeason}–${endSeason}`}`);
  console.log(`Watch dates: ${startDate ? `sequentially from ${startDate}` : "unknown (undated)"}`);
  console.log(`Added: ${additions.length}`);
  console.log(`Skipped duplicates: ${skipped}`);
  if (dateUpdates.length) console.log(`Existing dates filled in: ${dateUpdates.length}`);
  if (skippedUpcoming) console.log(`Skipped upcoming episodes: ${skippedUpcoming}`);
  console.log(`Files saved under: ${WATCHLOG_DIR}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
