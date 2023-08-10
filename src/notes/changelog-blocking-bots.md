---
layout: layouts/post.njk
postImage: "/v1579162295/trianglify.png"
title: 'Changelog: Blocking GoogleBot and ChatGPT bot'
description: 'With the rise of AI and companies profiting from free content online, I, like many others have decided to just block access to those bots'
keywords:
- indieweb
- ai
- googlebot
- chatgpt
date: 2023-08-09T20:00:00Z
tags:
- notes
- changelog

---
## Changelog: Blocking GoogleBot and ChatGPT bot

Update: Added more bots, my robots.txt file content and another source post

With the rise of AI and companies profiting from free content online, I, like many others, have decided to just block access to those bots. I will add to my robots.txt file as I find more bots to block. 

I don't care about being 'found' on search engines these days, as I don't need it to get freelance work because I rarely do freelance work these days anyway.

Here's my robots.txt file:

    # www.robotstxt.org

    User-agent: GPTBot
    Disallow: /

    User-agent: googlebot
    Disallow: /

    User-agent: yandex
    Disallow: /

    User-agent: redditbot
    Disallow: /

    User-agent: bingbot
    Disallow: /

### Sources
- [Permission - Jeremy Keith](https://adactio.com/journal/20315 "Permission - Jeremy Keith")
- [Twitter/X thread by Gergely Orosz](https://twitter.com/gergelyorosz/status/1688829094249615360 "Twitter/X thread by Gergely Orosz")
