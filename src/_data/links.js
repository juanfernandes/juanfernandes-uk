// src/_data/links.js
const fs = require("fs");
const path = require("path");

// Robust timestamp parser
function toTimestamp(val) {
  if (!val) return Number.NEGATIVE_INFINITY;
  const s = String(val).trim();
  let t = Date.parse(s);
  if (!Number.isNaN(t)) return t;

  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/); // YYYY-MM-DD
  if (m) {
    t = Date.parse(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
    if (!Number.isNaN(t)) return t;
  }
  return Number.NEGATIVE_INFINITY;
}

module.exports = () => {
  const file = path.join(__dirname, "links.raw.json"); // <— renamed
  const raw = fs.readFileSync(file, "utf8");
  const links = JSON.parse(raw);

  const sorted = (Array.isArray(links) ? links : [])
    .map((i) => {
      const d = i?.date || i?.isoDate || i?.pubDate || i?.readAt || i?.createdAt;
      return { ...i, _ts: toTimestamp(d) };
    })
    .sort((a, b) => b._ts - a._ts)
    .map(({ _ts, ...rest }) => rest);

  // Optional debug to verify during build
  if (sorted.length) {
    console.log("[links] Count:", sorted.length, " | First date:", sorted[0].date || sorted[0].isoDate || sorted[0].pubDate);
  }
  return sorted;
};
