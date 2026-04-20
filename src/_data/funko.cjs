/* src/_data/funko.cjs */

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function toBool(v) {
  return v === true;
}

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalise(item) {
  const name = String(item?.name || "").trim();
  const franchise = String(item?.franchise || "Unknown").trim() || "Unknown";

  return {
    id: item?.id ? String(item.id).trim() : `${slugify(franchise)}-${slugify(name)}`,
    name,
    franchise,
    number: item?.number != null ? toNumber(item.number) : null,
    exclusive: toBool(item?.exclusive),
    owned: item?.owned !== false,
    quantity: toNumber(item?.quantity) ?? 1,
    estimatedValueGBP: toNumber(item?.estimatedValueGBP),
    addedOn: item?.addedOn ? String(item.addedOn).trim() : "",
    image: item?.image ? String(item.image).trim() : "",
    notes: item?.notes ? String(item.notes).trim() : ""
  };
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

  return dated || null;
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "Unknown";
    (acc[value] ??= []).push(item);
    return acc;
  }, {});
}

function sortFunkoBrowse(a, b) {
  const fa = (a.franchise || "").localeCompare(b.franchise || "");
  if (fa) return fa;

  const na = (a.name || "").localeCompare(b.name || "");
  if (na) return na;

  const an = a.number ?? 999999;
  const bn = b.number ?? 999999;
  return an - bn;
}

module.exports = async function () {
  const raw = require("./funkoPops.json");
  const items = Array.isArray(raw?.items) ? raw.items : [];

  const all = items
    .map(normalise)
    .filter((item) => item.name)
    .sort(sortFunkoBrowse);

  const latestAdded = latestByDate(all, "addedOn");

  const byFranchise = groupBy(all, "franchise");
  const franchises = Object.keys(byFranchise).sort((a, b) => a.localeCompare(b));

  const exclusiveItems = all.filter((item) => item.exclusive);
  const nonExclusiveItems = all.filter((item) => !item.exclusive);

  const totalEstimatedValue = all.reduce((sum, item) => {
    return sum + ((item.estimatedValueGBP || 0) * (item.quantity || 1));
  }, 0);

  const franchiseStats = franchises.map((franchise) => {
    const items = byFranchise[franchise] || [];
    const total = items.length;
    const exclusives = items.filter((item) => item.exclusive).length;
    const estimatedValue = items.reduce((sum, item) => {
      return sum + ((item.estimatedValueGBP || 0) * (item.quantity || 1));
    }, 0);

    return {
      franchise,
      slug: slugify(franchise),
      total,
      exclusives,
      estimatedValue: Number(estimatedValue.toFixed(2)),
      items: items.slice().sort(sortFunkoBrowse)
    };
  });

  return {
    updatedAt: new Date().toISOString(),
    all,
    latestAdded,
    byFranchise,
    franchises,
    exclusiveItems,
    nonExclusiveItems,
    franchiseStats,
    stats: {
      total: all.length,
      ownedCount: all.filter((item) => item.owned).length,
      exclusiveCount: exclusiveItems.length,
      franchiseCount: franchises.length,
      totalEstimatedValue: Number(totalEstimatedValue.toFixed(2))
    }
  };
};
