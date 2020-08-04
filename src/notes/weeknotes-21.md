---
layout: layouts/post.njk
title: 'Weeknotes #21'
description: >-
  Work on the new header continues for one of the brands and the pressure is on
  to get it finished within this sprint.  More work on my own website and some
  tinkering with our new car.
keywords:
  - weeknotes
  - freelance
  - contract work
  - netlify cms
  - static site generator
  - dash cam
  - discord
  - minecraft
postImage: "/v1579162295/og.jpg"
date: 2019-07-24T05:00:56.146Z
tags:
  - notes
---
## Work
Work on the new header continues for one of the brands and the pressure is on to get it finished within this sprint.

This week we created a new branch to merge all the separate branches. Since two developers have been building different components for the header, we needed to start bringing in those components into one branch to start forming the header.

We did it this way because we didn't want to merge our new components into our development branch in case we don't get the work finished and tested on time.

There are quite a few moving parts with this piece of work and its a big part of the website. Front-end, back-end and the product teams all have work to do to get this live.

To add further complication - because both brands share the same HTML code - but different styling, the backend team have to build a 'switch' that will check whether a brand gets the new header or the old one since we're only building one at a time.

Also, as part of the new header, the navigation items are now going to be controlled via the CMS by the product teams - so this has to be populated manually in each environment and must be completed before we can go live with it.

Working on components in an isolated way is great, but then, when they have to come together, there's going to be some issues as they are integrated, especially with all of them being part of the header and they have to be 'aware of each other. For example. When a user clicks the menu icon, we activate an overlay and show the menu, but we also have to check if the search component is open, if it is, it needs to be closed. What if the user has the menu (and overlay) open and then they click the search icon to open the search component - we need to _not_ hide the overlay, but close the menu. What seems like a simple design, can start to get complicated when you have so many moving parts.

## Freelance
Continued working on my website - mainly working on the blog. I added the [Netlify CMS](https://www.netlifycms.org/ "Netlify CMS") to my site and have started adding my old blog posts to it via the Netlify CMS interface.

I looked into changing my current RSS feed so it shows the entire post, as opposed to just an excerpt but I couldn't get it to work, so I'm just manually copying the posts from my current CMS and into Netlify CMS.

I've fixed some of the metadata issues and its working, but I do need to look at this in more detail as its a bit clunky. I need to take it out of the layout template and include it as a partial so it's easier to work with it in base and blog layouts.

I also decided to move my notes out of the blog and into its own section. So on the new site, weeknotes and other notes will live in ```/notes``` and not in ```/blog```. I did this because, to separate posts from notes, I tagged posts with a ```post``` tag but this meant that when I show the post tags at the end of each blog post, it was showing ```post``` which was pointless.

Here is a list of the issues I'm working through:
- [https://gitlab.com/juanfernandes/juanfernandes-v2/issues](https://gitlab.com/juanfernandes/juanfernandes-v2/issues  "GitLab Issues")


## Personal
This week I set up a Discord server so I can chat with my kids while we play on our Minecraft server during the summer holidays while I'm away for work. It will be mainly with my son, who is really into it - so I got him a headset and he loves it :D

We have a new family car, and it's a nice one, that we want to keep for a long time and since its a nice car, we decided it would be a good idea to install a dashcam. There are so many reckless drivers on the roads, we don't want to take any chances with insurance companies!

Felt wrong loosening the interior panels to hide the cables for the dashcam. I have a couple of issues I need to solve; the power lead is not long enough for our car because the cigarette lighter socket is near the back of the centre console and also the rear camera is causing interference with the radio.

I'm going to replace the cigarette lighter power cable with a longer USB cable and get a USB cigarette lighter adapter. With the interference I need to look into what is causing this - I think I need to connect the cable to earth/ground point.

_Anyway, that's enough from me. How was your week?_
