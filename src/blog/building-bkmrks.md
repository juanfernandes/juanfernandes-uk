---
layout: "post"
title: "Building BKMRKS | A Lightweight Bookmarks Manager Project"
description: "A behind-the-scenes look at how I built BKMRKS, a lightweight bookmarks manager. Covers the design process, tech stack, and lessons learned while creating a simple, self-hosted tool for organising links."
intro:
  heading: Building BKMRKS
  subheading: Simple Bookmarks Manager
keywords: bkmrks, bookmarks manager, self-hosted bookmarks, simple bookmarks app, build your own bookmarks manager, next.js project, juan fernandes blog, lightweight web app, personal project case study
date: 2025-10-02T22:00:00Z
tags:
  - Next.js
  - ReactJS
tweetId: ""
shareLink: ""
---
I’ve always relied on bookmarks to save useful links — design systems, dev docs, tools, inspiration, articles I want to revisit later. The problem is: browser bookmarks quickly become cluttered, messy, and difficult to manage across devices. I wanted something cleaner, more organised, and under my control.{.lead}

So I decided to build my own solution: BKMRKS — a minimal, full-featured bookmark manager that runs anywhere, needs no database, and can be deployed on simple shared hosting.

## The Starting Point

Originally, I experimented with Supabase as the backend for authentication, storage, and APIs. While it worked, it quickly felt like overkill. I didn’t want to depend on a hosted service, worry about migrations, or deal with vendor lock-in.

I asked myself: “Do I really need a database at all?”

The answer was no. For my use case — static bookmark storage, tagging, filtering, and importing/exporting JSON — a simple file-based approach was enough.

## The Approach

I set out to build BKMRKS as a static-first app:

- Frontend in React: Clean UI, fast search, category filtering, and tagging.

- Data as JSON: Bookmarks live in a simple .json file — human-readable, portable, and easy to back up.

- Import/Export: Users can upload/export their own bookmarks as JSON.

- Deploy Anywhere: Works on Netlify, Vercel, or even plain old shared hosting. No database required.

This decision massively simplified the architecture. Instead of a stack with a database, auth, and server-side code, BKMRKS is essentially just a React app plus a JSON file.

## Key Features

Despite its simplicity, BKMRKS is designed to feel complete:

- Search – instantly find bookmarks by title, tag, or description.

- Categories – group links under T-shirts, Hoodies... (just kidding 😅) — I mean Work, Design, Dev Tools, Articles, etc.

- Tagging – flexible organisation across categories.

- Import/Export – add bookmarks from your browser, or back them up in seconds.

- Static Storage – everything is in JSON. No logins, no databases, just pure portability.

## Lessons Learned

Dropping Supabase was the right move. I didn’t need realtime sync, row-level security, or a hosted PostgreSQL instance for something that’s essentially a personal library.

By keeping things static:

- Setup is easier — no config, no environment variables.

- Maintenance is zero — it just works on shared hosting.

- Performance is great — no server round-trips, everything is local.

It’s a reminder that not every project needs a “modern stack” with APIs and databases. Sometimes, plain JSON files do the job.

## What’s Next?

I want to expand BKMRKS with a few ideas:

- Better UI polish — more drag-and-drop, cleaner category browsing.

- Optional cloud sync — without tying users to a single provider.

- Public sharing — the ability to make collections of bookmarks public.

For now though, it’s already doing what I need: a clean, no-frills way to manage my links across devices.

## Why This Matters

Building BKMRKS reminded me why I enjoy side projects: solving my own problems in the simplest way possible. It’s lightweight, portable, and future-proof — no SaaS dependencies, just a little React app and a JSON file.

Sometimes, that’s all you need.
