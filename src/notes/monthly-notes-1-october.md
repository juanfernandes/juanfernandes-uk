---
layout: "post"
eleventyExcludeFromCollections: true
title: "Monthly Notes #1: October"
description: "I struggled to keep up with writing weekly notes since I cut my days at the
  office down to just three and they felt like they were the same thing every
  week and I didn't have much to write every week - so I am not trying a monthly
  note. We'll see how I get on with this schedule."
keywords:
  - month notes
  - october
  - freelance
  - contract front-end developer
  - new clients
  - new hosting clients
  - freelance
  - h. samuel
  - ernest jones
  - signet jewelers
  - private pension
  - sipp
  - lisa
  - aj bell
  - youinvest
  - pensions
date: 2019-11-02T19:53:06Z
tags:
  - monthly-notes
---
I struggled to keep up with writing weekly notes since I cut my days at the office down to just three, this meant I had less time to write and they also started to feel a bit repetitive every week and I didn't have much to write - so I am now trying monthly notes. We'll see how I get on with this schedule.{.lead}


## Work
October 31st was supposed to be my last day at Signet Jewelers but my contract was extended by another week, so I'll be the only contract front end developer left in the team, the other two finished on the 31st. I had already lined up some client work, so had to push that forward a bit.

The new Product List Pages (PLP) and Product Display Pages (PDP) for both brands (H. Samuel and Ernest Jones) went live at the end of October - this was a huge project that we had to get done in a very short amount of time, but we managed to get it out of the door in time.

We did have to make a few compromises here and there, not all the features that the designers created were implemented due to time constraints and complexities in the requirements.

Overall we achieved a lot and everyone is impressed with the new pages. I used a mixture of flexbox and CSS Grid layout throughout the H. Samuel product display page which led to bug fixing some IE and Edge layout issues caused by using CSS grid - but to be honest, nothing major. Mostly due to IE not being able to deal with auto-placement, so for IE we had to be more specific.

I loved using flexbox - first time using it a lot in one project - I couldn't understand why some of the other front end developers were still using floats!

Now that I have an extra week at Signet after this huge project, I've started refactoring some of the components to improve on a few things that were missed and also get rid of those floats in favour of flexbox.


## Freelance

### Work
Earlier in the month, I met with a new client. They have an existing website, but they need some changes. They are a children's nursery, with 2 locations and are about to open a third. We have identified some initial work to get the third location up and running.

I now need to do a project proposal for the main work - redesign the website to better incorporate multiple locations, give them a fresh new design and a CMS that is easier for them to edit and add new content to their website.

The plan for the initial work was for me to get admin access and create a new page for the new nursery, at the same time making the groundwork for the new website structure, but the client didn't have access to the admin side of the website, the previous web designer still had and was also still hosting the site for free on his server.

The client decided they would like to move the website and get it hosted properly. I got sent the website and database and I set up the new hosting account within my Guru reseller account, uploaded the website and re-created the database, changed the config to connect to the new database.

But the previous designer couldn't remember the administrator password, so after some research, I was able to delve into the database and change the password for the super administrator account. Next step is to get the domain name servers pointing to the new host. Then the work can begin.


### Business
I decided earlier in the year that I'd be switching business bank accounts. So this month I was able to move away from Santander to RBS. I didn't have any issues with Santander, they have been fine and would still recommend them - they were the only bank that allowed you to open a business bank account on the same day without visiting a branch back in 2015 when I set up my limited company.

But ever since then, I've used spreadsheets for my accounts and custom invoicing software - more recently I tried InvoiceNinja.com but it all still felt a bit all over the place. I've always wanted to use FreeAgent, but I wasn't happy paying all that money for something I had been able to do for free. (You do get a lot for your money, but I wouldn't be using all those features.)

Then I saw that you can get a free FreeAgent account if you open a Natwest or RBS business bank account so I decided to change business bank accounts to RBS. Not only do I get FreeAgent for free but I also save £2.50 a month on banking fees - yay!

This month was spent changing all my direct debits and changing my card details on a few websites, as well as switching to using FreeAgent to send invoices to clients and making sure they updated my new bank account on their records.

