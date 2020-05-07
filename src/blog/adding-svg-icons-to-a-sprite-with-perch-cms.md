---
layout: layouts/post.njk
title: Adding SVG icons to a sprite with Perch CMS
description: >-
  Allow a Perch CMS user to add SVG icons to an SVG sprite and use them through
  out the website. Usually, SVG sprites are created by a developer/designer when
  building a website and then never revisited unless the site has a redesign.
  The creation of a sprite is likely to be an automated process using a task
  runner like Grunt or Gulp JS.
keywords:
  - svg
  - icons
  - sprite
  - perch
  - cms
  - front-end
  - development
postImage: /v1579162296/computer-18363301920-1.jpg
date: 2016-12-09T09:00:17.495Z
tags:
  - development
---
I wanted to be able to allow a CMS user to add an SVG icon to a sites' SVG Sprite.

An SVG sprite is the new way of doing image sprites, like the old way of doing CSS image sprites - where you would put all your icons on one image files then use CSS to position that image to show the icon you needed, this is essentially the same thing, but instead it's a list of SVG icons that can be used throughout a site.

See this article on CSS Tricks about creating an 'Icon System with SVG Sprites' - https://css-tricks.com/svg-sprites-use-better-icon-fonts/

Usually, SVG sprites are created by a developer/designer when building a website and then never revisited unless the site has a redesign. The creation of a sprite is likely to be an automated process using a task runner like Grunt or Gulp JS.

But this process does not apply to a site once it's gone live and is managed by a content management system (CMS).

A similar technique inspired me to create this. See Clive Walker's post - http://www.cvwdesign.com/blog/using-perch-layouts-and-managing-svg-assets-with-perch

## Let's get into the code

To start, you need to create a PHP file which will list all the SVG icons. This PHP file has to be  included on all pages - but they will be hidden. This file is not in the root of the site and is not indexed by search engines.

Once you have that setup, you can include the ability to add SVG icons to your templates, and all the user needs to do is insert the ID of that SVG.

Create a PHP file inside the /perch /includes/ - you don't have to create the includes folder, but I like to keep these types of files separate.

I called the page svgs.php but you can name it anything - icons.php may have made more sense.

```
<?php include($_SERVER['DOCUMENT_ROOT'].'/cms/runtime.php'); ?>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style="display: none" class="hidden">
    <?php perch_content('svgs'); ?>
</svg>
```

In this PHP file, I have a perch_content tag called svgs - again this could be called anything. Make sure you include the runtime.php as per usual and then go to that file on your website: websiteaddress.uk/cms/svgs.php - you can now edit that page via Perch CMS.

You need to create a new template for adding icons to the svgs.php file. Create the template in /templates/content/ and you can call it anything you want; I called mine SVG_icons.html and use the following code:

```
<perch:before>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style="display: none" class="hidden">
</perch:before>
      <symbol id="svg-<perch:content id="id" type="text" label="ID" requi
      red="true" size="m" />" width="<perch:content id="width" type="text" label="Width" required="true" size="s" />" height="<perch:content id="height" type="text" label="Height" required="true" size="s" />" viewBox="<perch:content id="viewbox" type="text" label="ViewBox" required="true" size="m" help="Format: 0 0 0 0" />">
        <title><perch:content id="title" type="text" label="Title" required="true" title="true" order="1" /></title>
        <perch:content id="text" type="textarea" label="SVG Paths" html="true" editor="markitup" />
      </symbol>
<perch:after>
    </svg>
</perch:after>
```

Now log in to your Perch CMS and go to Pages > svgs, click on the Icons region and select the new template - SVG Icons - make sure you check 'Allow multiple items' so that you can add multiple icons.

You need to include this code on all the pages that you want to be able to use the SVG icons on - I would add it to you header layout - make sure it's placed just after the <body> tag.

```
<?php
    perch_content_custom('svgs', array(
        'page'=>'/cms/includes/svgs.php',
        'template'=>'SVG_icons.html'
    ));
?>
```

Let's go back to the SVGs page - Pages > svgs and let's add an icon.

![Adding an SVG icon](/assets/imgs/svgs-1.png "Adding an SVG icon")

The SVG_icons.html template gives you the following fields:

* Title - if you are not hiding this icon for visually impaired users, you should give it a title
* ID - this has to be a unique name as it will be used to refer to the icon
* Width and Height
* ViewBox and SVG Paths.

Fill all of these in - you get this information by opening the SVG using your IDE - like Sublime Text.

Save this.

Once saved, that icon should now be in the svgs.php page - but it won't be visible because we are hiding the SVG container.

This is what the output will look like inside the <svg> tag in the svgs.php file:

```
<symbol id="svg-html5" width="150px" height="150px" viewBox="0 0 32 32">
    <title>html5 Icon</title>
    <path d="M4.665 3.411l2.063 23.176 9.258 2.574 9.284-2.578 2.065-23.172h-22.671zM8.951 8.911l-0.068-0.763h7.107v2.842h-4.005l0.259 2.911h3.746v2.842h-6.341l-0.698-7.833zM22.518 14.665l-0.667 7.483-0.043 0.48-5.822 1.616-5.814-1.616-0.398-4.463h2.849l0.202 2.267 3.163 0.854 3.165-0.856 0.329-3.686h-3.485v-2.842h6.587l-0.069 0.763zM23.032 8.911l-0.129 1.441-0.057 0.639h-6.846v-2.842h7.1l-0.068 0.762z"></path>
</symbol>
```

Include the following code on any template where you want the user to be able to add an SVG icon from the sprite.

```
<svg aria-hidden="true">`
    <use xlink:href="#svg-<perch:content type="text" id="skill-icon-id" label="Icon ID" required="true" size="m" help="SVG icon ID name" />" />
</svg>
```

By adding the above code in a template, in Perch, you can use an SVG icon from the svgs.php file.

![Adding an SVG icon to your content](/assets/imgs/svgs-2.png "Adding an SVG icon to your content")

You should now be able to add your own SVG icons to your SVG sprite via Perch CMS.

This solution is what I am using on my own website and will be using in all future website that I create that use Perch CMS.

What do you think of this solution? Can you see any way this can be improved? I'd love to get some feedback - this is the first time I have shared any code that I have used in Perch.
