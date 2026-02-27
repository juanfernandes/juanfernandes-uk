// src/_data/concerts.cjs
const groupByYear = require("./utils/groupByYear.cjs");

const sortDesc = (a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0);

function groupByArtist(entries) {
  const map = {};
  for (const gig of entries) {
    const artists = Array.isArray(gig.artists) ? gig.artists : [];
    for (const artist of artists) {
      if (!artist) continue;
      (map[artist] ??= []).push(gig);
    }
  }
  // keep each artist’s gigs newest-first
  for (const artist of Object.keys(map)) {
    map[artist].sort(sortDesc);
  }
  return map;
}

function groupByVenue(entries) {
  const map = {};
  for (const gig of entries) {
    const venue = gig.venue || "Unknown venue";
    (map[venue] ??= []).push(gig);
  }
  // keep each venue’s gigs newest-first
  for (const venue of Object.keys(map)) {
    map[venue].sort(sortDesc);
  }
  return map;
}

module.exports = async function () {
  // Expecting: src/_data/concerts.json => { "entries": [ ... ] }
  const data = require("./concerts.json");
  const raw = Array.isArray(data?.entries) ? data.entries : [];

  // Normalize + sort
  const entries = raw
    .map((gig) => ({
      date: gig.date, // required: YYYY-MM-DD
      artists: Array.isArray(gig.artists) ? gig.artists : [],
      venue: gig.venue || "",
      city: gig.city || "",
      country: gig.country || "",
      notes: gig.notes || "",
      links: gig.links && typeof gig.links === "object" ? gig.links : {},
    }))
    .filter((gig) => typeof gig.date === "string" && gig.date.length >= 10)
    .sort(sortDesc);

  // Year index
  const byYear = groupByYear(entries, "date");
  const years = Object.keys(byYear).sort().reverse();

  // Facets
  const byArtist = groupByArtist(entries);
  const artists = Object.keys(byArtist).sort((a, b) => a.localeCompare(b));

  const byVenue = groupByVenue(entries);
  const venues = Object.keys(byVenue).sort((a, b) => a.localeCompare(b));

  // Simple stats
  const stats = {
    totalConcerts: entries.length,
    totalArtists: artists.length,
    totalVenues: venues.length,
  };

  return {
    entries,
    byYear,
    years,
    byArtist,
    artists,
    byVenue,
    venues,
    stats,
  };
};
