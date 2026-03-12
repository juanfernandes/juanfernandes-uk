const fs = require("node:fs");
const path = require("node:path");

const CACHE_DIR = path.join(process.cwd(), ".cache", "tmdb");
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

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

async function fetchJson(url) {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`TMDb fetch failed: ${res.status} ${url}`);
  return res.json();
}

async function tmdbGet(type, id, apiKey) {
  ensureDir(CACHE_DIR);
  const fp = cachePath(type, id);

  if (isFresh(fp)) return JSON.parse(fs.readFileSync(fp, "utf8"));

  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-GB`;
  const data = await fetchJson(url);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), "utf8");
  return data;
}

const yearFromISO = (d) => String(d || "").slice(0, 4);

const sortByWatchedDesc = (a, b) =>
  a.watchedOn > b.watchedOn ? -1 : a.watchedOn < b.watchedOn ? 1 : 0;

function groupByYear(items) {
  return items.reduce((acc, item) => {
    const y = yearFromISO(item.watchedOn);
    if (!y) return acc;
    (acc[y] ??= []).push(item);
    return acc;
  }, {});
}

function groupTvByShowThenSeason(tvEpisodes) {
  const out = {};

  for (const ep of tvEpisodes) {
    const key = String(ep.tmdbId);

    out[key] ??= {
      show: ep.show,
      tmdbUrl: ep.tmdbUrl,
      poster: ep.poster || "",
      year: ep.year || null,
      seasons: {}
    };

    (out[key].seasons[ep.season] ??= []).push(ep);
  }

  for (const showId of Object.keys(out)) {
    for (const seasonNum of Object.keys(out[showId].seasons)) {
      out[showId].seasons[seasonNum].sort((a, b) => {
        if ((a.watchedOn || "") > (b.watchedOn || "")) return -1;
        if ((a.watchedOn || "") < (b.watchedOn || "")) return 1;
        return (a.episode || 0) - (b.episode || 0);
      });
    }
  }

  return out;
}

module.exports = async function () {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("Missing TMDB_API_KEY env var (set locally and in GitHub Secrets).");
  }

  const watchlog = require("./watchlog.json").entries || [];
  const moviesRaw = watchlog.filter((x) => x.type === "movie");
  const tvRaw = watchlog.filter((x) => x.type === "tv");

  const uniqueMovieIds = [...new Set(moviesRaw.map((x) => x.tmdbId).filter(Boolean))];
  const uniqueTvIds = [...new Set(tvRaw.map((x) => x.tmdbId).filter(Boolean))];

  const [movieMetaPairs, tvMetaPairs] = await Promise.all([
    Promise.all(uniqueMovieIds.map(async (id) => [id, await tmdbGet("movie", id, apiKey)])),
    Promise.all(uniqueTvIds.map(async (id) => [id, await tmdbGet("tv", id, apiKey)]))
  ]);

  const movieMeta = Object.fromEntries(movieMetaPairs);
  const tvMeta = Object.fromEntries(tvMetaPairs);

  const movies = moviesRaw
    .map((x) => {
      const m = movieMeta[x.tmdbId] || {};
      return {
        ...x,
        title: x.title || m.title || "",
        year: x.year || (m.release_date ? Number(String(m.release_date).slice(0, 4)) : null),
        poster:
          x.poster ||
          (m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : ""),
        tmdbUrl: x.tmdbUrl || `https://www.themoviedb.org/movie/${x.tmdbId}`
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

  const tvGrouped = groupTvByShowThenSeason(tvEpisodes);

  const tvGroupedByYear = {};
  for (const y of Object.keys(tvByYear)) {
    tvGroupedByYear[y] = groupTvByShowThenSeason(tvByYear[y]);
  }

  const years = [...new Set([...Object.keys(moviesByYear), ...Object.keys(tvByYear)])]
    .sort()
    .reverse();

  const totalMovies = movies.length;
  const totalEpisodes = tvEpisodes.length;
  const totalShows = Object.keys(tvGrouped).length;

  return {
    movies,
    tvEpisodes,
    tvGrouped,
    tvGroupedByYear,
    moviesByYear,
    tvByYear,
    years,
    stats: {
      totalMovies,
      totalEpisodes,
      totalShows
    }
  };
};
