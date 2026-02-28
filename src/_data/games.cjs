/* src/_data/games.cjs */
function toInt(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalise(item) {
  const status = String(item?.status || "owned").toLowerCase();
  const playStatus = String(item?.playStatus || "unplayed").toLowerCase();

  return {
    title: String(item?.title || "").trim(),
    platform: String(item?.platform || "Unknown").trim() || "Unknown",
    status: status === "wanted" ? "wanted" : "owned",
    playStatus: playStatus || "unplayed",
    acquiredOn: item?.acquiredOn ? String(item.acquiredOn) : "",
    releaseYear: toInt(item?.releaseYear),
    notes: item?.notes ? String(item.notes) : "",
    url: item?.url ? String(item.url) : "",
    cover: item?.cover ? String(item.cover) : ""
  };
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const v = item[key] || "Unknown";
    (acc[v] ??= []).push(item);
    return acc;
  }, {});
}

function sortGame(a, b) {
  // Play status priority for owned, then title
  const rank = { playing: 0, unplayed: 1, completed: 2, abandoned: 3 };
  const ra = rank[a.playStatus] ?? 9;
  const rb = rank[b.playStatus] ?? 9;
  if (ra !== rb) return ra - rb;
  return (a.title || "").localeCompare(b.title || "");
}

module.exports = async function () {
  const raw = require("./games.json");
  const items = Array.isArray(raw?.items) ? raw.items : [];

  const all = items.map(normalise).filter((g) => g.title);

  const owned = all.filter((g) => g.status === "owned").sort(sortGame);
  const wanted = all.filter((g) => g.status === "wanted").sort((a, b) => a.title.localeCompare(b.title));

  const byPlatform = groupBy(owned, "platform");
  const platforms = Object.keys(byPlatform).sort((a, b) => a.localeCompare(b));

  const byPlatformWanted = groupBy(wanted, "platform");
  const platformsWanted = Object.keys(byPlatformWanted).sort((a, b) => a.localeCompare(b));

  const stats = {
    ownedCount: owned.length,
    wantedCount: wanted.length,
    platformsCount: platforms.length,
    playingCount: owned.filter((g) => g.playStatus === "playing").length,
    completedCount: owned.filter((g) => g.playStatus === "completed").length,
    unplayedCount: owned.filter((g) => g.playStatus === "unplayed").length
  };

  return {
    updatedAt: new Date().toISOString(),
    all,
    owned,
    wanted,
    byPlatform,
    platforms,
    byPlatformWanted,
    platformsWanted,
    stats
  };
};
