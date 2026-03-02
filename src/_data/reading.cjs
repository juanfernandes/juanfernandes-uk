/* src/_data/reading.cjs */
function toInt(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalise(item) {
  const statusRaw = String(item?.status || "").trim();
  const status = ["reading", "read", "toRead"].includes(statusRaw) ? statusRaw : "toRead";

  const yearRead = item?.yearRead ? String(item.yearRead).trim() : "";
  const yearReadInt = yearRead && /^\d{4}$/.test(yearRead) ? toInt(yearRead) : null;

  return {
    title: String(item?.title || "").trim(),
    subtitle: String(item?.subtitle || "").trim(),
    author: String(item?.author || "").trim(),
    img: String(item?.img || "").trim(),
    url: item?.url ? String(item.url).trim() : "",
    notes: item?.notes ? String(item.notes).trim() : "",
    status,
    yearRead: yearReadInt
  };
}

function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

function sortAlpha(a, b) {
  const aa = (a.author || "").localeCompare(b.author || "");
  if (aa) return aa;
  return (a.title || "").localeCompare(b.title || "");
}

module.exports = async function () {
  // Your current file is an ARRAY, not { items: [...] }
  const raw = require("./books.json");
  const items = Array.isArray(raw) ? raw : [];

  const all = items.map(normalise).filter((b) => b.title);

  const current = all.filter((b) => b.status === "reading").sort(sortAlpha);
  const finished = all.filter((b) => b.status === "read");
  const toRead = all.filter((b) => b.status === "toRead").sort(sortAlpha);

  // Finished grouped by year (desc)
  const finishedByYear = groupBy(
    finished.filter((b) => b.yearRead),
    (b) => String(b.yearRead)
  );

  const years = Object.keys(finishedByYear).sort().reverse();
  for (const y of years) {
    finishedByYear[y].sort(sortAlpha);
  }

  // If any "read" items don't have a year, keep them separate
  const finishedNoYear = finished.filter((b) => !b.yearRead).sort(sortAlpha);

  const stats = {
    total: all.length,
    currentlyReading: current.length,
    finished: finished.length,
    toRead: toRead.length
  };

  // Convenience "latest finished" (highest yearRead, then alpha)
  const latestFinished =
    finished
      .filter((b) => b.yearRead)
      .slice()
      .sort((a, b) => (b.yearRead || 0) - (a.yearRead || 0) || sortAlpha(a, b))[0] || null;

  return {
    updatedAt: new Date().toISOString(),
    all,
    current,
    toRead,
    finished,
    finishedByYear,
    finishedNoYear,
    years,
    latestFinished,
    stats
  };
};
