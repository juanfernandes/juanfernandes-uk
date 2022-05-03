---
layout: layouts/post.njk
title: 'Weeknotes #19'
description: >-
  I'm sounding like a broken record, but it has been yet another slow week.
  We're still having some GIT related issues - not me personally, but we're also
  completely redoing our build process so that has caused some expected issues.
keywords:
  - freelance
  - web designer
  - freelance web designer suffolk
  - remote
  - front-end developer
  - contract
  - contractor
  - git
  - gpg
  - gnu privacy guard
  - fish shell
postImage: "/v1579162295/og.jpg"
date: 2019-06-18T19:49:39.610Z
tags:
  - notes
---
I'm sounding like a broken record, but it has been yet another slow week at work. We're still having some GIT related issues - not me personally, and we're also completely redoing our build process so that has caused some expected issues.

## Freelance
This week I decided to set up [GPG](https://gnupg.org/ "Gnu Privary Guard") to sign my GIT commits - just because I saw a talk about it by [Ric Harvey](https://twitter.com/ric__harvey "Ric Harvey on Twitter") at the [Colchester Digital conference](https://colchesterdigital.org.uk/conference/ "Colchester Digital Conference"). Someone at work asked me why I go through the hassle of setting this up; I said that by spending my spare time doing something like this - next time I get a contract that requires me to sign my git commits, I'll either be ready to do with my own laptop or at least know how to get it set up on a new machine.

So, setting up GPG itself on my MacBook Pro was fairly easy - but where I ran into issues was using it with [Fish shell](https://fishshell.com/ "Fish Shell") - which I'm still learning more about as I haven't been using it for that long.

I was getting the following error ```failed to write commit object```; to fix this I needed to export the GPG TTY  in my ```fish.config``` file:

```set -x GPG_TTY (tty)```

Easy right! Took quite a few hours of searching and trying different things to get to that fix, once I realised it was working in Terminal and it didn't work using Fish shell.

I have now cancelled my Reseller account and can say goodbye to Heart Internet - finally. I've not been happy with them for the last few years as their service deteriated as well as their customer support, plus they are now owned by GoDaddy! I was a customer of theirs for over 10 years.

Spent a couple of hours fixing things that had broken as part of the move away from them including HTTPs issues with my friends WordPress website and I also fixed some of their CSS issues - which were being caused by the theme having hardcoded image links.


## Personal
I mentioned a couple of weeks ago that I spent a few days writing a cover letter and answering a bunch of questions for a permanent job application - well I heard back and unfortunately, I didn't get an interview. It was expected really, they are an awesome and well-known company, had loads of applications and I knew that I didn't have all the required skills they wanted, but it was good to spend that time thinking about why I want to go back to permanent work.

I'm still not 100% sure if going back to permanent is for me, not yet anyway, I still feel as though freelance work, not contract, would be better for me - but that trouble with freelance, at least for me is that it has always been very much 'feast or famine' and that's not great when you have a mortgage and bills to pay, as well as a family to support. I plan on writing a blog post about 'Permanent vs Freelance vs. Contract' work, to hopefully help me work out what is the best route for me.

## Reading
- [When should you quit?](https://justinjackson.ca/quit "When should you quit?")
- [Highlights from Git 2.22](https://github.blog/2019-06-07-highlights-from-git-2-22/ "Highlights from Git 2.22")
- [Preload, prefetch and other <link> tags: what they do and when to use them · PerfPerfPerf](https://3perf.com/blog/link-rels/ "Preload, prefetch and other <link> tags: what they do and when to use them · PerfPerfPerf")
- [Why You Don't Need Cloudflare with Netlify](https://www.netlify.com/blog/2017/03/28/why-you-dont-need-cloudflare-with-netlify/ "Why You Don't Need Cloudflare with Netlify")
