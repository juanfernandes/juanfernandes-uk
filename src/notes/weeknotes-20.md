---
layout: layouts/post.njk
title: 'Weeknotes #20'
description: >-
  After a bit of an unscheduled break, my weeknotes are back. You may notice
  that weeknotes are no longer showing on the blog index - after some feedback,
  I decided it didn't make sense to clutter the blog with notes. They have taken
  over because I've not been writing much of anything else.
keywords:
  - weeknotes
  - blog
  - components
  - HTML
  - SCSS
  - JavaScript
  - web design
  - cloudinary
  - Netlify
postImage: "/v1579162295/og.jpg"
date: 2019-07-15T20:45:28.098Z
tags:
  - notes
---
After a bit of an unscheduled break, my weeknotes are back. You may notice that weeknotes are no longer showing on the blog index - after some feedback, I decided it didn't make sense to clutter the blog with notes. They have taken over because I've not been writing much of anything else.

## Work
I've been busy building components for the new header for one of the brands. I've been creating the new search component. Just working on the HTML, SCSS and some JavaScript - but I'm going to need some help from the team to improve my JS.

I'm not writing the code for the actual searching and returning results, we'll be using the existing code for that.

The trickiest thing - for me at least, with building the search component is how it behaves on mobile when a user scrolls the page. The expected behaviour will be that when the site first loads, the search component will be visible, but then hides when the user scrolls the page up and shows again when the user scrolls down.

I've added this now, but the main concern is how it will affect the site performance, as I have to watch for a scroll action, currently without any delay - so I need to add some kind of delay or X amount of pixels to scroll before it shows the search component again.

I've now moved onto creating the new header - including a new menu button, search icon, user login/logout, store locator link and basket with item count. There are some unique things with the design, that makes it a little bit more complicated to build - there are some changes between mobile and desktop but it will retain the burger menu - the main difference the search component - on desktop it will be hidden and shown with a search icon, revealing it under the header - it looks nice and clean.

## Freelance
I've been quite productive on the rebuild of this website. As I have mentioned before, my current side project is rebuilding this website using a static site generator, 11ty and moving away from PHP and Perch - purely for wanting to learn new technologies and further my skills.

A few highlights include:
- removed all links to cloudinary, since Netlify provides all the same features that I currently use, there is no need to use both
- finished converting the blog index, post and archive templates into Nunjucks and now am able to turn markdown blog posts into HTML pages
- removed the social media sharing component from the blog posts template - this was a basic HTML component that allowed users to click on a social network icon and share the post to network - but I'm pretty sure no one uses these things and I've read a few articles in the past that say the same - so out with the clutter
- removed category links from the sidebar throughout the blog - they are being replaced by blog post tags, which will be at the end of each post
- recreated my RSS feed and now because of 11ty, it's much easier to create specific feeds for each category - this will allow users to subscribe to all blogs posts, including notes or just notes, or blog posts about design or development etc
- started setting up the Netlify CMS config file and I plan to document the process into a blog post

## Reading
- [Using Netlify to the Fullest](https://dev.to/remotesynth/using-netlify-to-the-fullest-3ef "Using Netlify to the Fullest")
- [Separating business and personal money - Work Notes](https://worknotes.co.uk/money/separating-business-and-personal-money/ "Separating business and personal money - Work Notes")
- [Create a split, faux-container layout with CSS Grid and Flexbox - Andy Bell](https://piccalil.li/tutorial/create-a-split-faux-container-layout-with-css-grid-and-flexbox/ "Create a split, faux-container layout with CSS Grid and Flexbox - Andy Bell")
- [Part 2: What the Fr(action)?](https://css-irl.info/debugging-css-grid-part-2-what-the-fraction/ "Part 2: What the Fr(action)?")
- [Weeknotes #14 by Vincent Pickering](https://vincentp.me/articles/2019/06/23/17-00/ "Weeknotes #14 by Vincent Pickering")
- [Putting Down Your Phone May Help You Live Longer](https://www.nytimes.com/2019/04/24/well/mind/putting-down-your-phone-may-help-you-live-longer.html "Putting Down Your Phone May Help You Live Longer")
- [8 UX Mistakes To Avoid On Your UX Portfolio Website](https://hackernoon.com/8-ux-mistakes-to-avoid-on-your-ux-portfolio-website-4d6dd437cf21 "8 UX Mistakes To Avoid On Your UX Portfolio Website")
- [Create a user controlled dark or light mode by Andy Bell](https://piccalil.li/tutorial/create-a-user-controlled-dark-or-light-mode/ "Create a user controlled dark or light mode by Andy Bell")
- [Weeknotes #7 by Dave Rupert](https://daverupert.com/2019/06/weeknotes-7/ "Weeknotes #7 by Dave Rupert")
- [Eating my own dog food by Andy Bell](https://archive.hankchizljaw.com/wrote/eating-my-own-dog-food/ "Eating my own dog food by Andy Bell")
- [doors and windows and what’s real by Derek Sivers](https://sive.rs/dw "doors and windows and what’s real by Derek Sivers")
- [Keeping it simple with image alt text for accessibility by Andy Bell](https://archive.hankchizljaw.com/wrote/keeping-it-simple-with-image-alt-text-for-accessibility/ "Keeping it simple with image alt text for accessibility by Andy Bell")
- [Why Did I Have Difficulty Learning React?](https://snook.ca/archives/javascript/difficulty-with-react "Why Did I Have Difficulty Learning React?")
- [Leggo My Pattern Library Analogy](https://snook.ca/archives/html_and_css/leggo-my-analogy "Leggo My Pattern Library Analogy")
- [Week Notes – S01E01 by Stu Robson](https://alwaystwisted.com/articles/week-notes-s01e01 "Week Notes – S01E01 by Stu Robson")
- [Designing a design system by Adam Silver](https://adamsilver.io/case-studies/designing-a-design-system-for-hmcts/ "Designing a design system by Adam Silver")
- [Adding Webmentions to my personal site by Andy Bell](https://archive.hankchizljaw.com/wrote/adding-webmentions-to-my-personal-site/ "Adding Webmentions to my personal site by Andy Bell")
- [The Command Line: Part 2 - code.blog](https://codeblog.trovster.com/2019/07/command-line-part-2/ "The Command Line: Part 2 - code.blog")
- [How to improve the UX of your UX portfolio](https://www.invisionapp.com/inside-design/improve-ux-portfolio/ "How to improve the UX of your UX portfolio")