This month sees me getting two new clients, one of which will also be a new hosting client and am hosting a new website for an existing hosting client. Its been a while since I've taken on new hosting clients/websites.

Finally, spent some time researching into getting some sort of private pension setup. I haven't been paying into one since I started working for my self - apart from the state pension (which I don't expect it to amount to much).

Anyway, researching into setting up a private pension is a nightmare - unless you just want a traditional pension, that's easy - [PensionBee](https://www.pensionbee.com "PensionBee") looks great, but everything I read says you should set up a SIPP which is a Self-invested personal pension. So far the only decision I have made is that I am going to set up a [LISA (Lifetime ISA) with AJ Bell YouInvest](https://www.youinvest.co.uk/lifetime-isa "LISA (Lifetime ISA) with AJ Bell YouInvest").

Once I have decided and set it all up, I will write a blog post about it.

That's it for October - until next month. Enjoy the autumn weather.

## Reading
- [The CSS Mindset](https://mxb.dev/blog/the-css-mindset/ "The CSS Mindset")
- [Every developer builds a CMS!](https://hussein-alhammad.com/blog/2019/09/every-developer-builds-a-cms/ "Every developer builds a CMS!")
- [Cross the world four times - Derek Sivers](https://sive.rs/4 "Cross the world four times - Derek Sivers")
- [An Introduction to ARIA States - a11y with Lindsey](https://www.a11ywithlindsey.com/blog/introduction-aria-states/ "An Introduction to ARIA States - a11y with Lindsey")
- [Feeling Sassy Again](https://cloudfour.com/thinks/feeling-sassy-again/ "Feeling Sassy Again")
- [Daydreaming is my favorite pastime | Derek Sivers](https://sive.rs/daydream "Daydreaming is my favorite pastime | Derek Sivers")
- [The “P” in Progressive Enhancement stands for “Pragmatism” - Andy Bell](https://archive.hankchizljaw.com/wrote/the-p-in-progressive-enhancement-stands-for-pragmatism/ "The “P” in Progressive Enhancement stands for “Pragmatism” - Andy Bell")
- [The Hot Potato Process](http://danmall.me/articles/hot-potato-process/ "The Hot Potato Process")
- [Beyond automatic accessibility testing: 6 things I check on every website I build](https://www.matuzo.at/blog/beyond-automatic-accessibility-testing-6-things-i-check-on-every-website-i-build/ "Beyond automatic accessibility testing: 6 things I check on every website I build")
- [How to Invest in Index Funds for Beginners](https://www.nerdwallet.com/article/investing/how-to-invest-in-index-funds "How to Invest in Index Funds for Beginners")
- [Setting up a staging site with Netlify](https://www.tempertemper.net/blog/setting-up-a-staging-site-with-netlify.html "Setting up a staging site with Netlify")
- [Own Your Content on Social Media Using the IndieWeb—zachleat.com](https://www.zachleat.com/web/own-your-content/ "Own Your Content on Social Media Using the IndieWeb—zachleat.com")
- [Building Our Sass Architecture](https://css-irl.info/a-modern-front-end-workflow-part-3/ "Building Our Sass Architecture")
- [Building a Project Starter with NPM Scripts](https://css-irl.info/a-modern-front-end-workflow-part-1/ "Building a Project Starter with NPM Scripts")
- [Module Bundling with Parcel](https://css-irl.info/a-modern-front-end-workflow-part-2/ "Module Bundling with Parcel")
- [Pensions for the self-employed – PHP Developer](https://www.phpdeveloper.org.uk/pensions-for-the-self-employed/ "Pensions for the self-employed – PHP Developer")
- [Replacing jQuery With Vue.js: No Build Step Necessary — Smashing Magazine](https://www.smashingmagazine.com/2018/02/jquery-vue-javascript/ "Replacing jQuery With Vue.js: No Build Step Necessary — Smashing Magazine")
- [Auditing For Accessibility Problems With Firefox Developer Tools – Mozilla Hacks - the Web developer blog](https://hacks.mozilla.org/2019/10/auditing-for-accessibility-problems-with-firefox-developer-tools/ "Auditing For Accessibility Problems With Firefox Developer Tools – Mozilla Hacks - the Web developer blog")

