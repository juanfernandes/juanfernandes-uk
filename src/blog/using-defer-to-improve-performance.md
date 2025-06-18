---
layout: "post"
title: "Using Defer to improve performance"
description: "Using Defer to improve the performance of my website by only loading
  JavaScript and CSS on a per component/partial basis."
keywords:
  - javascript
  - vanilla javascript
  - defer javascript
customPostImg: "intro--code-img"
postImage: "v1579162296/computer-18363301920-1.jpg"
date: 2020-08-04T00:00:00Z
tags:
  - development
  - javascript
---
In my last post, [Exploring the benefits of HTTP2](https://www.juanfernandes.uk/blog/exploring-the-benefits-of-http-2/ "Exploring the benefits of HTTP2"), I wrote about removing jQuery and my `global.min.js` files in favour of loading JavaScript on a per component or partial basis, so only when that component is included on a page it then loads the needed JavaScript code and library.{.lead}

Which lead me to look into Defer in JavaScript as another way to improve performance.

"This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing DOMContentLoaded.

Scripts with the defer attribute will prevent the DOMContentLoaded event from firing until the script has loaded and finished evaluating." - [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script "MDN Web Docs")

Since the testimonials slider on my homepage is near the end of the page, I don't need to load the JavaScript right away and since it's not used on every page, it makes sense to only load it where the slider is being used.

I read a few articles on Async and Defer to try and understand the difference between both and which was the correct one to use for the testimonials slider.

So I figured I would just need to add the defer attribute to the `<script>` tag for the TinySlider JavaScript and that would be it...

But I found that doing this, it stopped the slider from working - I'm still learning JavaScript, so you will have to forgive me. I looked at the TinySlider example code I used and realised it was written so it would run as soon as the browser loads that part of the code.

What I needed to do was change the code to only run when the DOM had finished loading and this meant that the HTML code for the slider would have been loaded too.
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
