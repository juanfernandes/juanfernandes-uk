---
layout: layouts/post.njk
title: Exploring the benefits of HTTP2
description: Since this website is hosted on Netlify & they serve websites using the HTTP/2 protocol I've started exploring the benefits of it
keywords:
- "#MayThe4thBeWithYou"
- vanilla javascript
- JavaScript
- jQuery
- partial
- http/2 protocol
- HTTP/2
- static site generator
- nunjucks
- eleventy
- jamstack
customPostImg: 'intro--code-img'
postImage: 'v1579162296/computer-18363301920-1.jpg'
date: 2020-05-03T23:00:00.000+00:00
tags:
- development

---
Now that this website is hosted on [Netlify](https://www.netlify.com) and they serve websites using the [HTTP/2 protocol](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2) I've started exploring the benefits of it and what I need to change to take advantage of those benefits.

> HTTP/2 is a major revision of the HTTP network protocol. The primary goals for HTTP/2 are to reduce latency by enabling full request and response multiplexing, minimize protocol overhead via efficient compression of HTTP header fields, and add support for request prioritization and server push.  - MDN Web Docs

After some research, I found out that when a website is being served via HTTP/2, you no longer need to rely on the following techniques to improve the performance of your website:

* Concatenated CSS and JS
* Inline CSS (criticalCSS)
* Use of a CDN (Content Distribution Network)

This website is fairly simple and does not rely on a lot of JavaScript but does use it for a couple of sliders, one on the homepage for testimonials and another on each of the work pages.

I used this [tool from KeyCDN](https://tools.keycdn.com/http2-test "HTTP/2 Protocol Test") to find out if my website was being served via the HTTP/2 protocol.

## The Old Way

What I was doing before was to load jQuery in the footer on all pages along with a `global.min.js` file - which was a concatenated file made up of my `main.js` and `plugins.js` files.

The file was minified, but it's still a lot of JS to load on every single page, even if it wasn't being used - and to top it all off, I was also loading jQuery.

## Out with the old, in with the new... way

The first thing I decided to do was to get rid of jQuery - there's nothing wrong with jQuery, I know its no longer flavour of the month, but it still has its place and it's still used by a lot of websites, but for my website, it was overkill.

So I replaced the jQuery slider with a vanilla JS alternative, [TinySlider](https://github.com/ganlanyuan/tiny-slider). I spent some time researching to find a slider that was small in size as well as accessible. I'm not an accessibility expert, so I just made sure that the slider was navigable using a keyboard.

This meant I could remove the code in the footer that loaded the jQuery library from the jQuery CDN and also stopped including the `plugins.js` file into the `global.min.js` file.

It's a great start, the global.min.js file was now smaller and I was no longer loading jQuery.

But I didn't stop there. One of the advantages of HTTP/2 is that you don't have to worry about too many file requests.

Instead of including the JavaScript code for the slider on every single page. I decided to only include the slider JS code in the slider partial - I'm using Nunjucks for this, but you can do this with other templating languages.

This is the code for the testimonials slider on my homepage:
```
              <link rel="stylesheet" href="/assets/css/components/slider.css">
              <script src='/assets/js/tiny-slider.js' defer></script>
              <script>
                document.addEventListener("DOMContentLoaded", () => {
                  let slider = tns({
                    container: '.testimonials__slider',
                    items: 1,
                    autoHeight: true,
                    speed: 400,
                    loop: true,
                    autoplay: true,
                    autoplayButtonOutput: false,
                    controls: false,
                    autoplayHoverPause: true,
                    nav: true,
                    navPosition: "bottom",
                  });
                });
              </script>
```
At the same time, I also included the CSS or the slider - just on the slider partial.

The JS and CSS files, as well as the slider JS code, are included the at the end of the slider partial so that when the JS runs, the HTML for the slider has already been loaded by the DOM.

This change has improved my websites' overall performance score on Lighthouse - but there is one more thing I need to fix before its perfect.

_This is all new to me and I may have made a mistake or misunderstood something, if you spot something, please let me know -_ [_send me a tweet_](https://x.com/juanfernandes)

**May the 4th be with you**
