/* scripts/import-letterboxd-watchlog.cjs */
const fs = require("node:fs");
const path = require("node:path");
const { parse } = require("csv-parse/sync");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
if (!TMDB_API_KEY) {
  console.error("Missing TMDB_API_KEY env var");
  process.exit(1);
}

// ---- Paths (edit if yours differ) ----
const IN_DIR = process.cwd(); // assuming you run in repo root
const WATCHED_CSV = path.join(IN_DIR, "watched.csv");
const RATINGS_CSV = path.join(IN_DIR, "ratings.csv");
const REVIEWS_CSV = path.join(IN_DIR, "reviews.csv");

const OUT_FILE = path.join(process.cwd(), "src", "_data", "watchlogData.json");

// Cache TMDb lookups so you don’t hammer the API
const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "tmdb-map.json");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readCsv(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return parse(raw, { columns: true, skip_empty_lines: true });
}

function normStr(s) {
  return String(s ?? "").trim();
}

function normKey(row) {
  // Letterboxd URI is the best join key across files
  // (export uses exact same URI in watched/ratings/reviews)
  return normStr(row["Letterboxd URI"]);
}

function parseRating(v) {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

async function tmdbSearchMovie({ title, year }) {
  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("query", title);
  if (year) url.searchParams.set("year", String(year));

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "juanfernandes.uk (Letterboxd import)" }
  });
  if (!res.ok) throw new Error(`TMDb HTTP ${res.status} for ${title} (${year})`);

  const data = await res.json();
  const results = Array.isArray(data?.results) ? data.results : [];
  return results;
}

function pickBestMatch(results, { title, year }) {
  if (!results.length) return null;

  const titleLc = title.toLowerCase();

  // Prefer exact title match + year match
  const exact = results.find((r) => {
    const rTitle = String(r?.title || "").toLowerCase();
    const rYear = (r?.release_date || "").slice(0, 4);
    return rTitle === titleLc && (!year || rYear === String(year));
  });
  if (exact?.id) return exact;

  // Otherwise: same year if possible, highest popularity
  const sameYear = year
    ? results.filter((r) => (r?.release_date || "").slice(0, 4) === String(year))
    : results;

  const pool = sameYear.length ? sameYear : results;

  pool.sort((a, b) => (b?.popularity || 0) - (a?.popularity || 0));
  return pool[0] || null;
}

async function resolveTmdbId(cache, { title, year, lbUri }) {
  const cacheKey = `${title}|||${year || ""}|||${lbUri || ""}`;
  if (cache[cacheKey]) return cache[cacheKey];

  const results = await tmdbSearchMovie({ title, year });
  const best = pickBestMatch(results, { title, year });

  const tmdbId = best?.id || null;
  cache[cacheKey] = tmdbId;

  return tmdbId;
}

(async () => {
  ensureDir(CACHE_DIR);

  const watched = readCsv(WATCHED_CSV);
  const ratings = fs.existsSync(RATINGS_CSV) ? readCsv(RATINGS_CSV) : [];
  const reviews = fs.existsSync(REVIEWS_CSV) ? readCsv(REVIEWS_CSV) : [];

  // Index ratings/reviews by Letterboxd URI
  const ratingsByUri = Object.fromEntries(
    ratings.map((r) => [normKey(r), r])
  );
  const reviewsByUri = Object.fromEntries(
    reviews.map((r) => [normKey(r), r])
  );

  // Load cache
  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    try { cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8")); } catch {}
  }

  const entries = [];
  let missing = 0;

  for (const w of watched) {
    const lbUri = normKey(w);
    const title = normStr(w.Name);
    const year = w.Year ? Number(w.Year) : null;
    const watchedOn = normStr(w.Date);

    const review = reviewsByUri[lbUri];
    const ratingRow = ratingsByUri[lbUri];

    const rating =
      parseRating(review?.Rating) ??
      parseRating(ratingRow?.Rating);

    const rewatchRaw = review?.Rewatch;
    const rewatch =
      typeof rewatchRaw === "boolean"
        ? rewatchRaw
        : String(rewatchRaw || "").toLowerCase() === "yes" ||
          String(rewatchRaw || "").toLowerCase() === "true";

    const tmdbId = await resolveTmdbId(cache, { title, year, lbUri });

    if (!tmdbId) missing++;

    const out = {
      type: "movie",
      tmdbId: tmdbId || null,
      watchedOn
    };

    if (rating !== null) out.rating = rating;
    out.rewatch = Boolean(rewatch);

    entries.push(out);

    // tiny delay to be polite
    await new Promise((r) => setTimeout(r, 120));
  }

  // write cache + output
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
  fs.writeFileSync(
    OUT_FILE,
    JSON.stringify({ entries }, null, 2) + "\n",
    "utf8"
  );

  console.log(`Wrote ${OUT_FILE}`);
  console.log(`Total watched rows: ${entries.length}`);
  console.log(`Missing TMDb matches: ${missing}`);
  console.log(`TMDb cache: ${CACHE_FILE}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
