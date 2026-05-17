import fs from "node:fs/promises";
import path from "node:path";
import "dotenv/config";

const username = process.env.UNTAPPD_USERNAME;
const clientId = process.env.UNTAPPD_CLIENT_ID;
const clientSecret = process.env.UNTAPPD_CLIENT_SECRET;

const outputPath = path.resolve("src/_data/beers.json");

if (!username || !clientId || !clientSecret) {
  console.error("Missing UNTAPPD_USERNAME, UNTAPPD_CLIENT_ID or UNTAPPD_CLIENT_SECRET");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPage(offset = 0) {
  const url = new URL(`https://api.untappd.com/v4/user/beers/${username}`);

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("client_secret", clientSecret);
  url.searchParams.set("limit", "50");
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("sort", "date");

  const res = await fetch(url, {
    headers: {
      "User-Agent": `Juan Beer Archive (${clientId})`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Untappd API error ${res.status}: ${text}`);
  }

  return res.json();
}

function normaliseBeer(item) {
  const beer = item.beer || {};
  const brewery = item.brewery || {};

  return {
    id: beer.bid,
    bid: beer.bid,
    beerSlug: beer.beer_slug,

    name: beer.beer_name,
    style: beer.beer_style,
    abv: beer.beer_abv,
    ibu: beer.beer_ibu,

    rating: item.rating_score,
    yourCount: item.count,
    firstHad: item.first_had,
    lastHad: item.recent_created_at,

    brewery: {
      id: brewery.brewery_id,
      name: brewery.brewery_name,
      country: brewery.country_name,
    },

    label: beer.beer_label,

    url: beer.beer_slug && beer.bid
      ? `https://untappd.com/b/${beer.beer_slug}/${beer.bid}?filter=you`
      : null,
  };
}

async function run() {
  let offset = 0;
  let allBeers = [];

  while (true) {
    console.log(`Fetching beers from offset ${offset}...`);

    const data = await fetchPage(offset);
    const items = data?.response?.beers?.items || [];

    if (!items.length) break;

    allBeers.push(...items.map(normaliseBeer));

    if (items.length < 50) break;

    offset += 50;

    await sleep(1000);
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  await fs.writeFile(
    outputPath,
    JSON.stringify(
      {
        lastUpdated: new Date().toISOString(),
        total: allBeers.length,
        beers: allBeers,
      },
      null,
      2
    )
  );

  console.log(`Saved ${allBeers.length} beers to ${outputPath}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
