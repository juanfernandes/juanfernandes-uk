---
layout: "post"
eleventyExcludeFromCollections: true
postImage: "/v1579162295/og.jpg"
title: 'Monthly Notes: July 2020'
description: July has been a bit slow going as I slowly get back into web development,
  now that the homeschooling has ended and I'm cooking a lot less as my wife has now
  finished work. I'm still looking for my next contract, but I do have some potential
  freelance projects coming up shortly. Things are looking up.
keywords:
- logitech mx vertical
- logitech mx master
- couch to 5k
- herman miller aeron
- autonomous ergo chair 2
- contract frontend developer
- freelance web designer
date: 2020-08-03T00:00:00+01:00
tags:
- notes
- monthly-notes
---
July has been a bit slow going as I slowly get back into web development, now that the homeschooling has ended and I'm cooking a lot less as my wife has now finished work.

I'm still looking for my next contract, but I do have some potential freelance projects coming up shortly. Things are looking up.

## Work

Just at the end of the month, I lost a web hosting client. I took over the managing of their website earlier this year as they wanted to have the website managed by a professional.

Losing a web hosting client is common enough - it happens, so I wasn't too bothered by them wanting to move on, but what did bother me was that I believe the client has been mis-sold website hosting with their new website, as in "your website needs to be hosted by us".

The web designer claims the client "wants everything in one place" but the way they have gone about doing this is completely the wrong way and opposite to what the client wants - let me explain.

When moving your website to a new host, first you set up the website and the DNS records on the new host, then once that has been done and the new website is ready to go live, you change the name servers on the domain name to point to the new host.

What the web designer did was ask the clients' IT support person (external company) to change the A record on the domain name - the A record points the domain name to a server, so he asked the IT person to change it to his servers IP address.

So what's wrong with that, well this means that if I delete the clients hosting package (once a customer moves their site, I delete their account as its no longer needed) on my server, this will delete all their DNS records, including their MS Exchange email DNS records, meaning the client would lose access to all their email accounts for the entire business (three locations) as soon as the DNS changes propagated.

I've had to keep their website account on my server running, while they get in touch with whoever manages the domain name, so they can change the name servers to point it to the web designers own hosting. But they are only doing this because I told them that if they don't they will have to continue paying me for hosting as well as the web designers own web hosting.

As it stands, the client now has DNS records hosted with me, the new website with the web designers own host and the domain name managed and hosted by someone else - what was that about the client wanting everything in one place.

Anyway, it's never nice to lose a client, I just don't like to see them get a worse deal. Since the client paid for a year of hosting, I have kept the hosting account running until they change the name servers which won't be done for a while as the IT person is now on holiday.

### Freelance Work

Onto some good news - I have a potential new freelance client who needs a website for their Bed and Breakfast business - I'll be having an initial meeting with them soon - so I'll be sure to update you on how it goes.

Meanwhile, I have started to look for a new contract, but things are still not looking so good out there. There are contracts but mainly for React/JS Developers, not many for Interaction Designers or generalist Frontend Developers like myself.

Next step is for me to do my usual email blast to all the recruiters that have previously been in contact with me about contract work and let them know I'm available and looking for a new contract - stating my day rate and that I ideally would prefer a remote-only contract (fingers crossed).

### Home Office Improvements

I've made some progress with the home office improvements. Two new purchases have been made - a new chair and a new mouse.

{% cloudinaryImage "v1596477696/home_office_desk_phjw5u.jpg", "q_auto,f_auto", "Photo of my home office desk showing my monitor, macbook pro, desk lamp, keyboard and two computer mice." %}

