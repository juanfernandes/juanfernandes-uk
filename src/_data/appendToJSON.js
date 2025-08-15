/* Append Instapaper "liked" items into src/_data/links.raw.json
   - Normalises date -> ISO 8601
   - De-dupes by URL
   - Keeps newest -> oldest
*/
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const RSSParser = require("rss-parser");

// 1) Config
const RSS_URL =
  process.env.INSTAPAPER_RSS_URL ||
  "https://www.instapaper.com/starred/rss/644253/FzH81iaEJdLENYr6qVBpZx9Go";
const RAW_JSON_PATH = path.join(__dirname, "links.raw.json");


// 2) Helpers
function toIso(val) {
  if (!val) return new Date().toISOString();
  const s = String(val).trim();
  let t = Date.parse(s);
  if (!Number.isNaN(t)) return new Date(t).toISOString();

  // Handle YYYY-MM-DD explicitly (treat as UTC midnight)
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`).toISOString();

  // Fallback: now
  return new Date().toISOString();
}

function toTimestamp(iso) {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? Number.NEGATIVE_INFINITY : t;
}

function readJsonSafe(p) {
  try {
    if (!fs.existsSync(p)) return [];
    const raw = fs.readFileSync(p, "utf8");
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}

function writeJsonPretty(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

// 3) Fetch + parse RSS
async function fetchInstapaperItems() {
  const parser = new RSSParser();
  const res = await axios.get(RSS_URL);
  const feed = await parser.parseString(res.data);

  // Map to your canonical shape
  const mapped = (feed.items || []).map((item) => {
    const url = item.link?.trim();
    return {
      title: (item.title || "").trim(),
      url,
      // Instapaper often includes HTML snippet in `content` or `content:encoded`
      content: item["content:encoded"] || item.content || "",
      date: toIso(item.pubDate || item.isoDate), // normalise to ISO 8601
    };
  });

  // Filter out anything without a URL
  return mapped.filter((x) => !!x.url);
}

// 4) Merge, de-dupe, sort
async function run() {
  const existing = readJsonSafe(RAW_JSON_PATH).map((i) => ({
    ...i,
    // normalise legacy dates on read
    date: toIso(i.date || i.isoDate || i.pubDate || i.readAt || i.createdAt),
  }));

  const latest = await fetchInstapaperItems();

  // Build a map by URL (newest wins)
  const byUrl = new Map();

  // Start with existing
  for (const i of existing) byUrl.set(i.url, i);

  // Overlay latest (so we can pick up any content/date changes)
  for (const n of latest) byUrl.set(n.url, n);

  // Back to array
  const merged = Array.from(byUrl.values())
    // final sort: newest -> oldest
    .sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));

  writeJsonPretty(RAW_JSON_PATH, merged);
  console.log(
    `✅ links.raw.json updated: ${merged.length} items (top date: ${merged[0]?.date || "n/a"})`
  );
}

run().catch((err) => {
  console.error("❌ appendToJSON failed:", err?.message || err);
  process.exit(1);
});
