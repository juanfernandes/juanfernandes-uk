---
layout: layouts/post.njk
postImage: "/v1579162295/trianglify.png"
title: Escaping Nunjucks code in a markdown code block
description: Turns out you need to escape Nunjucks code within a markdown code block.
  Found a solution by Mark Llobrera - @dirtystylus
keywords:
- eleventy
- 11ty
- markdown
- escaping
- nunjucks
date: 2020-09-23T00:00:00+01:00
tags:
- notes

---
I noticed that my latest blog post wasn't showing the Nunjucks code within markdown code blocks. Turns out you need to escape Nunjucks code if you are using nunjucks templates. 😁

Found a solution by [Mark Llobrera](https://x.com/dirtystylus "Mark on Twitter") - [Eleventy: Escaping Nunjucks Statements in Markdown Code Blocks](https://www.markllobrera.com/posts/eleventy-escaping-nunjucks-statements-in-markdown-code-blocks/ "Eleventy: Escaping Nunjucks Statements in Markdown Code Blocks")

``` html
{% raw %}{% raw %}{% if postImage %}
  <meta name="twitter:image" property="og:image" content="{{ site.cloudinary_url }}{{ postImage }}" />
{% endif %}{% endraw %}{% endraw %}
```