I decided to buy the [Autonomous Ergo Chair 2](https://www.autonomous.ai/office-chairs/ergonomic-chair "Autonomous Ergo Chair 2") because it was cheaper than a Herman Miller Aeron, even a second hand one, The reason I purchased the cheaper (still expensive) chair was because at the moment, I'm still not getting fully remote contracts - I didn't want to spend about £500 on a chair I may only use two days a week.

Once all my contracts are fully remote, then I can assess the chair situation and see if I do indeed need an Aaron chair.

The Ergo Chair 2 didn't have as many recommendations as the Aeron, but it did come with some very good recommendations, including this one from Ben Frain - [read his detailed review of the Ergo Chair 2](https://benfrain.com/review-autonomous-ergochair-2-office-chair/ "Autonomous Ergo Chair 2 Review"). The chair is due to be shipped at the end of August.

My other purchase was the [Logitech MX Vertical mouse](https://www.logitech.com/en-us/product/mx-vertical-ergonomic-mouse "Logitech MX Vertical mouse"). I still have my MX Master - which is a very good mouse - but it's no longer helping with wrist pain, which it did for a long while.

The MX Vertical comes highly recommended from other developers who also suffer from wrist pain. I decided to buy it and give it a try for a bit and see how I get on with it.

It is taking some getting used to, as its a different shape to a standard mouse and your hand is in a different position. I'll see if it helps minimise my wrist pain. I'll continue using the MX Master for gaming - well playing Minecraft is the only gaming I do on my MacBook Pro, it's more comfortable to use it than the MX Vertical.

## Personal

This month my wife and I celebrated our 17th wedding anniversary, at home, with a three-course meal we prepared together. It was a very nice evening. We postponed our spa weekend trip for another year.

### Exercise and Fitness

Well, I've surprised myself - I'm still doing the couch to 5k program. I've just finished the 7th week, which means only 2 weeks to go till I'm running 5k. Eek. 😬

But I've not been doing any other exercise in between running - but I'm not going to beat myself up about it and push my body too much and then end up not being able to do any exercise at all.

Once I complete the c25k program, I probably won't be running three times a week (but you never know), so I may be able to start doing some other type of exercise - probably a regular HiiT session as I found this to be a good way to lose some weight and gain fitness in the past.

With the running, I'm doing alright I think, at least during the runs themselves - I've not had stitches or split shins. But I have been getting some pain just under my knees the day after the run - I'm putting this down to my legs not being used to running.

That's it for July. How was you month?

## Articles Read

* [CUBE CSS](https://cube.fyi/ "CUBE CSS")
* [The Thirteenth Fourth | CSS-Tricks](https://css-tricks.com/the-thirteenth-fourth/ "The Thirteenth Fourth | CSS-Tricks")
* [Control your asset optimization settings from netlify.toml | Netlify](https://www.netlify.com/blog/2019/08/05/control-your-asset-optimization-settings-from-netlify.toml/ "Control your asset optimization settings from netlify.toml | Netlify")
* [Three Tips for Building Profitable Side Projects](https://dev.to/csallen/three-tips-for-building-profitable-side-projects-3lmf "Three Tips for Building Profitable Side Projects")
* [CSS-Only Full-Width Responsive Images 2 Ways | Modern CSS Solutions](https://moderncss.dev/css-only-full-width-responsive-images-2-ways/ "CSS-Only Full-Width Responsive Images 2 Ways | Modern CSS Solutions")
* [Robin Rendle - Colorful Headings](https://www.robinrendle.com/notes/colorful-headings/ "Robin Rendle - Colorful Headings")
* [The trouble with mailto email links and what to do instead by Adam Silver](https://adamsilver.io/blog/the-trouble-with-mailto-email-links-and-what-to-do-instead/ "The trouble with mailto email links and what to do instead by Adam Silver")
* [Build your own analytics with Netlify Functions](https://oliverjam.es/blog/diy-analytics-netlify-functions/ "Build your own analytics with Netlify Functions")
* [Going offline with microformats](https://adactio.com/journal/15844 "Going offline with microformats")
* [Fixed Headers and Jump Links? The Solution is scroll-margin-top | CSS-Tricks](https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/ "Fixed Headers and Jump Links? The Solution is scroll-margin-top | CSS-Tricks")
* [How to Create the Ideal Homepage]https://thetaproom.com/blog/how-to-create-the-ideal-homepage-1 "How to Create the Ideal Homepage")
* [Git tip: committing with verbose mode](https://tekin.co.uk/2020/03/git-commit-verbose-mode "Git tip: committing with verbose mode")
* [Switching to Netlify DNS](https://darn.es/switching-to-netlify-dns/ "Switching to Netlify DNS")
* [Robin Rendle - A Problem of Trust](https://www.robinrendle.com/notes/a-problem-of-trust/ "Robin Rendle - A Problem of Trust")
* [Semantic versioning](https://gomakethings.com/semantic-versioning/ "Semantic versioning")
* [SVG Title vs. HTML Title Attribute | CSS-Tricks](https://css-tricks.com/svg-title-vs-html-title-attribute/ "SVG Title vs. HTML Title Attribute | CSS-Tricks")
* [We're all just fumbling our way through this](https://gomakethings.com/were-all-just-fumbling-our-way-through-this/ "We're all just fumbling our way through this")
* [A Modern CSS Reset - Andy Bell](https://piccalil.li/blog/a-modern-css-reset/ "A Modern CSS Reset - Andy Bell")
