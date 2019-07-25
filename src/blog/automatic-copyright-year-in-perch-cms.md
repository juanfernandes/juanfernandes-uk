---
layout: layouts/post.njk
title: Automatic copyright year in Perch CMS
description: >-
  How to auto update your copyright year with Perch CMS. In this short blog post
  I share a small code snippet that you can add to automatically update your
  copyright year.
keywords:
  - cms
  - content management system
  - php
  - auto update copyright year
  - perch
  - grabaperch
postImage: /assets/imgs/computer-18363301920-1.jpg
date: 2017-02-06T08:30:22.891Z
tags:
  - development
---
One of the things I still get asked to do a lot by clients, ones that don't have a site that is managed by a CMS - is to update their copyright year on the footer. 

Now, this is fairly easy to do using PHP on its own, just using this line of code: 

```
    <?php echo date("Y"); ?>
```

But, you if allow your CMS users to edit the copyright text, then you can't use PHP in a Perch HTML template. 

After reading this article, [Passing Variables Into Templates](https://docs.grabaperch.com/templates/passing-variables-into-templates/ "Passing Variables Into Templates"), I created this code snippet that sets a variable with the current year and then I pass this variable to the Perch template.  

```
    <?php
        $curYear = date('Y');
        PerchSystem::set_var('curyear',$curYear);
        perch_content_custom('Footer', array(
            'template'=>'footer.html'
        ));
    ?>
```

This is the Perch template I use to add the copyright text and year. 

```
    <p class="copyright">©2015 - <perch:content id="curyear" /> <perch:content       
    type="text" id="footer-copyright" label="Copyright Text" required="true" /></p>
```

This may be a bit over the top, I could simply just added the PHP code in the footer template and not allow the user change the copyright text, but my copyright statement is part of a bigger template that needs to be CMS managed. 

I hope you found this tip useful. Let me know if you see any way I could improve this code.

How are you setting the copyright year?
