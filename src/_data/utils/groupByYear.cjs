module.exports = function groupByYear(items, dateKey = "date") {
  const arr = Array.isArray(items) ? items : [];
  return arr.reduce((acc, item) => {
    const y = String(item?.[dateKey] ?? "").slice(0, 4);
    if (!y) return acc;
    (acc[y] ??= []).push(item);
    return acc;
  }, {});
};
