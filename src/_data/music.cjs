/* src/_data/music.cjs */
function toInt(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalise(item) {
  return {
    artist: String(item?.artist || "").trim(),
    title: String(item?.title || "").trim(),
    label: String(item?.label || "").trim(),
    format: String(item?.format || "").trim(),
    year: toInt(item?.year),
    folder: String(item?.folder || "Unknown").trim() || "Unknown",
    media: String(item?.media || "vinyl").trim() || "vinyl",
    url: item?.url ? String(item.url).trim() : "",
    cover: item?.cover ? String(item.cover).trim() : "",
    notes: item?.notes ? String(item.notes).trim() : ""
  };
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const v = item[key] || "Unknown";
    (acc[v] ??= []).push(item);
    return acc;
  }, {});
}

function sortRecord(a, b) {
  const aa = (a.artist || "").localeCompare(b.artist || "");
  if (aa) return aa;

  const ay = a.year ?? -1;
  const by = b.year ?? -1;
  if (ay !== by) return by - ay;

  return (a.title || "").localeCompare(b.title || "");
}

module.exports = async function () {
  const raw = require("./music.json");
  const items = Array.isArray(raw?.items) ? raw.items : [];

  const all = items.map(normalise).filter((r) => r.artist || r.title).sort(sortRecord);

  const byFolder = groupBy(all, "folder");
  const folders = Object.keys(byFolder).sort((a, b) => a.localeCompare(b));

  // Simple stats
  const vinylCount = all.filter((x) => x.media.toLowerCase() === "vinyl").length;
  const cdCount = all.filter((x) => x.media.toLowerCase() === "cd").length;

  return {
    updatedAt: new Date().toISOString(),
    all,
    byFolder,
    folders,
    stats: {
      total: all.length,
      vinylCount,
      cdCount
    }
  };
};
