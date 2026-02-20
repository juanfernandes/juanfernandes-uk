// src/_data/lastfmRecent.cjs
const EleventyFetch = require("@11ty/eleventy-fetch");

const API_KEY = process.env.LASTFM_API_KEY;
const USER = process.env.LASTFM_USER;

function topNFromCountMap(map, n = 10) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

function pickLastFmImage(images, preferred = "extralarge") {
  if (!Array.isArray(images)) return null;

  const bySize = (size) =>
    images.find((i) => i && i.size === size && i["#text"])?.["#text"];

  return (
    bySize(preferred) ||
    bySize("mega") ||
    bySize("extralarge") ||
    bySize("large") ||
    bySize("medium") ||
    bySize("small") ||
    images.find((i) => i && i["#text"])?.["#text"] ||
    null
  );
}

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

async function fetchJsonCached(url, { duration = "7d" } = {}) {
  return EleventyFetch(url, {
    duration,
    type: "json",
    fetchOptions: {
      headers: { "User-Agent": "juanfernandes.uk (Eleventy)" }
    }
  });
}

module.exports = async function () {
  if (!API_KEY || !USER) {
    return { error: "Missing LASTFM_API_KEY or LASTFM_USER env vars" };
  }

  const now = Math.floor(Date.now() / 1000);
  const oneWeekAgo = now - 7 * 24 * 60 * 60;

  // --- Recent tracks (this week) ---
  const recentUrl = lastfmUrl("user.getrecenttracks", {
    user: USER,
    from: oneWeekAgo,
    limit: 1000
  });

  const data = await fetchJsonCached(recentUrl, { duration: "2h" });

  const rawTracks = data?.recenttracks?.track ?? [];

  const tracks = rawTracks
    // only tracks with timestamps (now playing has no date)
    .filter((t) => t?.date?.uts && Number(t.date.uts) >= oneWeekAgo)
    .map((t) => ({
      name: t?.name || null,
      artist: t?.artist?.["#text"] || null,
      album: t?.album?.["#text"] || null,
      url: t?.url || null,
      uts: Number(t?.date?.uts)
    }))
    .filter((t) => t.artist && t.name);

  // ---- Unique counts ----
  const uniqueArtists = new Set(tracks.map((t) => t.artist));
  const uniqueAlbums = new Set(
    tracks.map((t) => `${t.artist}|||${(t.album || "").trim()}`)
  );
  const uniqueTracks = new Set(tracks.map((t) => `${t.artist}|||${t.name}`));

  // ---- Top artists / albums / tracks (by play count over the week) ----
  const artistPlays = {};
  const albumPlays = {};
  const trackPlays = {};

  for (const t of tracks) {
    artistPlays[t.artist] = (artistPlays[t.artist] || 0) + 1;

    const albumName =
      t.album && t.album.trim() ? t.album.trim() : "Single / Unknown";
    const albumKey = `${t.artist}|||${albumName}`;
    albumPlays[albumKey] = (albumPlays[albumKey] || 0) + 1;

    const trackKey = `${t.artist}|||${t.name}`;
    trackPlays[trackKey] = (trackPlays[trackKey] || 0) + 1;
  }

  // Full ranked lists for the week (cap high enough to effectively be "all")
  const weekTopArtists = topNFromCountMap(artistPlays, 5000).map(
    ([name, plays]) => ({
      name,
      plays
    })
  );

  const weekTopAlbums = topNFromCountMap(albumPlays, 5000).map(([key, plays]) => {
    const [artist, album] = key.split("|||");
    return { artist, album, plays };
  });

  const weekTopTracks = topNFromCountMap(trackPlays, 5000).map(([key, plays]) => {
    const [artist, name] = key.split("|||");
    return { artist, name, plays };
  });

  // ---- Genres (tags) based on top artists ----
  // Keep it lightweight: only get tags for top 5 artists
  const topArtistsForTags = weekTopArtists.slice(0, 5).map((a) => a.name);

  const genreCounts = {};
  for (const artist of topArtistsForTags) {
    const tagsUrl = lastfmUrl("artist.getTopTags", { artist });
    const tagData = await fetchJsonCached(tagsUrl, { duration: "7d" });

    const tags = tagData?.toptags?.tag?.slice(0, 3) ?? [];
    for (const tag of tags) {
      const name = tag?.name;
      if (!name) continue;
      genreCounts[name] = (genreCounts[name] || 0) + 1;
    }
  }

  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name);

  // ---- Enrich top 10 ALBUMS with images (cached 7 days) ----
  const top10AlbumsBase = weekTopAlbums.slice(0, 10);

  const weekTopAlbumsTop10 = await Promise.all(
    top10AlbumsBase.map(async (al) => {
      try {
        const infoUrl = lastfmUrl("album.getInfo", {
          artist: al.artist,
          album: al.album,
          autocorrect: 1
        });
        const info = await fetchJsonCached(infoUrl, { duration: "7d" });
        const album = info?.album;

        return {
          ...al,
          url: album?.url || null,
          image: pickLastFmImage(album?.image) // URL string or null
        };
      } catch (e) {
        return { ...al, url: null, image: null };
      }
    })
  );

  return {
    weekSummary: {
      artists: uniqueArtists.size,
      albums: uniqueAlbums.size,
      tracks: uniqueTracks.size,
      genres: topGenres
    },

    // Full lists (for paginated pages)
    weekTopArtists,
    weekTopAlbums,
    weekTopTracks,

    // Enriched top 10 albums (use on /music/ landing page)
    weekTopAlbumsTop10,

    // weekly scrobbles (timestamped) — useful if you still want "recent this week"
    tracks
  };
};
