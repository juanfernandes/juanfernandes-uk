---
layout: "post"
title: "Add your site to the Eleventy Leaderboards"
description: "This is a quick tip showing you how to add your eleventy built website
  to the Eleventy leaderboards"
keywords:
  - performance
  - leaderboard
  - 11ty leaderboard
  - sites built with 11ty
  - performance benchmarks
  - eleventy
  - 11ty
customPostImg: "intro--code-img"
postImage: "v1579162296/computer-18363301920-1.jpg"
date: 2020-12-09T23:00:00Z
tags:
  - eleventy
  - ssg
  - 11ty
---
The Eleventy (11ty) leaderboard benchmarks websites built with Eleventy over time.{.lead}

TL;DR - You need to add your site via GitHub to the eleventy website repository and create a pull request for it to be included in the leaderboards.

{% cloudinaryImage "/eleventy-leaderboards.jpg", "q_auto,f_auto", "Screenshot of the Eleventy Leaderboards top 5" %}

<hr>

## Let's get started
1. Go to the eleventy website GitHub repository - [https://github.com/11ty/11ty-website](https://github.com/11ty/11ty-website)
2. Navigate to `/_data/sites` - here you will find `JSON` files - each one represents a website built with Eleventy and ones shown on the leaderboard
3. Now you need to create your own `JSON` file for your website, so click on the **_Add file_** button and then on the dropdown click on **_Create new file_**

{% cloudinaryImage "/1-create-new-file.jpg", "q_auto,f_auto", "Shows user selecting create new file menu item in GitHub" %}

4. Enter your a file name in the **_Name your file..._** input. This is a filename, so don't use spaces or punctuation marks, but you can use hyphens (-) or underscores (_) to separate words

5. Use the template below with your website's details as the content of your new file:

```
{
    "url": "",
    "name": "",
    "description": "",
    "twitter": "",
    "authoredBy": [""],
    "source_url": ""
}
```
* **url**: The site’s live URL
* **name**: Name of the site
* **description**: A short text description of the site
* **twitter**: Twitter username for the site or the site’s author.
* **authoredBy**: An array of Twitter usernames of the site’s authors. Supplements the twitter entry. (Optional)
* **source_url**: URL to the source code (Optional)

{% cloudinaryImage "/2-add-your-file.jpg", "q_auto,f_auto", "Shows new JSON file being created in GitHub" %}

Now that you're done creating the new file, you need to save it and also create a pull request - this will ask for your file to be added to the eleventy repository.

6. You don't need to add anything to the optional description field

7. Click on the **_Propose new file_** button

8. On the next screen, you can check your changes and then click on the **_Create pull request_** button to proceed.

9. You don't need to add a comment, but you can thank [Zach](https://x.com/zachleat "Zack Leatherman on X") for creating Eleventy. Then click on the  **_Create pull request_** button again

10. Next, GitHub will do a bunch of checks on your changes and it will tell you if there are any conflicts. Hopefully, there aren't, but if you followed this exactly you shouldn't have any conflicts.

<figure>
  {% cloudinaryImage "/3-final-step.jpg", "q_auto,f_auto", "Shows a sucessfull pull request screen in GitHub" %}
  <figcaption>This is the result of me submitting an actual change, so I'd have a screenshot of what the final stage looks like.</figcaption>
</figure>

That's it - you can now close the page and wait. Once your pull request gets merged, your website will be included in the next round of leaderboard checks and added to the leaderboard.

Keep an eye out on the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/) to see how your website scores.

{% fyi "Once your website has been added to the Eleventy GitHub repository, you will also get your author page on the Eleventy website." %}

Check out my [author page](https://www.11ty.dev/authors/juanfernandes/ "Juan Fernandes' author page on the Eleventy website").
