---
layout: layouts/post.njk
title: 'Weeknotes #14'
description: >-
  Not much happened this week. The handover process is well underway and there
  if not much left now to handover. It was my last full week in Manchester.
keywords:
  - freelance
  - contract
  - front-end
  - developer
  - interaction
  - designer
postImage: /assets/imgs/trianglify.png
date: 2019-05-13T17:33:44.747Z
tags:
  - notes
---
Not much happened this week. The handover process is well underway and there if not much left now to handover. It was my last full week in Manchester. 

## Work
This week was my last full week in Manchester working in the Department for Education offices with the dxw team. 

I spent most of the week working with my replacement - Rich - on handing over all the bits and pieces I've worked on, creating some docs with access information. I also learnt how to transfer a heroku app from my own account to another.

Made some changes to the prototype while working with Rich and the service designer. 

## Personal
I've managed to get quite a few changes done to my personal website as I convert it to a static site. I converted my 404 page to nunjucks and also removed the jQuery dependency. 

I had a list of companies I've worked for that is shown on the work page, but the last 4  get repeated on the homepage - I moved the list of companies into a JSON file and on the homepage, I only show the first 4 companies, while on the work page, it shows the entire list.

Had to figure out how to achieve this with nunchucks and I did it using the following code:

```
  {%- for i in range(0, 4) -%}
  {% set item = companies[i] %}
  <div class="four cols">
    <div class="client">
      <img class="client__logo" src="/assets/imgs/work/clients/{{ companies[i].img }}" alt="{{ companies[i].img.alt }}">
    </div>
  </div>
  {%- endfor -%}
```

I'm really enjoying this side project of converting my PHP CMS based website to a static site as well as working with Netlify - learning quite a few new things along the way. Hopefully next week I will hope on Twitch and do a bit of streaming - just to get used to talking about the code I'm writing.

## Reading
- [What It's Like To Work Remotely On An Island | A Day In The Life Of A Company Of One | Paul Jarvis](https://www.penguin.co.uk/articles/2019/apr/working-remotely-on-an-island-company-of-one-paul-jarvis "What It's Like To Work Remotely On An Island | A Day In The Life Of A Company Of One | Paul Jarvis")
- [Get a CSS Custom Property value with JavaScript - Andy Bell](https://andy-bell.design/wrote/get-css-custom-property-value-with-javascript/ "Get a CSS Custom Property value with JavaScript - Andy Bell")
- [Permission to Write Stuff](http://brendandawes.com/blog/permission-to-write-anything "Permission to Write Stuff")

### Weeknotes
- [Weeknotes #5 - Dave Rupert](https://daverupert.com/2019/05/weeknotes-5/ "Weeknotes #5")
- [Week Notes 15 - Andy Bell](https://andy-bell.design/wrote/week-notes-15/ "Week Notes 15 - Andy Bell")
- [Weeknotes 6 - Mark Boulton](https://markboulton.co.uk/journal/weeknotes-6/ "Weeknotes 6")
