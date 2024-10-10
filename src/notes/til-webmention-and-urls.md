---
layout: "post"
postImage: v1579162295/trianglify.png
title: TIL - Webmention and URLs
description: Creating a post with a title that has uppercase letters, like IR35 -
  the URL will have those uppercase letters in your file system, but in the live URL
  they will be lowercase
keywords:
- URLs
- webmentions
date: 2021-05-05T23:00:00Z
tags:
- notes

---
TIL: If you create a post with a title that has uppercase letters, like IR35 - the URL will have those capital letters in your file system, but in the live URL they will be lowercase.

This may be obvious to some, but I had not noticed until I started working on implementing webmentions on my website. 

A webmention recorded against `/blog/working-an-inside-ir35-contract/` will not show mentions for `/blog/working-an-inside-IR35-contract/`.

Took me a few hours to figure out that was why webmentions were not showing for that blog post!
