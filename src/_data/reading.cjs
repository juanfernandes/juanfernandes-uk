/* src/_data/reading.cjs */
function toInt(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function yearFromDateString(v) {
  if (!v) return null;
  const s = String(v).trim();
  const m = s.match(/^(\d{4})/);
  return m ? toInt(m[1]) : null;
}

function normaliseBook(item) {
  const statusRaw = String(item?.status || "").trim();
  const status = ["reading", "read", "toRead"].includes(statusRaw) ? statusRaw : "toRead";

  const yearRead = item?.yearRead ? String(item.yearRead).trim() : "";
  const yearReadInt = yearRead && /^\d{4}$/.test(yearRead) ? toInt(yearRead) : null;

  return {
    kind: "book",
    title: String(item?.title || "").trim(),
    subtitle: String(item?.subtitle || "").trim(),
    author: String(item?.author || "").trim(),
    publication: "",
    img: String(item?.img || "").trim(),
    url: item?.url ? String(item.url).trim() : "",
    notes: item?.notes ? String(item.notes).trim() : "",
    content: "",
    status,
    yearRead: yearReadInt,
    date: ""
  };
}

function normaliseArticle(item) {
  const date = String(item?.date || item?.isoDate || item?.pubDate || "").trim();
  const yearRead = yearFromDateString(date);

  return {
    kind: "article",
    title: String(item?.title || "").trim(),
    subtitle: "",
    author: "",
    publication: "",
    img: "",
    url: item?.url ? String(item.url).trim() : "",
    notes: "",
    content: item?.content ? String(item.content).trim() : "",
    status: "read",
    yearRead,
    date
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

function sortByYearDescThenAlpha(a, b) {
  const ay = a.yearRead || 0;
  const by = b.yearRead || 0;
  if (ay !== by) return by - ay;
  return sortAlpha(a, b);
}

function sortArticlesByDateDesc(a, b) {
  const ad = Date.parse(a.date || "") || 0;
  const bd = Date.parse(b.date || "") || 0;
  return bd - ad;
}

module.exports = async function () {
  const rawBooks = require("./books.json");
  const rawArticles = require("./links.cjs")();

  const booksSource = Array.isArray(rawBooks) ? rawBooks : [];
  const articlesSource = Array.isArray(rawArticles) ? rawArticles : [];

  const books = booksSource.map(normaliseBook).filter((b) => b.title);
  const articles = articlesSource.map(normaliseArticle).filter((a) => a.title);

  const all = [...books, ...articles];

  const currentBooks = books.filter((b) => b.status === "reading").sort(sortAlpha);

  const finishedBooks = books.filter((b) => b.status === "read").sort(sortByYearDescThenAlpha);
  const toReadBooks = books.filter((b) => b.status === "toRead").sort(sortAlpha);

  const finishedArticles = articles.slice().sort(sortArticlesByDateDesc);

  const finishedBooksByYear = groupBy(
    finishedBooks.filter((b) => b.yearRead),
    (b) => String(b.yearRead)
  );

  const finishedArticlesByYear = groupBy(
    finishedArticles.filter((a) => a.yearRead),
    (a) => String(a.yearRead)
  );

  const years = [
    ...new Set([
      ...Object.keys(finishedBooksByYear),
      ...Object.keys(finishedArticlesByYear)
    ])
  ].sort().reverse();

  for (const y of Object.keys(finishedBooksByYear)) {
    finishedBooksByYear[y].sort(sortAlpha);
  }

  for (const y of Object.keys(finishedArticlesByYear)) {
    finishedArticlesByYear[y].sort(sortArticlesByDateDesc);
  }

  const finishedNoYear = finishedBooks.filter((b) => !b.yearRead).sort(sortAlpha);

  const statsByYear = {};
  for (const y of years) {
    const booksForYear = finishedBooksByYear[y] || [];
    const articlesForYear = finishedArticlesByYear[y] || [];

    statsByYear[y] = {
      books: booksForYear.length,
      articles: articlesForYear.length,
      total: booksForYear.length + articlesForYear.length,
      authors: new Set(booksForYear.map((b) => b.author).filter(Boolean)).size
    };
  }

  const latestFinishedBook = finishedBooks[0] || null;
  const latestFinishedArticle = finishedArticles[0] || null;

  const stats = {
    total: all.length,
    currentlyReading: currentBooks.length,
    finishedBooks: finishedBooks.length,
    finishedArticles: finishedArticles.length,
    finished: finishedBooks.length + finishedArticles.length,
    toRead: toReadBooks.length
  };

  return {
    updatedAt: new Date().toISOString(),

    all,

    books,
    articles,

    current: currentBooks,
    currentBooks,

    toRead: toReadBooks,
    toReadBooks,

    finishedBooks,
    finishedArticles,
    finished: [...finishedBooks, ...finishedArticles].sort((a, b) => {
      const ay = a.yearRead || 0;
      const by = b.yearRead || 0;
      if (ay !== by) return by - ay;

      const ad = Date.parse(a.date || "") || 0;
      const bd = Date.parse(b.date || "") || 0;
      if (ad !== bd) return bd - ad;

      return sortAlpha(a, b);
    }),

    finishedBooksByYear,
    finishedArticlesByYear,
    finishedNoYear,

    years,
    latestFinished: latestFinishedBook,
    latestFinishedBook,
    latestFinishedArticle,

    statsByYear,
    stats
  };
};
