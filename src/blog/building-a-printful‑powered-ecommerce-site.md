---
layout: post
postImage: ''
title: "Building a Printful‑powered e‑commerce site with 11ty and Stripe"
description: ""
keywords:
- 
customPostImg: "--post"
date: 2025-06-13T19:00:00Z
tags:
- 
tweetId: ""
---
As someone who loves clean, static-generated sites, I recently decided to challenge myself: could I build a small online merch store using [Eleventy (11ty)](https://www.11ty.dev/), Printful’s API, and Stripe—while keeping the setup simple and JavaScript‑free in the templates? Turns out… yes, and it's been pretty fun! 🎉{.lead}

---

## 🧱 1. Fetching products from Printful

My site’s product data lives fully in `src/_data/products.js`. Here's the process:

1. On build:

   * Fetch `/store/products` via Printful’s REST API.
   * For each product, fetch its variants.
   * Generate a slug (`slugify` + small MD5 hash).
   * Deduce categories via `getCategoryFromName(...)`.
   * Save the result to `cache/products.json`.

This makes the page templates super easy—they just loop over `products` or filter them by `product.category`.

I made sure the category names are consistent—`t-shirts`, `hoodies`, `stickers`, and a new one, `hats`. If the product name contains the word **Hat**, it'll now correctly be picked up as `"hats"`, not mis‑grouped in "Other".

---

## 📂 2. Generating category and product pages with Eleventy

### Data source

With the fully formed `products` array available globally, I can create dynamic templates like:

**`src/products/index.njk`** (all products & categories):

```{% raw %}
  {% set displayNames = {
    "t-shirts":"T‑Shirts", "hoodies":"Hoodies", "stickers":"Stickers", "hats":"Hats", "other":"Other"
  } %}
  {% set categorySet = [] %}
  {% for p in products %}
    {% if p.category and p.category not in categorySet %}
      {% set categorySet = categorySet.concat([p.category]) %}
    {% endif %}
  {% endfor %}
  {% set sortedCategories = categorySet | sort %}
  <ul>
    {% for cat in sortedCategories %}
      <li><a href="/products/{{ cat | slugify }}/">
        {{ displayNames[cat] or (cat | capitalize) }}
      </a></li>
    {% endfor %}
  </ul>
  <div class="products">
    {% for p in products %}
      <a href="/products/{{ p.slug }}/">
        <img src="{{ p.thumbnail_url }}" alt="{{ p.name }}">
        <h3>{{ p.name }}</h3>
      </a>
    {% endfor %}
  </div>{% endraw %}
```

Note the careful categorization and display name mapping.

### Pagination for categories

To generate `/products/hats/` (and others):

**`src/products/category.njk`**:

```{% raw %}
---
layout: base
pagination:
  data: categoriesFlat
  size: 1
  alias: category
permalink: "/products/{{ category | slugify }}/index.html"
---

<h1>{{ category | capitalize }} Products</h1>
<ul>
  {% for p in products %}
    {% if p.category == category %}
      <li><a href="/products/{{ p.slug }}/">{{ p.name }}</a></li>
    {% endif %}
  {% endfor %}
</ul>{% endraw %}
```

Here, `categoriesFlat.js` under `_data/` returns a list of unique category slugs. Eleventy then auto-generates a directory for each one—now including `hats`.

---

## 🛒 3. Cart, variant selection, checkout with Stripe

On each product page, a `select` lets you choose the variant (size, colour). I added JavaScript to swap the preview image and update the price using `Intl.NumberFormat`:

```js
const formatter = new Intl.NumberFormat('en-GB', {
  style:'currency', currency:variant.currency
});
priceEl.textContent = formatter.format(variant.price);
```

🛒 Clicking **“Add to Cart”** stores the item in `localStorage`. The main site header reads from `localStorage` and updates the cart icon count in real-time.

Finally, hitting **Checkout** sends the cart contents to a Vercel function (`/api/checkout.js`), which builds a Stripe Checkout session and returns a URL for redirection.

---

## 🧠 Lessons & Takeaways

* **Eleventy + Printful = a flexible JAMstack store** — no server, no CMS, just simple JS and APIs.
* **Category handling:** Ensuring string consistency (e.g. `"hats"` vs `"hat"`) was crucial to avoid mis‑grouping.
* **Pagination:** Eleventy makes it easy to generate multiple category pages with minimal code.
* **UX polish:** Small touches like clean titles (`productName – siteTitle`) and formatted currency add a layer of professionalism.

---

## Next Steps

* Add product descriptions with a Markdown file fallback.
* Show variant options dynamically on listings (e.g. “Available in XS–XL”).
* Add size guides or shipping info with data‑driven modals.
* Clean up code and publish on a public repo.
---

If you’re interested in helping me test, extend it, or make it even more dynamic—just drop me a line.
