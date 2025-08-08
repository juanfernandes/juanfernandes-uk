---
layout: "post"
title: "Automated Open Graph images with 11ty and Cloudinary"
description: "I wanted to find a way to dynamically generate a unique Opengraph
  images for each blog post automatically using post data, Cloudinary API
  & Eleventy"
keywords:
  - facebook
  - twitter
  - social media
  - opengraph
  - cloudinary
  - ssg
  - eleventy
  - 11ty
customPostImg: "intro--code-img"
postImage: "/v1579162296/computer-18363301920-1.jpg"
date: 2020-09-23T00:00:00Z
tags:
  - opengraph
  - cloudinary
  - ssg
  - eleventy
  - 11ty
---
I wanted to find a way to dynamically generate a unique Open Graph (OG) image for each blog post or note automatically using post data, the Cloudinary API and Eleventy (11ty) for social sharing.{.lead}

The purpose of this solution is to save time by not having to manually create a blog post image for each post and make blog posts stand out more when shared on social media websites like Twitter for example.

Previously I was using a generic image for posts, or if I used a specific image for the blog post header, then that would become the OG image. But I wanted something unique for each post and something that would instantly tell people on social media what the post was about.

There are many ways to achieve this, for example, [Drew McLellan](http://drewmclellan.net/ "Drew McLellans' website") wrote [Dynamic Social Sharing Images](https://24ways.org/2018/dynamic-social-sharing-images/) back in 2018, but Drew is doing this at build time and is using some very clever stuff with Puppeteer and also this post, [Automated Social Sharing Images](https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln) by [Stephanie Eckles](https://thinkdobecreate.com/ "Stephanie Eckles' website") that also uses Puppeteer.

Those are great solutions, but I wanted something simpler to set up, lightweight on dependencies, not too technical and to just be able to _'set it and forget it'_.

## Solution

What I wanted to achieve was to have an OpenGraph image that shows the post title on top of the image with my logo added to the image as well. This is what it will look like:

{% cloudinaryImage "opengraph-image_y6colg.webp", "q_auto,f_auto", "Image showing a blog post title and my logo" %}

First you will need to make sure you have the OpenGraph tags for images added to the `<head>` of your page template, in my case I have this in my `blog.njk` layout in eleventy. Here is the code I currently use:

``` html
{% raw %}{% if postImage %}

  <meta name="twitter:image" property="og:image" content="{{ site.cloudinary_url }}{{ postImage }}" />
  <meta name="twitter:image:alt" property="og:image:alt" content="{{ title }}" />

{% else %}

  <meta name="twitter:image" property="og:image" content="{{ site.meta.ogImg }}" />
  <meta name="twitter:image:alt" property="og:image:alt" content="{{ site.meta.ogImgAlt }}" />

{% endif %}{% endraw %}
```

Here I am checking to see if the post has specified a post image, if not, then use the default one (which I need to amend to use what I am writing about here). You'll notice that I have merged the OpenGraph tags (`name="twitter:image" property="og:image"`) that Facebook and Twitter use instead of having multiple lines of code for the same thing. Note that you can specify ALT text for the image.

Since I already use Cloudinary, I was happy to discover that their API has [text and image overlays](https://cloudinary.com/documentation/image_transformations#image_and_text_overlays "Cloudinary API - Image and Text Overlays Documentation") that you can add to your images when you request them.

This meant that my idea to have the post title and my logo overlaid on an image could be achieved.

## How does it work?

This works by passing variables in the cloudinary image request URL, these variables are then used by the cloudinary API to create these custom images _on the fly_.

Here is the complete URL for requesting an image with some custom overlays - in this case, the blog post title and my website logo.

```
https://res.cloudinary.com/juanfernandes/w_1200,f_auto/l_juanfernandes-logo,w_100,g_south_east,x_60,y_40/l_text:Georgia_80_bold_center:Using Defer to improve performance,co_rgb:eee,c_fit,w_600//v1579162296/computer-18363301920-1.jpg
```

The great thing about this is that you can design your image right in the browser by adding a few variables to the URL.

Now, this is how my OpenGraph images code in my `blog.njk` layout template looks like using the Cloudinary variables and my blog post variables in Eleventy.

``` html
{% raw %}<meta name="twitter:image" property="og:image" content="{{ site.cloudinary_url }}w_1200,f_auto/l_juanfernandes-logo,w_100,g_south_east,x_60,y_40/l_text:Georgia_80_bold_center:{{ title }},co_rgb:eee,c_fit,w_600/{{ postImage }}" />

<meta name="twitter:image:alt" property="og:image:alt" content="{{ title }}" />{% endraw %}
```

## Let's break it down

Essentially I am passing the post title text and image using Nunjucks variables, then I'm telling Cloudinary how to display that text and image overlay on top of the post image. Here is a breakdown of what all those variables mean:

* `{{ site.cloudinary_url }}` this is a variable I use to pass the  cloudinary URL which my account name
* `w_1200,f_auto/` here I am requesting the images at 1200px wide and automated image format
* `l_juanfernandes-logo` this is the name of the image I want to use in the overlay, my logo, it's prepended with `l_` and this is what tells cloudinary to use it as an overlay
* `w_100,g_south_east,x_60,y_40/` this specifies the size of the image, 100px wide and the position, bottom right and its exact placement using X and Y values
* `l_text:Georgia_80_bold_center` this tells cloudinary that the overlay text should be in Georgia font and the font size should be 80px, bold and centred
* `{{ title }}` this is nunjucks variable for the blog post title
* `co_rgb:eee,c_fit,w_600` this tells cloudinary the colour we want the overlay text to be, places it centred vertically and horizontally and sets a max-width for the text
* `{{ postImage }}` this variable passes the name of the post image already uploaded to cloudinary

For general posts, like [Notes](/notes/), I created a generic image using my brand colour and the text is added in the centre of the image and my logo at the bottom right.

For posts where I have used a custom image, I make sure that it's a dark image to make the white text is legible.

This was a quick solution and an easy win that will make my posts stand out a bit more on social media. I got to delve into and learn more about the Cloudinary API overlays in general.

### Tip: Testing your social sharing images

Twitter and Facebook provide tools for you to test your social media 'cards' and here is what mine now looks like on Twitter.

{% cloudinaryImage "card_preview_twitter-dev.png", "q_auto,f_auto", "Image showing the twitter card preview tool" %}

* [X Card Validator](https://cards-dev.x.com/validator "X Card Validator")
* [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/ "Facebook Sharing Debugger tool")

## Taking this further

I could take this a step further and pass the colour of the text or be able to choose a different logo or image to use as an overlay that can be set via a Content Management System, in my case that's [Forestry.io](https://www.forestry.io "Forestry CMS website") when creating a post.

I could even turn this into an 11ty Plugin.

Hope you find this useful and if you want to discuss anything about it, reach out to me on [Twitter](https://x.com/juanfernandes "Juan Fernandes on Twitter").
