---
layout: "post"
postImage: v1579162295/trianglify.png
title: 'TIL: Generating a hash from the command line'
description: Since adding Content Security Policies to my website, I need to add a
  sha for any inline scripts I use - I only use one, which is the one to initiate
  the ServiceWorker.
keywords:
- CSP
- sha256
- sha
- TIL
date: 2021-05-27T23:00:00.000+00:00
tags:
- til
- notes
tweetId: "1398265102407802881"

---
Since adding Content Security Policies to my website, I need to add a sha for any inline scripts I use - I only use one, which initiates my ServiceWorker.

I keep forgetting how to genetate shas. Making a note for future reference.

You can generate a hash using openssl:

```
echo -n 'doSomething();' | openssl sha256 -binary | openssl base64
```
