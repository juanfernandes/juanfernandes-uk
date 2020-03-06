---
layout: layouts/post.njk
postImage: "/v1579162295/trianglify.png"
title: 'February 2020: Monthly Notes'
description: February was a good month for me as I released my first open-source project
  - a tiny thing I made - an eleventy shortcode for using cloudinary images in your
  markdown files.
keywords:
- contract
- work
- freelance
- personal
- notes
- monthly notes
date: 2020-03-06T17:00:00Z
tags:
- notes

---
February 2020: Monthly Notes

February was a good month for me as I released my first open-source project - a tiny thing I made - an eleventy shortcode for using cloudinary images in your markdown files.

## Freelance
Been quite a busy month for freelance work, but it's also my last freelance project as I've decided to stop doing freelance work. This is the first time mentioning this publicly, but I will write a blog post explaining this in more detail (I'm not going back to permanent work).

- Finished a redesign for a client website - a day nursery, its the first time I've designed a website for that industry and has been an opportunity to get a little creative

- Whilst adding cloudinary to my website, I discovered "auto image format" which means cloudinary will serve the best image format for the browser being used, so for chrome, it will serve images as webp - improving my websites' performance

- I've now removed the NetlifyCMS code from my website as I've fully switched over to Forestry.io CMS. I was running both of them in parallel whilst I finished setting up Forestry.

- While setting up forestry and Cloudinary, I ran into an issue with images, I needed a way of inserting images from Cloudinary into my markdown files, so I ended up creating an eleventy shortcode for adding cloudinary images to markdown files. Which I then put on a public repo and shared it with the 11ty community.

## Work
- My current contract is ending in March but I have been in talks with Signet (my previous contract) and they want me to come back and help them with their next project. This is great for me and it also means no break between contracts.😁

- I've continued building modules for my clients new WordPress website within Beaver Builder - I've even built a mini-module builder within Beaver Builder itself - it is a series of options allowing the user to customise a generic content block. Some of the options are things like rounded corners, borders, background colour etc - but the user is limited to just saying If they want an option, but can't change any of the properties - for example, they can change the border-radius size. 

- The rest of my time is spent creating new pages, whilst using modules created by the agency and testing them, raising bugs and testing fixes.

## Personal
- Continuing my deep dive into reviewing my privacy and what data I share, I have now deployed a pi-hole (a DNS sinkhole) at home and also set NextDNS as upstream servers for extra protection!

- There are ways around being able to use Pi-hole with the BT hubs, but I didn't like it, so it was an opportunity to also remove the BT hub from my network, which I've replaced with a Draytek Vigor router