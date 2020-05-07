---
layout: layouts/post.njk
postImage: "/v1579162295/trianglify.png"
introClass: intro--sml
title: Eleventy Cloudinary Shortcode
description: Created a shortcode for @eleven_ty so I can use Cloudinary images within
  markdown files.
keywords:
- forestry.io
- static site generator
- ssg
- eleventy plugin
- nunjucks
- markdown
- 11ty
- eleventy
- cloudinary
date: 2020-02-12T00:00:00Z
tags:
- notes

---
I made a thing. I've created a shortcode for [@eleven_ty](https://mobile.twitter.com/eleven_ty "Eleventy") so I can use Cloudinary images within markdown files. This is something I discovered I needed while using Forestry.io and markdown files.

With a bit of help from [@FrankTldr](https://mobile.twitter.com/FrankTldr "Frank Taillandier") at Forestry in identifying the solution, I set off and created it.

[https://github.com/juanfernandes/eleventy-plugin-cloudinary](https://github.com/juanfernandes/eleventy-plugin-cloudinary "Eleventy Cloudinary Shortcode")

    {% cloudinaryImage "imagename.jpg", "q_auto,f_auto", "Image alt text" %}
