---
layout: "post"
title: "Automating my links list"
description: "How I automated my Instapaper “liked” articles into a clean, sorted JSON feed for my 11ty site — with date normalisation, HTML stripping, and deduplication, all running daily via GitHub Actions."
keywords:
  - 11ty
  - instapaper
  - json
customPostImg: "intro--code-img"
date: 2025-08-20T10:00:00Z
tags:
  - eleventy
  - ssg
  - json
tweetId: "1958105889900019834"
shareLink: "https://indieweb.social/@juanfernandes/115060493410357517"
---
How I automated my Instapaper “liked” articles into a clean, sorted JSON feed for my 11ty site — with date normalization, HTML stripping, and deduplication, all running daily via GitHub Actions.{.lead}

I keep a running list of articles I’ve read and liked — partly for reference, partly for sharing.
For years, I used [Instapaper](https://www.instapaper.com/) for saving articles, and IFTTT to log my “liked” ones into Airtable.

But getting them onto [juanfernandes.uk/links](https://juanfernandes.uk/links) meant **manually** updating a JSON file. Not exactly friction-free.

So I automated the whole thing. And over time, I’ve refined it to handle **dates properly**, **avoid duplicates**, and **keep the list sorted** — no manual edits, no mess.

---

### ✅ The stack

* **Instapaper RSS feed** – for fetching my recently liked articles
* **A custom Node.js script** – to grab new links, clean them, and update JSON
* **GitHub Actions** – to run the script and rebuild my site daily
* **11ty** – to display the links with pagination

---

### Step 1: The Instapaper RSS feed

Instapaper gives you a feed of your “liked” articles:

```
https://www.instapaper.com/starred/rss/[user_id]/[token]
```

It only shows your 10 most recent liked items, so the key is **appending new ones without losing older ones**.

---

### Step 2: Writing to `links.raw.json`

Instead of saving directly to `links.json` (which Eleventy uses for pagination), the script now writes to:

```
src/_data/links.raw.json
```

This file is my **raw archive** of everything I’ve ever liked on Instapaper.

Why? Because Eleventy treats `.js` and `.json` files in `_data` differently — having a `.js` file for `links` means I can read, sort, and clean the raw JSON every time before it’s passed to the templates.

---

### Step 3: The append script (`appendToJSON.js`)

The script does the heavy lifting:

* **Fetches** the Instapaper RSS feed
* **Normalizes dates** → full ISO 8601 format
  (`2025-07-28T18:53:22.000Z` instead of `2025-07-28`)
* **Strips HTML from titles**, so tags like `<details>` don’t show in headings
* **Keeps HTML in content** if I want formatted excerpts
* **De-dupes** by URL (latest version wins)
* **Sorts newest → oldest** before saving

Here’s a trimmed example of the mapping logic:

```js
function stripHtml(str) {
  return str ? str.replace(/<\/?[^>]+(>|$)/g, "") : "";
}

function toIso(val) {
  if (!val) return new Date().toISOString();
  const t = Date.parse(val);
  return Number.isNaN(t) ? new Date().toISOString() : new Date(t).toISOString();
}

// Map RSS items
const mapped = feed.items.map(item => ({
  title: stripHtml(item.title || ""),
  url: item.link?.trim(),
  content: item["content:encoded"] || item.content || "",
  date: toIso(item.pubDate || item.isoDate)
}));
```

---

### Step 4: Sorting in Eleventy

Now that `links.raw.json` is clean, `src/_data/links.js` becomes the single source of truth for Eleventy:

```js
const fs = require("fs");
const path = require("path");

module.exports = () => {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, "links.raw.json"), "utf8"));
  return raw.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
};
```

This guarantees that pagination always starts with the most recent items.

---

### Step 5: Automation with GitHub Actions

My GitHub Action now:

1. Runs `appendToJSON.js` to update `links.raw.json`
2. Builds the site with Eleventy
3. Deploys the updated site

That means every day my “Read Articles” page refreshes automatically, and it’s always:

* Up to date
* Properly sorted
* Free from HTML junk in titles
* Duplicate-free

---

### The result

[juanfernandes.uk/links](https://juanfernandes.uk/links) is now fully automated and clean.
No more manual edits, no more date format headaches, and no need to check if something’s already been added.

It just works. Every day.

If you want to set up something similar, the full append script is on my [GitHub](https://github.com/juanfernandes/juanfernandes-uk) — or drop me a message and I can help adapt it for your setup.
