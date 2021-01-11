---
layout: post
title: How I improved my website because of Content Security Policies
description: "Last month I delved into security headers including Content Security Policies and added a bunch of them to my website. As a result this has improved my website"
keywords:
- performance
- content security policies
- csp
- website performance
- secure website
- improved website
- eleventy
- 11ty
customPostImg: intro--code-img
date: 2021-01-08T23:00:00Z
tags:
- eleventy
- ssg
- performance
- csp
---

<p class="lead">Last month I delved into security headers including Content Security Policies and added a bunch of them to my website. I did this to learn more about website security and improve my websites' security.</p>

But I learnt that I had inadvertently broken some things on my site - this wasn't obvious because I have a cobbled together ServiceWorker which meant I didn't see the things that had stopped working - namely images and sliders.

I spent a few hours applying fixes to my website to comply with the Content Security Policies I implemented a few weeks ago and at the same time improved my websites' performance and usability.

{% fyi "CSP or Content Security Policy - are a set of rules you add to a web server to say how content should be served and from where. For example, you can choose to serve images, CSS and JS just from your domain. That means, for example, google analytics would not work and any scripts hosted elsewhere unless you specifically allow that domain." %}

The issue I had is that its either all or nothing. So you cant have any inline JS or CSS. The JS was a quick fix - I needed to move it to a file. But I use CSS to apply background images to components via the CMS. So I needed to move that to the CSS file and use a class to apply a chosen background image.

## What I changed

### Problem - Inline CSS
One of the issues I had was that all inline CSS is blocked, only linked to CSS files will be applied to my website, this meant that I had to change how I did the background images for the hero section. I was able to add the image via front matter or the CMS, which would then be added to the hero section using inline CSS.

### Solution
I now have a list of modifier classes I add to the hero section that chooses the type of background image I use. I have been using the same image for code related blog posts, for example, so it made sense to move that to a class in my main stylesheet. I can always create new ones with different background images when I need them.

You can use the "inline-unsafe" CSP rule to allow inline styling, but this makes it, as the name suggests, not safe to use. I think with my limited security knowledge that if you disallow inline scripts, it would be safe to allow inline styling - I can imagine the only way for someone to change the styling of your website would be via an injected script.

### Problem - Inline JavaScript, JS Library
I had a testimonials slider on my homepage - it used a slider script and some custom JS to customise the slider. I started by moving the custom code from being inline into a JS file and linking to it, but I was struggling to generate a SHA (Secure Hash Algorithm) for the slider library.

### Solution
Since I was struggling to get a SHA to work with the code for the slider, I decided to get rid of all the JavaScript, not just from the homepage, but also from the portfolio work pages.

Now I show a random testimonial on the homepage, with a new one being randomly shown every time there is a new build of my website.

I also removed the image slider from portfolio projects. The images now are shown in a column with project details on the right which I also applied position sticky to the project detail sidebar to it stays with the user as they scroll down to see all the project images.

## The result?

<div class="u-center"><img class="u-block u-auto-width" src="https://res.cloudinary.com/juanfernandes/q_auto,f_auto/fireworks.jpg" loading="lazy" width="520" height="215" alt="Shows the results of a Chromium Lighthouse test on my website"></div>

I enjoyed it this - now my website fully complies with very secure CSPs. It's more secure, has better performance and better for users. Win win.
