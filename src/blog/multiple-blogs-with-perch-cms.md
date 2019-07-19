---
layout: layouts/post.njk
title: Multiple blogs with Perch CMS
description: >-
  Short post to show how you can create multiple blogs using the Perch CMS and
  the blog app using sections.
keywords:
  - perch
  - cms
  - perch cms
  - blog
  - blog app
  - multiple blogs with perch
  - multiple blogs
postImage: /assets/imgs/computer-18363301920-1.jpg
date: 2019-03-13T13:00:08.995Z
tags:
  - development
---
An existing client asked me to move their blog from /self-help/blog/ to the root of the website - but they wanted to keep the self-help blog, as well as having a blog for general posts and a blog for media related articles, ie press releases etc.

I wondered if the perch blog app had a built-in way of doing this - it does but not in the way I thought it would. It does have `perch_blog_section()` which allows you to output a blog section onto a page.

You can think of blog sections as virtual folders where you can store some blog posts. So you still write all your blog posts in the same way as before, but you choose which section it belongs to.

## Create the sections
To get started you need to log into perch and create your new sections. Once you're logged in:

1. Click on Blog -> Sections
2. Click the _Add section_ button
3. Add the _Title_ [image is not required]
4. Click _Save_

For my client, I created the sections based on where they were going to be shown _media_ and _self-help_.

You can leave _Posts_ as the blog's default section.

## Multiple blogs
We can now create our multiple blogs. Depending on the website you're working on, you'll either need to create a new page or edit an existing one.

For my clients' website, I created a new page using the default template and then added the following code:

```
<?php
  perch_blog_custom([
    'section'   =>  'media',
    'sort'       => 'postDateTime',
    'sort-order' => 'DESC',
    'template'  =>  'blog/media_post_in_list.html'
  ]);
?>
```

If you already use Perch, then the above code will look fairly familiar, but if you don't.

- *Line 3* -  instead of getting all the blog posts, we are calling just blog posts that belong to the _media_ section
- *Lines 4-5* - we are sorting the blog posts in the date they were created and showing them in descending order
- *Line 6* - this specifies the template to use. This one is specific to my clients' website. You can just use your own one or the default ```post_in_list.html``` template.

Using the above code, you can create your multiple blogs in different areas of your website.

## Creating the content
Now that you have the code to show posts from different sections on different pages of your website, you can create blogs posts and add them to each section.

1. Login to Perch
2. Go to the Blog app
3. Create or edit a post
4. Switch to the _Meta and Social_ tab
5. Scroll down and select the section from the dropdown
6. Save

Now, go to the page for that blog section on your website and see your posts for that blog section.

### If you're also moving a blog
In my case, I first moved the blog folder to the root of the website, changed all the URLs, updated the settings for the blog app in Perch settings and changed rewrites in the ```.htaccess``` file.
