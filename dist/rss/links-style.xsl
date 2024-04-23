<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/>Links - Juan Fernandes - Freelance Web Designer</title>
        <link rel="stylesheet" href="/assets/css/global.min.css"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      </head>
      <body>
        <main class="container">
          <div class="content content--slim">
            <header>
              <h1>
                <svg class="u-mr-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f89820" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1 0-2zm0 4a6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1 0-2zm.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
                <span>RSS Links Preview - <small>juanfernandes.uk</small></span>
              </h1>
              <p class="lead">Sharing links to articles I&#39;ve read</p>
              <a class="u-inline-block u-mb-2" href="https://www.juanfernandes.uk/links/">Visit Website →</a>
            </header>
            <div class="alert alert--info u-mb-2">
              <p><strong>This is an RSS feed</strong>. Subscribe by copying the URL from the address bar into your newsreader. Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more and get started. It’s free.</p>
            </div>

            <h2>Recent links</h2>
            <p class="u-block"><small>Updated: <time class="dt-published" datetime="2024-04-23T12:04:03Z">2024-04-23T12:04:03Z</time></small></p>

            <ul class="list-bordered"><li>
              <a class="delta u-inline-block u-mb-1" href="https://stephaniewalter.design/blog/a-cheatsheet-for-user-interview-and-follow-ups-questions/">A Cheatsheet for User Interview and Follow Ups Questions</a>
              <p class="u-mb-0">When I prepare user interviews (or usability tests), I end up coming back to the same resources again. I decided to put them all in one single place. If you…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.stefanjudis.com/today-i-learned/image-video-news-sitemaps/">Index images, videos and news with specialized sitemaps</a>
              <p class="u-mb-0">If you take the time to create content online, you probably want people to read it. It doesn&#39;t have to go viral, but it&#39;d be nice if some folks read it, right?…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://flamedfury.com/posts/blogging-anonymously/">Blogging Anonymously</a>
              <p class="u-mb-0">While surfing the web this weekend, I saw a curious question from Kev Quirk on Mastodon, attached to a blog post: What About…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://darn.es/link-peek-web-component/">link-peek Web Component</a>
              <p class="u-mb-0"> The link-peek Web Component allows you to turn a regular anchor link to a rich preview (also known as an &#39;unfurled&#39; link) to show description, meta image,…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://buttondown.email/ownyourweb/archive/issue-13/">Own Your Web – Issue 13: Now</a>
              <p class="u-mb-0">There are many pages you can add to your personal site that people can visit if they want to learn more about you. A “contact” page or an “about” page…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://blog.jim-nielsen.com/2024/faster-bandwidth-and-websites/">Faster Connectivity !== Faster Websites</a>
              <p class="u-mb-0">This post from Dan Luu discussing how web bloat impacts users with slow devices caused me to reflect on the supposition that faster connectivity means faster…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.stefanjudis.com/today-i-learned/how-to-use-language-dependent-quotes-in-css/">How to display language-specific quotes in CSS</a>
              <p class="u-mb-0">Will Boyd&#39;s excellent article Diving into the ::before and ::after Pseudo-Elements includes nifty details about CSS quotes. Let&#39;s say you&#39;re dealing with a…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://coryd.dev/posts/2024/enhancing-pagination-with-a-page-selector/">Enhancing pagination with a page selector</a>
              <p class="u-mb-0">I’ve made a change to my site’s pagination wherein I’ve enhanced the page count displayed at the bottom of my home and links pages to display the page count in…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://jamesg.blog/2024/03/04/incremental-website-improvements-joy/">The joy of incremental website improvements</a>
              <p class="u-mb-0">Back in the pandemic, as my personal website started to become a comfort in difficult times, I often asked myself: what can I do with my website this weekend? I…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://ethanmarcotte.com/wrote/blockin-bots/">Blockin’ bots</a>
              <p class="u-mb-0">I’ve been blocking various “artificial intelligence” (“AI”) bots on my site. Why, you ask? Well, I don’t like the idea of my work being hoovered up to train…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://tylersticka.com/journal/git-fresh/">Git Fresh</a>
              <p class="u-mb-0">I don’t know if this is a personal quirk or a side effect of my role (designer first, developer second), but my Git branchs…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adamsilver.io/blog/figma-prototypes-vs-html-prototypes/">Figma prototypes vs HTML prototypes</a>
              <p class="u-mb-0">When you design a product, you should usability test it. Otherwise, you won’t know how well it works. Typically you either: create and test a…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://jamesg.blog/2024/04/08/wander/">My wander page</a>
              <p class="u-mb-0">One of my favourite pastimes is clicking around the blogosphere, exploring and reading personal websites. I especially love encountering blogrolls or link…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/web-dev-craftsmanship/">Web dev craftsmanship</a>
              <p class="u-mb-0">I’m coming to realize that a lot of my dissatisfaction with the state of the web is that I view web development as a craft, but as a profession we’re in the…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://blog.jim-nielsen.com/2023/embeds-and-quotations/">Embeds and Quotations in Writing</a>
              <p class="u-mb-0">Chris wrote “0 KB Social Media Embeds” and it got me thinking about my own approach to embeds and quotations in my writing. A lot of my blogging is quoting…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://macarthur.me/posts/more-aggressive-cache-headers/">Your Cache Headers Could Probably be More Aggressive</a>
              <p class="u-mb-0">We&#39;ve got it real good when it comes to standing up websites these days (especially static ones). Modern hosts like Vercel and Netlify take care of a lot out of…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.figma.com/blog/5-things-designers-need-to-know-for-a-smooth-handoff/">5 Things Designers Need to Know for a Smooth Handoff</a>
              <p class="u-mb-0">There’s no truth teller quite like Google autocomplete. As you type “Design development handoff is…” into the search bar, it quickly fills in the blank with…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/an-advanced-way-to-use-css-variables/">An advanced way to use CSS variables</a>
              <p class="u-mb-0">Yesterday, we learned about CSS variables. Today, I wanted to show you an advanced approach to working with them that I often use with client projects. Let’s…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.nicchan.me/blog/have-we-forgotten-how-to-build-ethical-things-for-the-web/">Have we forgotten how to build ethical things for the web?</a>
              <p class="u-mb-0">I&#39;ve worked on a few projects where values and ethics were a key part of the clients&#39; mission. They weren&#39;t putting profits over everything, they were trying to…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/css-variables/">CSS variables</a>
              <p class="u-mb-0">Yesterday, I mentioned that I love CSS variables. Today, I thought I’d explain what they are and how they work, for those who aren’t already familiar with them…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/best-practices-for-writing-css-and-javascript-with-a-team/">Best practices for writing CSS and JavaScript with a team</a>
              <p class="u-mb-0">Yesterday, I wrote about the importance of understanding the medium that we work in. Today, I wanted to share my best practices for writing code with a team.…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://ellyloel.com/blog/front-end-development-s-identity-crisis/">Front-end development’s identity crisis</a>
              <p class="u-mb-0">I’m not a “[full-stack] developer”, regardless of what my last job title says. I’m not even a front-end developer, thanks to the JavaScript–industrial complex.…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://rknight.me/blog/using-eleventy-to-gobble-up-everything-i-do-online/">Using Eleventy to Gobble Up Everything I Do Online</a>
              <p class="u-mb-0">This post is adapted from the talk I did at the Eleventy Meetup. You can also watch the talk on YouTube. This is what I look like when I try to…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.stefanjudis.com/notes/disabled-vs-aria-disabled-on-form-elements/">disabled vs aria-disabled on form elements</a>
              <p class="u-mb-0">I&#39;ll definitely reference the following blog post in the future. Kitty Giraudel describes when to use disabled and aria-disabled. Ready? Because here comes some…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.amitmerchant.com/dynamic-progress-bars-using-css/">Building Dynamic Progress Bars using only CSS</a>
              <p class="u-mb-0">Here’s a full disclaimer upfront: This isn’t something I’ve come up with. Jeffery Way from Laracasts has come up with this technique in one of the videos and…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/how-would-you-build-a-complex-app-with-vanilla-tech/">How would you build a complex app with vanilla tech?</a>
              <p class="u-mb-0">The other day on Mastodon, Hawk Ticehurst asked… If you were asked to build a “proper complex” web application (let’s say a full featured mastodon client or…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://web.dev/articles/light-dark">CSS color-scheme-dependent colors with light-dark()</a>
              <p class="u-mb-0">System colors have the ability to react to the current used color-scheme value. The light-dark() function exposes the same capability to authors. Bramus System…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://lewisdale.dev/post/using-gitea-github-actions-for-triggering-echo/">Using Gitea/Github actions for triggering Echo</a>
              <p class="u-mb-0">I decided to start using Robb Knight’s Echo tool, to syndicate my blog posts to Mastodon, and trigger Webmentions. I’m not going to go through the configuration…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.nngroup.com/articles/discovery-phase/">The Discovery Phase in UX Projects</a>
              <p class="u-mb-0">In This Article: Introduction Discovery: A preliminary phase in the UX-design process that involves researching the problem space, framing the problem(s) to be…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.alexhyett.com/newsletter/the-indie-web-is-the-new-and-the-old-web/">The IndieWeb is the new and the old web</a>
              <p class="u-mb-0"> When I first started developing websites back in 2000 the internet was a much simpler place. Google existed, but most people still used Yahoo or Ask Jeeves to…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://buttondown.email/ownyourweb/archive/issue-12/">Own Your Web – Issue 12: Finding Your Rhythm</a>
              <p class="u-mb-0">t is one of the most common reasons why we abandon our personal sites and blogs: at some point, we stop publishing. But why? Weren’t we so…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://css-irl.info/subgrid-is-here/">Subgrid is here</a>
              <p class="u-mb-0">Support for subgrid (part of the CSS Grid Level 2 specification has just landed in Firefox Nightly! To start experimenting with it you’ll need to enable the…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://cloudfour.com/thinks/when-to-nest-css/">When to Nest CSS</a>
              <p class="u-mb-0">With the recent news that CSS nesting is now available in the major evergreen browsers , our team was discussing how it differs from nesting in Sass , and the…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/better-type-layouts-with-css/">Better type layouts with CSS</a>
              <p class="u-mb-0">I wanted to quickly share two newer CSS properties that make it easier to create nice, well-balanced layouts. The text-wrap property has two newish…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://rosswintle.uk/2024/03/readable-code-tips-intro/">Readable code tips: Introduction</a>
              <p class="u-mb-0">There’s lots about code that slows us down I’ve been doing a lot of code reviews recently. And while most of the code I review works (by which I mean: meets the…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://coryd.dev/posts/2024/lightweight-search-in-eleventy/">Lightweight search in Eleventy</a>
              <p class="u-mb-0">I&#39;ve been using Pagefind for my site search for a while now and would readily recommend it, but I wanted to throw together something a bit lighter weight and…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://css-irl.info/time-to-ditch-analytics/">Time to Ditch Analytics? Tracking Scripts and Web Sustainability</a>
              <p class="u-mb-0">This article on privacy-focussed web design by Paul Jardine and Becky Thorn of sustainably-minded web design agency Root raises some great points about the link…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://daught.me/blog/2024/indie-web/">The &#39;IndieWeb&#39; feels like coming home</a>
              <p class="u-mb-0">The &#39;IndieWeb&#39; feels like coming home tech personal Eleventy IndieWeb featured Due to the convenience of not needing to code or maintain anything…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://matthiasott.com/notes/welcome-to-the-indieweb">Welcome to the IndieWeb</a>
              <p class="u-mb-0">Imagine you post and make new friends on an online network for more than a decade – and suddenly, your account gets suspended for no apparent reason. And there…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://rknight.me/blog/eleventy-post-dates/">We Need to Talk About Your Eleventy Post Dates</a>
              <p class="u-mb-0">Since I really got back into following RSS feeds in the past couple of years I&#39;ve noticed a problem with Eleventy sites[1] and post…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://frontendmasters.com/blog/you-want-border-color-transparent-not-border-none/">You Want border-color: transparent, Not border: none</a>
              <p class="u-mb-0">If you find yourself removing a border from an element that has a border and are tempted to use border: 0 , border: none, or outline: none, I’d urge you to stop…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://declanbyrd.co.uk/journal/2024/how-i-eleventy/">How I Eleventy</a>
              <p class="u-mb-0">I first starting using Eleventy to build this site back in 2020 using version 0.10.0 and through a combination of the official documentation and other people&#39;s…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://another.rodeo/linkroll/">11ty Linkrolls</a>
              <p class="u-mb-0">Gotta get yourself connected... One of the things I&#39;ve always loved about blogs were the linkrolls... that candy trail to more and more interesting things…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://rknight.me/blog/fetching-package-dependents-from-github/">Fetching Package Dependents from GitHub</a>
              <p class="u-mb-0">A conversation in the Eleventy Discord led me to remember about the dependents page of a GitHub repository. That is, a list of…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://ohhelloana.blog/just-get-a-website/">You don&#39;t have to be a “content creator” to have a website.</a>
              <p class="u-mb-0">This is clearly the result of living in a capitalist society. In recent years, people have felt the pressure to monetise their hobbies, so there’s a constant…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://minutestomidnight.co.uk/blog/leaving-netlify/">Leaving Netlify</a>
              <p class="u-mb-0">Leaving Netlify Tomorrow marks the first week after migrating all the websites I share with my wife Silvia, from Netlify to Mythic Beasts. Very happy about the…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://coryd.dev/posts/2024/surfacing-most-used-tags-in-eleventy/">Surfacing most used tags in Eleventy</a>
              <p class="u-mb-0">I made some lightweight design changes to my site, keeping things simple but moving the date up above post headers, surfacing tags below and restoring Read more…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://dbushell.com/2024/03/10/css-button-styles-you-might-not-know/">CSS Button Styles You Might Not Know</a>
              <p class="u-mb-0">CSS Button Styles You Might Not Know Sunday 10 Mar 2024 Buttons are everywhere! We can use all sorts of fancy CSS to style a button. I prefer using Flexbox…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://blog.jim-nielsen.com/2024/following-links/">Following Links</a>
              <p class="u-mb-0">I loved this post from Chris Enns (via Robb Knight) where he outlines the rabbit hole of links he ventured down in writing that post. It felt fun and familiar…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://buttondown.email/ownyourweb/archive/issue-11/">Own Your Web – Issue 11: Welcome to the IndieWeb</a>
              <p class="u-mb-0">Hi All! 🤗 Imagine you post and make new friends on an online network for more than a decade – and suddenly, your account gets suspended for no apparent reason…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://coryd.dev/posts/2024/sharing-links-via-rss-sharing-links-via-apis/">Sharing links via RSS, sharing links via APIs</a>
              <p class="u-mb-0">I follow and subscribe to a whole bunch of blogs and less and less high-volume news via RSS. It&#39;s one of my absolute favorite mediums for keeping up with and…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://coryd.dev/posts/2024/using-an-eleventy-event-to-optimize-component-javascript/">Using an Eleventy event to optimize component JavaScript</a>
              <p class="u-mb-0">My site leverages a number of web component for functionality on my site. Namely: mastodon post embeds, search, my now playing component, my theme toggle, post…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adamsilver.io/blog/dont-use-paracetamol-to-fix-bad-ux/">Don’t use paracetamol to fix bad UX</a>
              <p class="u-mb-0">My dad was a pharmacist. Whenever I was ill, he’d tell me to take paracetamol. So I did. And it made me feel better. But paracetamol doesn’t…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://piccalil.li/blog/some-little-ways-im-using-css-has-in-the-real-world/">Some little ways I’m using CSS :has() in the real world</a>
              <p class="u-mb-0">There’s a lot of chatter around the new(ish) :has() pseudo-class. It’s something we’ve been crying out for, for years: being able to select parent elements! A…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://performance.shopify.com/blogs/blog/how-layout-position-impacts-three-big-web-performance-levers">How layout position impacts three big web performance levers</a>
              <p class="u-mb-0">We help Shopify merchants improve their web performance and see three common problems related to layout position: Lazy loading images above the fold…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.philiprenich.com/blog/adding-search-to-an-eleventy-site-without-client-side-javascript/">Adding Search to an Eleventy Site Without Client-side JavaScript</a>
              <p class="u-mb-0">Adding Search to an Eleventy Site Without Client-side JavaScript October 9th, 2023 Earlier this year (2023) I added a search feature to my blog. I’ve always…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adrianroselli.com/2023/08/progressively-enhanced-html-accordion.html">Progressively Enhanced HTML Accordion</a>
              <p class="u-mb-0">Does what it says on the tin. Uses &lt;details&gt; and &lt;summary&gt; with a bit of ARIA to create an accordion that works without JavaScript while…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://set.studio/simplify-sharing-with-built-in-apis-and-progressive-enhancement/">Simplify sharing with built-in APIs and progressive enhancement</a>
              <p class="u-mb-0">You’ve written a great post or produced a delightful website and now you want people to share it. In times gone by, you might be tempted to add a section like…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adamsilver.io/blog/sliders-degrade-ux-so-do-this-instead/">Sliders degrade UX (so do this instead)</a>
              <p class="u-mb-0">18 February 2024 My friend Victor shared this design tip on Twitter last week: He said that if you put the slider values on top, your finger won’t cover them…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://localghost.dev/blog/automated-weekly-links-posts-with-raindrop-io-and-eleventy/">Automated weekly links posts with raindrop.io and Eleventy</a>
              <p class="u-mb-0">A post that&#39;s been getting a lot of traction recently is I miss human curation by Cassidy Williams, in which she laments that we&#39;re so reliant on algorithms…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://jonas.brusman.se/deploy-eleventy-to-cloudflare-with-githubs-action-cache/">Deploy an Eleventy site to Cloudflare Pages efficiently with GitHub&#39;s action cache</a>
              <p class="u-mb-0">I have wanted to move this site from Netlify for a while now, but the recent news about their bandwidth pricing made me finally do it. I looked into some…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/which-css-framework-should-i-use/">Which CSS framework should I use?</a>
              <p class="u-mb-0">I’ve been ragging on Tailwind a lot lately (because it’s terrible). One of the natural follow-up questions I get is… Which CSS framework do you like? I tend to…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://hidde.blog/ai-for-accessible-components/">AI and accessible front-end components: is the nuance generatable?</a>
              <p class="u-mb-0">Companies are rushing to add generated AI capabilities to their products. Some promise to produce front-end components for you. Is that even possible, given the…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://piccalil.li/blog/the-path-to-becoming-a-publisher/">The path to becoming a publisher - Piccalilli</a>
              <p class="u-mb-0">In my 2023 wrap-up post I said the following: I also see a gap in publications. CSS-Tricks is done now, and unfortunately, been abandoned. A List Apart has…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://frontendmasters.com/blog/capo-js-a-five-minute-web-performance-boost/">Capo.js: A five minute web performance boost</a>
              <p class="u-mb-0">You want a quick web performance win at work that’s sure to get you a promotion? Want it to only take five minutes? Then I got you. Capo.js is a tool to get…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/how-to-create-a-responsive-grid-system-with-css-grid/">How to create a responsive grid system with CSS Grid</a>
              <p class="u-mb-0">I recently updated the grid system on my site from Flexbox to CSS Grid. Today, I wanted to share how to use it, how it works under-the-hood, and why I made the…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/tailwind-vs.-semantic-css/">Tailwind vs. Semantic CSS</a>
              <p class="u-mb-0">Over the last week or two, I’ve written about why Tailwind is bad. Yesterday, I stumbled upon this article from Tero Piirainen comparing semantic CSS to…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://coryd.dev/posts/2024/nows-the-time-to-own-and-host-your-own-content/">Now&#39;s the time to own and host your own content</a>
              <p class="u-mb-0">We&#39;ve seen Meta, Google, Microsoft, Apple, Reddit, Automattic, Mozilla — name a company — integrate AI that continues to be trained on public data with or…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://chriscoyier.net/2024/02/28/where-im-at-on-the-whole-css-tricks-thing/">Where I’m at on the whole CSS-Tricks thing</a>
              <p class="u-mb-0">It was March 2022 when I sold CSS-Tricks to DigitalOcean. So it’s been just about 2 years now. This was me and my wife’s thinking: The negotiated sale price was…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://piccalil.li/blog/piccalilli-links/">Piccalilli Links</a>
              <p class="u-mb-0">You might have noticed that I’m starting to share links on here. There’s a hole that’s been left by publications like CSS-Tricks and A List Apart going quiet…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://buttondown.email/ownyourweb/archive/issue-10/">Own Your Web – Issue 10: Links Worth Sharing</a>
              <p class="u-mb-0">Hi All! 🤗 Every day, we browse the Web and scroll our timelines. And every day, we find even more interesting websites, blog posts, articles, videos, podcasts…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://jamesg.blog/2024/02/19/personal-website-ideas/">100 things you can do on your personal website</a>
              <p class="u-mb-0">One of my favourite things to do in my free time is to tinker with this website. Indeed, this website is the culmination of years of tinkering. I have added…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://rknight.me/blog/more-things-you-can-do-on-your-website/">More Things You Can Do on Your Website</a>
              <p class="u-mb-0">James wrote a great post with 100 83 ideas for things to do on a website [1] with a call for people suggest more so here&#39;s another… </p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/dont-disable-buttons/">Don&#39;t disable buttons</a>
              <p class="u-mb-0">One of the most common accessibility issues I find (and fix) on client projects is dynamically disabled form buttons when a form is being submitted. Today I…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://robinrendle.com/notes/cut-the-intro/">Cut the Intro</a>
              <p class="u-mb-0">Here’s one way to improve the thing you’re writing: cut the intro. Writing about the symbiosis between trees and mushrooms? Don’t start talking about how…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://coryd.dev/posts/2024/automatic-mastodon-post-embeds/">Automatic Mastodon post embeds</a>
              <p class="u-mb-0">I use Nicolas Hoizey&#39;s GitHub action to syndicate my web activity to Mastodon. Recently, I removed the display of webmentions from my posts after seeing Chris…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/tailwind-is-bad/">Tailwind is bad</a>
              <p class="u-mb-0">Yes, this is a clickbait title, but it’s also (mostly) true. If you’re not familiar with Tailwind (bless your heart), it’s a “utility-first CSS framework.” I’ve…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adactio.com/journal/20564">Decision time</a>
              <p class="u-mb-0"> I’ve always associated good design with thoughtfulness. Like, I should be able to point to any element in an interface and the designer should be able to tell…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.benjystanton.co.uk/blog/why-markdown-is-a-great-design-tool/">Why Markdown is a great design tool</a>
              <p class="u-mb-0">Markdown is an incredibly flexible tool that’s part of my daily working practice. Almost everything I write digitally (including this post) starts in Markdown…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://minutestomidnight.co.uk/blog/read-later/">Read later</a>
              <p class="u-mb-0">My latest post generated a few emails from people suggesting alternatives to my semi-manual Instapaper solution. The back-and-forth convinced me to…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://darn.es/mastodon-post-web-component/">mastodon-post Web Component</a>
              <p class="u-mb-0">The mastodon-post Web Component allows you to turn a regular link to a Mastodon post into an embeddable post quote including metadata such as reply count, boost…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/static-site-generators-and-cmss/">Static Site Generators and CMS&#39;s</a>
              <p class="u-mb-0">I write a lot about my love of Static Site Generators. They’re fast. Easier to theme. Easier to maintain. Less prone to vulnerabilities. More portable. But they…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://antfu.me/posts/animated-svg-logo">Animated SVG Logo</a>
              <p class="u-mb-0">I recently replaced the logo on the top left corner with an animated SVG: Inspiration The first time I saw such stroke animations in SVG is the Material Line…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://blog.pope.tech/2024/01/02/how-to-make-external-links-accessible/">How to make external links accessible</a>
              <p class="u-mb-0">Links are what connect online content – they’re everywhere. Since they’re so common, their design and functionality often go unnoticed, especially when it comes…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adrianroselli.com/2024/02/dont-disable-form-controls.html">Don’t Disable Form Controls</a>
              <p class="u-mb-0">Just another usability and accessibility pro telling authors not to do the thing they continue to do. It’s Ok to Disable Buttons There are…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://css-irl.info/new-and-improved-green-web-hosting-directory/">New and Improved Green Web Hosting Directory from the Green Web Foundation</a>
              <p class="u-mb-0">The Green Web Foundation has recently redesigned their green web hosting directory. Previously the directory was a useful resource for finding hosting platforms…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/lets-create-a-web-component-from-scratch/">Let&#39;s create a Web Component from scratch!</a>
              <p class="u-mb-0">Because I love Web Components so much, today, I thought we’d build an HTML Web Component from scratch. Let’s build a component that shows and hides text when a…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://css-irl.info/eleventy-starter-projects-updates/">Eleventy Starter Project Updates</a>
              <p class="u-mb-0">This blog uses static site generator Eleventy (or 11ty. I have no idea which one is the “official” spelling, and the docs appear to delight in switching…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://dbushell.com/2024/02/14/super-fast-builds/">Super Fast Builds</a>
              <p class="u-mb-0">I want to see more developers experiment with how they build their websites! Don’t just npm install a blackhole. Roll your own personal solution. It’s fun and…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://buttondown.email/ownyourweb/archive/issue-09/">Own Your Web – Issue 9: We ❤️ RSS</a>
              <p class="u-mb-0">In the last issue, we looked at blogrolls as one way to improve the visibility and discoverability of our sites. Whether or not you want to add a…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://blog.stephaniestimac.com/posts/2023/10/css-text-wrap/">When to use CSS text-wrap: balance; vs text-wrap: pretty</a>
              <p class="u-mb-0">When to use CSS text-wrap: balance; vs text-wrap: pretty; At the start of the year I had written about how I wanted to spend this year writing about new CSS…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://sebastiandedeyne.com/pull-request-descriptions">Pull request descriptions</a>
              <p class="u-mb-0">I used to leave pull request descriptions empty. &quot;Let the code speak for itself&quot; or &quot;let the commits speak for themselves&quot; are…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/the-indie-web-and-the-joy-of-being-weird/">The Indie Web and the joy of being weird</a>
              <p class="u-mb-0">GoMakeThings.com has been my home on the web for over 12 years. When I first started publishing here, I had an HR blog (I was an HR professional at the time)…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://benfrain.com/how-to-create-rounded-gradient-borders-with-any-background-in-css/">How to create rounded gradient borders with any background in CSS A solution!</a>
              <p class="u-mb-0">For many months I have been trying to find a decent solution to rounded gradient borders that allow a semi-transparent or blurred main background.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html">Blockquotes in Screen Readers</a>
              <p class="u-mb-0">This post does not assert the correct way to code blockquotes, it will only demonstrate how screen readers announce some existing…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://chriscoyier.net/2024/02/05/thoughts-on-a-global-design-system/">Thoughts on a Global Design System</a>
              <p class="u-mb-0">Dave and I just had Brad on ShopTalk Show to talk about his idea for a Global Design System . I love Brad’s optimism on all this. From Brad’s perspective, he’s…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://dbushell.com/2024/02/06/rss-feed-styles/">RSS Feed Styles</a>
              <p class="u-mb-0">Now that I’m in my 15th year of blogging it’s past time I spruced up my RSS feed . I’ve also launched a new…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://jvns.ca/blog/2024/01/26/inside-git/">Inside .git</a>
              <p class="u-mb-0">I posted a comic on Mastodon this week about what’s in the .git directory and someone requested a text version, so here it is. I added someextra notes…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.matuzo.at/blog/2023/css-css-css">CSS! CSS! CSS! - Manuel Matuzovic CSS! CSS! CSS!</a>
              <p class="u-mb-0">I just came home after three beautiful days in Amsterdam, where I gave a talk at the CSS Day conference. I’ve watched many…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://karlgroves.com/4-ways-to-improve-mobile-accessibility/">4 Ways to Improve Mobile Accessibility</a>
              <p class="u-mb-0">This is a repost of an old article on the Tenon blog. Since that’s being sunsetted, I’m reposting it below. Ensuring that your website is ADA compliant on…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.smashingmagazine.com/2023/06/perfect-design-process/">What’s The Perfect Design Process?</a>
              <p class="u-mb-0">The design process is messy. You might be following a structured approach, but too often, it takes a life of its own. And before you know it, you are designing in chaos, with…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adamsilver.io/blog/3-questions-to-evaluate-design-patterns-and-avoid-unnecessary-work-that-degrades-ux/">3 questions to evaluate design patterns and avoid unnecessary work that degrades UX</a>
              <p class="u-mb-0">There’s a new form design trend going around: Buttons inside inputs. Anthony Hobday mentioned it by asking his audience if there was any…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.zachleat.com/web/11tyconf/">Join the 11ty International Symposium on Making Web Sites Real Good</a>
              <p class="u-mb-0">Join the 11ty International Symposium on Making Web Sites Real Good (it’s an 11ty Conference) In May 2024…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/ditch-the-developer-swiss-army-knife/">Ditch the developer Swiss Army Knife</a>
              <p class="u-mb-0">Our industry loves Swiss Army Knives. The tools we tend to gravitate towards are ones that do all the things . They’re packed with features. I get the appeal…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.matuzo.at/blog/2023/article-screen-readers/">The article element and screen readers</a>
              <p class="u-mb-0">I wanted to know how and if common screen readers expose the &amp;lt;article&amp;gt; element. Here are my results…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://sebastiandedeyne.com/more-than-blogrolls/">More than blogrolls</a>
              <p class="u-mb-0">The latest edition of Matthias Ott&#39;s Own Your Web (which I recommend subscribing too!) points out that there are a lot of blogs…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.matuzo.at/blog/2023/details-find-in-page">The details element and in-page search - Manuel Matuzovic</a>
              <p class="u-mb-0">An important factor in terms of UX and accessibility for deciding whether the &amp;lt;details&amp;gt; element is…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://rachsmith.com/i-turned-off-analytics/">I turned off analytics</a>
              <p class="u-mb-0">I turned off the Plausible analytics for this site. I used to use analytics mostly to look for links back to my site from other creators. When I had so little…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://snook.ca/archives/opinion/no-analytics">No Analytics</a>
              <p class="u-mb-0">It was nice to see Rach talk about stripping out analytics . I stripped out my analytics years ago and while I thought I wrote about it, I can’t find where I…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://codersblock.com/blog/nicer-text-wrapping-with-css-text-wrap/">Nicer Text Wrapping with CSS text-wrap</a>
              <p class="u-mb-0">Let’s take a look at the CSS text-wrap property and how we can use it to improve the way text flows on a web page. We can use text-wrap: balance to tell the…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://chriscoyier.net/2024/01/24/what-happened-with-the-web-monetization-api/">What happened with the Web Monetization API?</a>
              <p class="u-mb-0">I was pretty hot on it for a minute . I wanted it to succeed and thought it had the bones to make it. Coil was the main startup trying to push it. They did the…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://css-irl.info/reducing-complexity-in-front-end-development/">Reducing Complexity in Front End Development</a>
              <p class="u-mb-0">One of my favourite sessions at All Day Hey conference last month was Jack Franklin’s talk Abstractions, complexities and off-ramps. As web applications grow larger, they inevitably fall prey to complexity, despite our best intentions.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://hidde.blog/positioning-anchored-popovers/">Positioning anchored popovers</a>
              <p class="u-mb-0">Popovers are in the top layer, how can we position them relative to invokers that are not?</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.bram.us/2023/08/22/a-quick-introduction-to-css-scope">A quick introduction to CSS @scope</a>
              <p class="u-mb-0">An introductory thread to CSS @scope.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adamsilver.io/blog/5-key-design-system-elements-to-build-trust-and-maximise-uptake/">5 key design system elements to build trust and maximise uptake</a>
              <p class="u-mb-0">Since 2016 I’ve used, created and contributed to multiple design systems. I’ve seen what works and what doesn’t. By “doesn’t” I mean designers don’t trust it. And as a result they don’t use it</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/progressively-enhancing-a-link-into-a-button-with-vanilla-javascript/">Progressively enhancing a link into a button with vanilla JavaScript</a>
              <p class="u-mb-0">In yesterday&amp;rsquo;s article on loading HTML from another page, I talked about progressively enhancing a link into a button. Let’s imagine you have a dialog modal that loads some HTML. You might keep all that HTML in a separate file, and by default display a link to it. &amp;lt;a href=&amp;#34;/terms&amp;#34;&amp;gt;Read the Terms of Service&amp;lt;/a&amp;gt;  When your JS loads, you can progressively enhance it into a modal toggle.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://blog.stephaniestimac.com/posts/2024/01/css-field-sizing/">Better form UX with the CSS property `field-sizing` - Stephanie Stimac&#39;s Blog</a>
              <p class="u-mb-0">A look at the `field-sizing` CSS property and how it could improve web form user experience.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://moderncss.dev/12-modern-css-one-line-upgrades/">12 Modern CSS One-Line Upgrades - Modern CSS Solutions</a>
              <p class="u-mb-0">Sometimes, improving your application CSS just takes a one-line upgrade or enhancement! Learn about 12 properties to start incorporating into your projects, and enjoy reducing technical debt, removing JavaScript, and scoring easy wins for user experience.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.nicchan.me/blog/bulletproofing-your-cms/">Bulletproofing your CMS</a>
              <p class="u-mb-0">Help your future self by making sure your CMS can take anything clients throw at it.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://calibreapp.com/blog/time-to-first-byte">Time to First Byte: What it is and How to Make Improvements</a>
              <p class="u-mb-0">TTFB is the backbone of page speed: it can make or break the experience of your sites. Learn how to test and  track it.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://karlgroves.com/6-quick-tests-you-can-do-to-test-your-forms-for-accessibility/">6 Quick tests you can do to test your forms for accessibility</a>
              <p class="u-mb-0">Whenever I do a full audit for a website, I have almost 40 individual, highly granular, form-related checks. Those checks can be boiled down to the following 6 high level goals.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.bram.us/2023/06/15/scroll-triggered-animations/">Creating Scroll-Triggered Animations by combining Scroll-Driven Animations, Custom Properties, Style Queries, and Transitions</a>
              <p class="u-mb-0">When you combine Scroll-Driven Animations with Custom Properties, Style Queries, and Transitions you hack your way into creating Scroll-Triggered Animations.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://martinschneider.me/articles/fetching-webmentions-with-netlify-and-eleventy-edge/">Fetching Webmentions With Netlify and Eleventy Edge</a>
              <p class="u-mb-0">Sadly, I&amp;#39;m not too good at documenting what I&amp;#39;m sometimes building in the little free time that I have. At the end of last year, I implemented an interesting feature on this site, but never wrote about it.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://martinschneider.me/articles/testing-my-eleventy-website-with-cypress-and-netlify/">Testing My Eleventy-Website With Cypress and Netlify</a>
              <p class="u-mb-0">Last time I wrote &amp;quot;this page is a repository consisting of some thrown-together and latenight-written code&amp;quot;. Some tests should ensure that I don&amp;#39;t break to much when I&amp;#39;m, cleaning up the code. Here&amp;#39;s how I created a basic setup that runs my tests before every deployment.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://kilianvalkhof.com/2023/css-html/the-gotchas-of-css-nesting/">The gotchas of CSS Nesting</a>
              <p class="u-mb-0">I&#39;ve written before about the problems you can run into with CSS nesting and the question that @ChallengeCSS tweeted out today made me realize there&#39;s actually a few more gotcha&#39;s.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://hidde.blog/sharing-links/">Sharing links</a>
              <p class="u-mb-0">The amount of content on the web is so large, that it&#39;s tricky to find the stuff worth reading. One of my strategies is to follow people I trust and read what they share.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://adrianroselli.com/2024/01/using-abbr-element-with-title-attribute.html">Using abbr Element with title Attribute</a>
              <p class="u-mb-0">How the &amp;lt;abbr&amp;gt; element is defined and exposed, along with the title attribute: § 4.5.9 The abbr element from WHATWG. ARIA in HTML entry on &amp;lt;abbr&amp;gt; notes it has no implicit role and naming is prohibited. Which is probably why Core Accessibility API Mappings 1.2 does not list it. HTML&amp;hellip;</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://chriscoyier.net/2024/01/13/exposed-rss/">Exposed RSS</a>
              <p class="u-mb-0">I get sites not having an &amp;#8220;RSS&amp;#8221; for &amp;#8220;Feed&amp;#8221; link on their website while actually having an RSS feed. I don&amp;#8217;t like it, but I get it. Maybe they picked an off-the-shelf t…</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://www.stefanjudis.com/today-i-learned/relative-html-links-focus-issues/">Local link targets must be focusable to prevent accessibility issues</a>
              <p class="u-mb-0">If you&amp;#x27;re linking to local elements via id you must ensure that they are focusable because otherwise assistive technology relying on &amp;#x22;document.activeElement&amp;#x22; can&amp;#x27;t follow the link target.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://minutestomidnight.co.uk/blog/giving-context-to-a-blogroll/">Giving context to a blogroll</a>
              <p class="u-mb-0">Garrit Franke’s recent post, titled “Roast my site”, motivated me to write about something that has always bugged me with personal sites: the grocery-style blogroll</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/a-css-native-way-to-prevent-orphan-text/">A CSS native way to prevent orphan text</a>
              <p class="u-mb-0">In typography, an orphan or widow is a single word on its own line. It can look particularly unpleasing with headings, and is hard to &amp;ldquo;plan for&amp;rdquo; on the web, where people view your site on a wide range of viewport sizes. You can avoid them by manually added a non-breaking space (&amp;amp;nbsp;) before the second and last word in every sentence, but doing that manually is madness. &amp;lt;h2&amp;gt;How to use the Array.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://css-irl.info/how-do-you-vertically-centre-an-element-in-css/">How Do You Vertically Centre an Element in CSS? (Even More) Easily!</a>
              <p class="u-mb-0">Rachel Andrew shared a snippet of good news for CSS layout on her blog the other day: it’ll soon be possible to vertically centre an element inside a parent without the parent needing to be a flex or grid container, using the align-content property.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://chrisburnell.com/article/batching-life-changes/">Batching Life Changes</a>
              <p class="u-mb-0">I’ve never really done a “year in review” post before, but 2023 and, in particular, the last few months, have brought tides of change that I feel the need to share</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://thinkdobecreate.com/articles/is-it-time-to-replace-sass/">Is It Time To Replace Sass?</a>
              <p class="u-mb-0">With the growth of native CSS features - including nesting - what features do we still gain by using Sass, and what is available to use in its place?</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://gomakethings.com/a-few-developer-console-tricks/">A few developer console tricks</a>
              <p class="u-mb-0">In my new free course for beginners, Learn JavaScript, I talk briefly about how powerful the developer console is, and why I think it&amp;rsquo;s ones of the best features of working in the front end.</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://matthiasott.com/notes/custom-properties-beyond-the-root">CSS Custom Properties Beyond the :root</a>
              <p class="u-mb-0">Is there a good reason why we’re defining global custom properties on :root/html and not on body?</p>
            </li>
            <li>
              <a class="delta u-inline-block u-mb-1" href="https://chriscoyier.net/2023/04/11/expanding-grid-cards-with-view-transitions/">Expanding Grid Cards with View Transitions</a>
              <p class="u-mb-0">A friend showed me something of a design spec they were charged with pulling off: The requirements: &amp;#8230; when I click on any of them it expands at the top to full width and the rest of the cards…</p>
            </li>
            
            </ul>
          </div>
        </main>

      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
