---
layout: "post"
eleventyExcludeFromCollections: true
title: "Weeknotes #22"
description: "This weeknotes has been in my drafts for a few weeks now. It only takes
  getting busy at work, for writing weeknotes to fall off the radar. I need to
  find a way of fitting this into my routine."
keywords:
  - static site generator
  - 11ty
  - eleventy
  - netlify
  - netlify cms
  - nunjucks
  - php
  - perch cms
  - site rebuild
date: 2019-08-29T06:12:57Z
---
This weeknotes has been in my drafts for a few weeks now. It only takes getting busy at work, for writing weeknotes to fall off the radar. I need to find a way of fitting this into my routine.{.lead}

## Updates

The new version of this website is live, it has been rebuilt using a static site generator, [Eleventy](https://www.11ty.dev/). It's the same design with minor tweaks, but this update was mainly about the underlying structure - moving away from PHP and PerchCMS to Nunjucks and [NetlifyCMS](https://decapcms.org/), as well as hosting it on [Netlify](https://www.netlify.com).

I had to manually copy over all my blog posts and notes as I couldn't figure out a way to export them from Perch. It wasn't too bad as I didn't have that many blog posts. The plan was to convert the RSS feed to static HTML and then use that as the start for the new static site pages - that's when I realised my RSS feed wasn't showing full page content, just the excerpt but I couldn't get the PHP template to output the full content in the end.

The last few weeks leading up to the release of the website I was doing a lot of minor fixes to get the site ready to go live - this meant I didn't have any spare time to write on my blog.

I had to figure out a few issues:

* Netlify redirects - figured out how to do redirects in the end
* Amp redirects - got rid of amp articles from my site - I only implemented this to figure out how to do them with Perch in case a customer asked for them
* Netlify form gotchas - added honeypot, but forgot to add the netlify specific data attribute to the `<form>` itself, also helps if the form action is called `action=` - for some reason I had it set to `path=`
* If you've added content to your site on Netlify, via NetlifyCMS before you added a custom domain, you won't be able to log into NetlifyCMS until you republish your website - see [https://community.netlify.com/t/netlifycms-on-custom-domain/2808/2?u=juanfernandes](https://community.netlify.com/t/netlifycms-on-custom-domain/2808/2?u=juanfernandes)
* Had some fun figuring out how to move my site to Netlify but keep email hosting with my host, Guru - got there in the end with some help from [Guru](https://my.guru.co.uk/aff.php?aff=6526
) support.

While I've been working on the rebuild of my website I have been following a proper git workflow, as in having issues in [Gitlab](https://about.gitlab.com/), creating a branch for that issue, working on it and then merging that to master - instead of working directly on master, as I have done in the past with personal projects.

Now that my site gets published automatically via GIT and Netlify, and the site is live, I'm changing my git workflow a bit to include a develop branch. I will take new feature branches from develop, then merge them back to develop.

Posting via NetlifyCMS builds my site from master which means it automatically deploys it, anything else, like code changes, will get merged into develop first, create a preview and then will get merged into master for the weekly releases.

## What's next?
I have a bunch of design issues in Gitlab that I will working my way through. Again, the design won't change much, but I want to remove my custom grid and start using CSS Grid Layout and also Flexbox to improve my layouts.

I really need to nail down a routine for creating more content on here, especially blog posts as I haven't published any for a while. I also want to get back to posting weekly notes.

## Reading
- [Reflecting on London’s first JAMstack conference](https://dev.to/philhawksworth/reflecting-on-london-s-first-jamstack-conference-13e9 "Reflecting on London’s first JAMstack conference")
- [The Encryption Debate Is Over - Dead At The Hands Of Facebook](https://www.forbes.com/sites/kalevleetaru/2019/07/26/the-encryption-debate-is-over-dead-at-the-hands-of-facebook/ "The Encryption Debate Is Over - Dead At The Hands Of Facebook")
- [Accessible Icon Buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/ "Accessible Icon Buttons")
- [My old clothes don’t fit - Derek Sivers](https://sive.rs/clothes "My old clothes don’t fit | Derek Sivers")
- [How to Use Sass Mixins](https://www.digitalocean.com/community/tutorials/how-to-use-sass-mixins "How to Use Sass Mixins")
- [Communication is everything - Dan Davies](https://www.dan-davies.co.uk/communication-is-everything "Communication is everything - Dan Davies")
- [Designing a portfolio with intent](https://andrewcouldwell.medium.com/designing-a-portfolio-with-intent-e5a74de9722 "Designing a portfolio with intent")
- [Amphora — Ethan Marcotte](https://ethanmarcotte.com/wrote/amphora/ "Amphora — Ethan Marcotte")
- [Prioritizing | CSS-Tricks](https://css-tricks.com/prioritizing/ "Prioritizing | CSS-Tricks")
- [Adobe Alternatives](http://brendandawes.com/blog/adobe-alterntives "Adobe Alternatives")
- [Minify Your SVGs - Victor Zhou](https://victorzhou.com/blog/minify-svgs/ "Minify Your SVGs - Victor Zhou")
- [Weeknotes #8](https://daverupert.com/2019/08/weeknotes-8/ "Weeknotes #8")
- [Improving your Git workflow](https://dev.to/christopherkade/improving-your-git-workflow-176j "Improving your Git workflow")
- [Make the Most of your Browser’s Address Bar](https://thoughtbot.com/blog/make-the-most-of-your-browser-s-address-bar "Make the Most of your Browser’s Address Bar")
- [Scheduled and draft 11ty posts](https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts "Scheduled and draft 11ty posts")
- [Sticks and Ropes.](https://daverupert.com/2019/08/sticks-and-ropes/ "Sticks and Ropes.")
- [The Week(s): 26th August 2019 - Ross Wintle](https://rosswintle.uk/2019/08/the-weeks-26th-august-2019/ "The Week(s): 26th August 2019 - Ross Wintle")
