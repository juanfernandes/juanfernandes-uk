function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const v = item[key] || "Unknown";
    (acc[v] ??= []).push(item);
    return acc;
  }, {});
}

module.exports = async function () {
  const raw = require("./games.json").items || [];
  const items = raw.slice().sort((a, b) => a.name.localeCompare(b.name));

  const byPlatform = groupBy(items, "platform");
  const platforms = Object.keys(byPlatform).sort();

  const byStatus = groupBy(items, "playStatus");
  const statuses = Object.keys(byStatus).sort();

  return { items, byPlatform, platforms, byStatus, statuses };
};
