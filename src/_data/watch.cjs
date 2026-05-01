const fs = require("node:fs");
const path = require("node:path");

const CACHE_DIR = path.join(process.cwd(), ".cache", "tmdb");
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const TMDB_REQUEST_DELAY_MS = 300;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cachePath(type, id) {
  return path.join(CACHE_DIR, `${type}-${id}.json`);
}

function isFresh(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return Date.now() - stat.mtimeMs < ONE_WEEK_MS;
  } catch {
    return false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, attempts = 6) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const res = await fetch(url, { headers: { accept: "application/json" } });

    if (res.ok) {
      return res.json();
    }

    if (res.status === 429 && attempt < attempts) {
      const retryAfter = Number(res.headers.get("retry-after"));
      const delay = Number.isFinite(retryAfter)
        ? retryAfter * 1000
        : attempt * 1500;

      console.warn(`[tmdb] Rate limited. Retrying in ${delay}ms...`);
      await sleep(delay);
      continue;
    }

    if (res.status >= 500 && attempt < attempts) {
      const delay = attempt * 1000;
      console.warn(`[tmdb] HTTP ${res.status}. Retrying in ${delay}ms...`);
      await sleep(delay);
      continue;
    }

    throw new Error(`TMDb fetch failed: ${res.status} ${url}`);
  }

  throw new Error(`TMDb fetch failed after ${attempts} attempts: ${url}`);
}

