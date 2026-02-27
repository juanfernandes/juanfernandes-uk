/* src/_data/lego.cjs */
function toInt(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalise(item) {
  const status = (item?.status || "owned").toLowerCase();
  return {
    setNumber: String(item?.setNumber || "").trim(),
    name: String(item?.name || "").trim(),
    theme: String(item?.theme || "Unknown").trim() || "Unknown",
    subtheme: String(item?.subtheme || "").trim(),
    year: toInt(item?.year),
    pieces: toInt(item?.pieces),
    status: status === "wanted" ? "wanted" : "owned",
    built: Boolean(item?.built),
    acquiredOn: item?.acquiredOn ? String(item.acquiredOn) : "",
    image: item?.image ? String(item.image) : "",
    url: item?.url ? String(item.url) : "",
    notes: item?.notes ? String(item.notes) : ""
  };
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const v = item[key] || "Unknown";
    (acc[v] ??= []).push(item);
    return acc;
  }, {});
}

function sortSets(a, b) {
  // Theme > Year desc > Name
  const t = (a.theme || "").localeCompare(b.theme || "");
  if (t) return t;

  const ay = a.year ?? -1;
  const by = b.year ?? -1;
  if (ay !== by) return by - ay;

  return (a.name || "").localeCompare(b.name || "");
}

module.exports = async function () {
  const raw = require("./lego.json");
  const items = Array.isArray(raw?.items) ? raw.items : [];

  const all = items.map(normalise);

  const owned = all.filter((x) => x.status === "owned").sort(sortSets);
  const wanted = all.filter((x) => x.status === "wanted").sort(sortSets);

  const ownedPieces = owned.reduce((sum, s) => sum + (s.pieces || 0), 0);
  const builtCount = owned.filter((s) => s.built).length;

  const byThemeOwned = groupBy(owned, "theme");
  const themesOwned = Object.keys(byThemeOwned).sort((a, b) => a.localeCompare(b));

  const byThemeWanted = groupBy(wanted, "theme");
  const themesWanted = Object.keys(byThemeWanted).sort((a, b) => a.localeCompare(b));

  return {
    updatedAt: new Date().toISOString(),
    all,
    owned,
    wanted,
    stats: {
      ownedCount: owned.length,
      wantedCount: wanted.length,
      ownedPieces,
      builtCount,
      unbuiltCount: Math.max(0, owned.length - builtCount)
    },
    byThemeOwned,
    themesOwned,
    byThemeWanted,
    themesWanted
  };
};
