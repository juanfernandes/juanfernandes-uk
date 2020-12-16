---
layout: 'post'
title: 'Creating a Sitemap file with Eleventy'
description: 'This is a quick tip showing how I created a sitemap.xml file using Eleventy that will automatically update itself when you create new pages'
keywords:
- sitemap
- sitemap xml
- seo
- eleventy
- 11ty
customPostImg: 'intro--code-img'
date: 2020-10-23T00:00:00+01:00
tags:
- eleventy
- seo
- ssg
---

This is a quick tip showing how I created a ```sitemap.xml``` file using [Eleventy](https://www.11ty.dev "Eleventy - the simpler static site generator") that will automatically update itself when you create new pages.

You need a sitemap to make it easier for search engines to index your website - but you can also inform them about how often pages are updated, when they were last updated and the priority level for each page.


## What is a sitemap.xml file?

>The Sitemaps protocol allows a webmaster to inform search engines about URLs on a website that are available for crawling. A Sitemap is an XML file that lists the URLs for a site. It allows webmasters to include additional information about each URL: when it was last updated, how often it changes, and how important it is in relation to other URLs of the site.

*[Wikipedia](https://en.wikipedia.org/wiki/Sitemaps)*

## How it works

The first thing I am doing here is excluding the sitemap file from the eleventy collection - we don't want the sitemap listing the sitemap.xml file as an entry.

I then set the permalink - which is the filename we want as its what search engines look for when they visit your website.

We then loop through the eleventy ```collections.all``` and output each page URL wrapped in a ```<url>``` tag. Inside that tag, we have the standard sitemap tags, ```<loc>```, ```<lastmod>```, ```<changefreq>``` and ```<priority>```.

- LOC is short for Location and holds the complete URL to the page
- LASTMOD is short for Last Modified which is the date the file was last changed
- CHANGEFREQ is short for Change Frequency which tells search engines how often the page changes
- PRIORITY tag which tells search engines the priority of the page.

## Let's see the code

```
---
eleventyExcludeFromCollections: true
permalink: sitemap.xml
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  {% raw %}{%- for page in collections.all %}
  <url>
    <loc>{{ site.url }}{{ page.url }}</loc>
    <lastmod>{{ page.date | w3DateFilter }}</lastmod>
    <changefreq>monthly</changefreq>
    {% if page.url == '/' %}
    <priority>1.00</priority>
    {% else %}
    <priority>0.50</priority>
    {% endif %}
  </url>
  {%- endfor %}{% endraw %}
</urlset>
```

### A couple of things to note

I am using a filter to process and format the date - that's the w3DateFilter in the lastmod tag.

Also, I'm setting the home page as having the highest priority and setting all other pages to be less of a priority. I'm not an SEO expert and so I don't know if this is the best way of doing it or not, but based on some quick research I'm convinced this approach will work as I read that if you omit the priority, then a page's priority is usually set to 0.5 by default. This will work for smaller sites, but on a large site - this may not be the best approach.

Same with the Change Frequency - I'm setting all pages to have monthly set as the default for how often the page changes. I won't be doing many updates on my clients' website so I think monthly is appropriate for their website.

That's it - this is enough for a small website that doesn't get updated very often, but we can make this better for larger sites with content authors - let's look into that now.

## Now let's make it better

The above example works perfectly for my client and their small website. It doesn't need to be updated regularly and they don't have a lot of pages - plus they are not very technical, so asking them to specify a page priority and change frequency I know it just wouldn't work for them.

But let's say you have a client website that has content authors and they are used to SEO terms, page priorities and change frequencies - let's give them the ability to add those to pages.

Here we are adding it via frontmatter but this could be handled by a CMS as well.

```
---
eleventyExcludeFromCollections: true
permalink: sitemap.xml
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  {% raw %}{%- for page in collections.all %}
  <url>
    <loc>{{ site.url }}{{ page.url }}</loc>
    <lastmod>{{ page.date | w3DateFilter }}</lastmod>
    <changefreq>{% if page.data.changefreq %}{{ page.data.changefreq }}{% else %}monthly{% endif %}</changefreq>
    <priority>{% if page.data.priority %}{{ page.data.priority }}{% else %}0.5{% endif %}</priority>
  </url>
  {%- endfor %}{% endraw %}
</urlset>
```

## Let's look at what is different

We are now checking to see if the page data contains a ```changefreq``` if it does, we use it, otherwise, we use *monthly* as the default and we use the same approach with the page ```priority``` - if the user has not set a page priority, we use a default of *0.5* - that's it.

A nice and easy fix to allow content authors more control over their pages whilst also having a default value automatically set if the author has not set one.

## Wrapping up
I love these quick wins - doing a small thing to make maintaining a website a lot easier. You can just set it and forget it.
