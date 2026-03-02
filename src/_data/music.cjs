/* src/_data/music.cjs */
function toInt(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalise(item) {
  return {
    artist: String(item?.artist || "").trim(),
    title: String(item?.title || "").trim(),
    addedOn: item?.addedOn ? String(item.addedOn).trim() : "",
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

function sortRecordBrowse(a, b) {
  // Browse-friendly: Artist > Year desc > Title
  const aa = (a.artist || "").localeCompare(b.artist || "");
  if (aa) return aa;

  const ay = a.year ?? -1;
  const by = b.year ?? -1;
  if (ay !== by) return by - ay;

  return (a.title || "").localeCompare(b.title || "");
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

module.exports = async function () {
  const raw = require("./musicData.json");
  const items = Array.isArray(raw?.items) ? raw.items : [];

  // Keep browse ordering for pages
  const all = items
    .map(normalise)
    .filter((r) => r.artist || r.title)
    .sort(sortRecordBrowse);

  const byFolder = groupBy(all, "folder");
  const folders = Object.keys(byFolder).sort((a, b) => a.localeCompare(b));

  // Latest added (dashboard)
  const latestAdded = latestByDate(all, "addedOn");

  // Simple stats
  const vinylCount = all.filter((x) => x.media.toLowerCase() === "vinyl").length;
  const cdCount = all.filter((x) => x.media.toLowerCase() === "cd").length;

  return {
    updatedAt: new Date().toISOString(),
    all,
    latestAdded,
    byFolder,
    folders,
    stats: {
      total: all.length,
      vinylCount,
      cdCount
    }
  };
};
