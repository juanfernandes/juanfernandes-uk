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
    acquiredOn: item?.acquiredOn ? String(item.acquiredOn).trim() : "",
    releaseYear: toInt(item?.releaseYear),
    notes: item?.notes ? String(item.notes).trim() : "",
    url: item?.url ? String(item.url).trim() : "",
    cover: item?.cover ? String(item.cover).trim() : ""
  };
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const v = item[key] || "Unknown";
    (acc[v] ??= []).push(item);
    return acc;
  }, {});
}

function dateKey(s) {
  if (!s || typeof s !== "string") return 0;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return 0;
  return Number(m[1] + m[2] + m[3]);
}

function latestByDate(items, field) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const dated = items
    .slice()
    .sort((a, b) => dateKey(b[field]) - dateKey(a[field]))
    .find((x) => !!x[field]);

  return dated || items[0] || null;
}

function sortGame(a, b) {
  // Play status priority for owned, then title
  const rank = { playing: 0, unplayed: 1, completed: 2, abandoned: 3, wishlist: 4 };
  const ra = rank[a.playStatus] ?? 9;
  const rb = rank[b.playStatus] ?? 9;
  if (ra !== rb) return ra - rb;
  return (a.title || "").localeCompare(b.title || "");
}

module.exports = async function () {
  const raw = require("./gamesData.json");
  const items = Array.isArray(raw?.items) ? raw.items : [];

  const all = items.map(normalise).filter((g) => g.title);

  const owned = all.filter((g) => g.status === "owned").sort(sortGame);
  const wanted = all.filter((g) => g.status === "wanted").sort((a, b) => a.title.localeCompare(b.title));

  const byPlatform = groupBy(owned, "platform");
  const platforms = Object.keys(byPlatform).sort((a, b) => a.localeCompare(b));

  const byPlatformWanted = groupBy(wanted, "platform");
  const platformsWanted = Object.keys(byPlatformWanted).sort((a, b) => a.localeCompare(b));

  const latestOwned = latestByDate(owned, "acquiredOn");

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
    latestOwned,
    byPlatform,
    platforms,
    byPlatformWanted,
    platformsWanted,
    stats
  };
};
