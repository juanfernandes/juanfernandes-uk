// merge-trakt-into-watchlog.cjs

const fs = require("fs");

const traktFiles = [
  "./watched-history-1.json",
  "./watched-history-2.json",
  "./watched-history-3.json",
  "./watched-history-4.json",
  "./watched-history-5.json",
  "./watched-history-6.json",
  "./watched-history-7.json",
  "./watched-history-8.json"
];

const existingWatchlogPath = "../src/_data/watchlog.json";
const outputPath = "../src/_data/watchlog.merged.json";

function toDateOnly(iso) {
  return iso ? iso.split("T")[0] : null;
}

function normaliseTraktEntry(item) {
  if (item.action !== "watch") return null;

  if (item.type === "episode") {
    return {
      rewatch: false,
      type: "tv",
      tmdbId: item.show?.ids?.tmdb ?? null,
      watchedOn: toDateOnly(item.watched_at),
      season: item.episode?.season ?? null,
      episode: item.episode?.number ?? null
    };
  }

  if (item.type === "movie") {
    return {
      rewatch: false,
      type: "movie",
      tmdbId: item.movie?.ids?.tmdb ?? null,
      watchedOn: toDateOnly(item.watched_at)
    };
  }

  return null;
}

function makeKey(entry) {
  return [
    entry.type || "",
    entry.tmdbId || "",
    entry.watchedOn || "",
    entry.season || "",
    entry.episode || "",
    entry.displayAs || ""
  ].join("|");
}

const existing = JSON.parse(fs.readFileSync(existingWatchlogPath, "utf8"));
const existingEntries = Array.isArray(existing.entries) ? existing.entries : [];

const traktEntries = traktFiles
  .filter(path => fs.existsSync(path))
  .flatMap(path => JSON.parse(fs.readFileSync(path, "utf8")))
  .map(normaliseTraktEntry)
  .filter(entry => entry && entry.tmdbId && entry.watchedOn);

const mergedMap = new Map();

// keep existing first so richer entries win
for (const entry of existingEntries) {
  mergedMap.set(makeKey(entry), entry);
}

// add Trakt only if not already present
for (const entry of traktEntries) {
  const key = makeKey(entry);
  if (!mergedMap.has(key)) {
    mergedMap.set(key, entry);
  }
}

const mergedEntries = Array.from(mergedMap.values()).sort((a, b) => {
  return new Date(b.watchedOn) - new Date(a.watchedOn);
});

const result = {
  entries: mergedEntries
};

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log(`Existing entries: ${existingEntries.length}`);
console.log(`Trakt entries: ${traktEntries.length}`);
console.log(`Merged entries: ${mergedEntries.length}`);
console.log(`Saved to ${outputPath}`);