async function tmdbGet(type, id, apiKey) {
  ensureDir(CACHE_DIR);
  const fp = cachePath(type, id);

  if (isFresh(fp)) {
    return JSON.parse(fs.readFileSync(fp, "utf8"));
  }

  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-GB`;

  const data = await fetchJson(url);

  fs.writeFileSync(fp, JSON.stringify(data, null, 2), "utf8");

  await sleep(TMDB_REQUEST_DELAY_MS);

  return data;
}

async function buildMetaMap(type, ids, apiKey) {
  const entries = [];

  for (const id of ids) {
    try {
      const data = await tmdbGet(type, id, apiKey);
      entries.push([id, data]);
    } catch (error) {
      console.warn(`[watch] Failed to fetch TMDb ${type}/${id}: ${error.message}`);
      entries.push([id, {}]);
    }
  }

  return Object.fromEntries(entries);
}

const yearFromISO = (d) => String(d || "").slice(0, 4);

const sortByWatchedDesc = (a, b) =>
  a.watchedOn > b.watchedOn ? -1 : a.watchedOn < b.watchedOn ? 1 : 0;

function readWatchlogEntries() {
  const rootDir = path.join(process.cwd(), "src", "watchlog");

  if (!fs.existsSync(rootDir)) {
    return [];
  }

  function readJsonFiles(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return readJsonFiles(fullPath);
      }

      if (!entry.name.endsWith(".json")) {
        return [];
      }

      return JSON.parse(fs.readFileSync(fullPath, "utf8"));
    });
  }

  return readJsonFiles(rootDir);
}

function groupByYear(items) {
  return items.reduce((acc, item) => {
    const y = yearFromISO(item.watchedOn);
    if (!y) return acc;
    (acc[y] ??= []).push(item);
    return acc;
  }, {});
}

function groupTvByShowThenSeason(tvEpisodes) {
  const grouped = {};

  for (const ep of tvEpisodes) {
    const key = String(ep.tmdbId);

    grouped[key] ??= {
      tmdbId: ep.tmdbId,
      show: ep.show,
      tmdbUrl: ep.tmdbUrl,
      poster: ep.poster || "",
      year: ep.year || null,
      seasons: {}
    };

    (grouped[key].seasons[ep.season] ??= []).push(ep);
  }

  for (const showId of Object.keys(grouped)) {
    for (const seasonNum of Object.keys(grouped[showId].seasons)) {
      grouped[showId].seasons[seasonNum].sort((a, b) => {
        if ((a.watchedOn || "") > (b.watchedOn || "")) return -1;
        if ((a.watchedOn || "") < (b.watchedOn || "")) return 1;
        return (a.episode || 0) - (b.episode || 0);
      });
    }
  }

  return Object.values(grouped).sort((a, b) => {
    const aLatest = Math.max(
      ...Object.values(a.seasons).flat().map((ep) => Date.parse(ep.watchedOn || "") || 0)
    );
    const bLatest = Math.max(
      ...Object.values(b.seasons).flat().map((ep) => Date.parse(ep.watchedOn || "") || 0)
    );

    return bLatest - aLatest;
  });
}

function buildTvStatsByYear(tvByYear) {
  const out = {};

  for (const year of Object.keys(tvByYear)) {
    const episodes = Array.isArray(tvByYear[year]) ? tvByYear[year] : [];
    const shows = new Set(episodes.map((ep) => ep.tmdbId).filter(Boolean));

    out[year] = {
      episodes: episodes.length,
      shows: shows.size
    };
  }

  return out;
}

function buildMovieStatsByYear(moviesByYear) {
  const out = {};

  for (const year of Object.keys(moviesByYear)) {
    const films = Array.isArray(moviesByYear[year]) ? moviesByYear[year] : [];

    out[year] = {
      films: films.length
    };
  }

  return out;
}

module.exports = async function () {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("Missing TMDB_API_KEY env var (set locally and in GitHub Secrets).");
  }

  const watchlog = readWatchlogEntries();

  const moviesRaw = watchlog.filter(
    (x) => x.type === "movie" || x.displayAs === "movie"
  );

  const tvRaw = watchlog.filter(
    (x) => x.type === "tv" && x.displayAs !== "movie"
  );

  const uniqueMovieIds = [
    ...new Set(
      watchlog
        .filter((x) => x.type === "movie")
        .map((x) => x.tmdbId)
        .filter(Boolean)
    )
  ];

  const uniqueTvIds = [
    ...new Set(
      watchlog
        .filter((x) => x.type === "tv")
        .map((x) => x.tmdbId)
        .filter(Boolean)
    )
  ];

  const movieMeta = await buildMetaMap("movie", uniqueMovieIds, apiKey);
  const tvMeta = await buildMetaMap("tv", uniqueTvIds, apiKey);

  const movies = moviesRaw
    .map((x) => {
      const meta = x.type === "tv" ? (tvMeta[x.tmdbId] || {}) : (movieMeta[x.tmdbId] || {});
      const isTvSource = x.type === "tv";

      return {
        ...x,
        title: x.title || meta.title || meta.name || x.show || "",
        show: x.show || meta.name || "",
        year: x.year || (
          isTvSource
            ? (meta.first_air_date ? Number(String(meta.first_air_date).slice(0, 4)) : null)
            : (meta.release_date ? Number(String(meta.release_date).slice(0, 4)) : null)
        ),
        poster:
          x.poster ||
          (meta.poster_path ? `https://image.tmdb.org/t/p/w342${meta.poster_path}` : ""),
        tmdbUrl: x.tmdbUrl || `https://www.themoviedb.org/${isTvSource ? "tv" : "movie"}/${x.tmdbId}`
      };
    })
    .sort(sortByWatchedDesc);

  const tvEpisodes = tvRaw
    .map((x) => {
      const s = tvMeta[x.tmdbId] || {};

      return {
        ...x,
        show: x.show || s.name || "",
        year: x.year || (s.first_air_date ? Number(String(s.first_air_date).slice(0, 4)) : null),
        poster:
          x.poster ||
          (s.poster_path ? `https://image.tmdb.org/t/p/w342${s.poster_path}` : ""),
        tmdbUrl: x.tmdbUrl || `https://www.themoviedb.org/tv/${x.tmdbId}`
      };
    })
    .sort(sortByWatchedDesc);

  const moviesByYear = groupByYear(movies);
  const tvByYear = groupByYear(tvEpisodes);
  const movieYears = Object.keys(moviesByYear).sort().reverse();
  const tvYears = Object.keys(tvByYear).sort().reverse();

  const tvGrouped = groupTvByShowThenSeason(tvEpisodes);

  const tvGroupedByYear = {};
  for (const y of Object.keys(tvByYear)) {
    tvGroupedByYear[y] = groupTvByShowThenSeason(tvByYear[y]);
  }

  const tvStatsByYear = buildTvStatsByYear(tvByYear);
  const movieStatsByYear = buildMovieStatsByYear(moviesByYear);

  const years = [...new Set([...Object.keys(moviesByYear), ...Object.keys(tvByYear)])]
    .sort()
    .reverse();

  return {
    movies,
    tvEpisodes,
    tvGrouped,
    tvGroupedByYear,
    tvStatsByYear,
    movieStatsByYear,
    moviesByYear,
    tvByYear,
    movieYears,
    tvYears,
    years,
    stats: {
      totalMovies: movies.length,
      totalEpisodes: tvEpisodes.length,
      totalShows: Object.keys(tvGrouped).length
    }
  };
};
