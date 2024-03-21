<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/>Blog - Juan Fernandes - Freelance Web Designer</title>
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
                <span>RSS Feed Preview - <small>juanfernandes.uk</small></span>
              </h1>
              <p class="lead">Juan Fernandes is a freelance web designer specialising in building bespoke responsive websites for small businesses in the UK</p>
              <a class="u-inline-block u-mb-2" href="https://www.juanfernandes.uk">Visit Website →</a>
            </header>
            <div class="alert alert--info u-mb-2">
              <p><strong>This is an RSS feed</strong>. Subscribe by copying the URL from the address bar into your newsreader. Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more and get started. It’s free.</p>
            </div>

            <h2>Recent blog posts</h2>
            <ul class="list-bordered">
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/2022-year-in-review/">2022: Year in review</a>
              <span class="u-block"><small>Published: 14th August 2023</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/2021-year-in-review/"> 2021: Year in review</a>
              <span class="u-block"><small>Published: 6th February 2022</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/working-an-inside-ir35-contract/">Working an inside IR35 contract</a>
              <span class="u-block"><small>Published: 27th April 2021</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/2020-year-in-review/">2020: Year in review</a>
              <span class="u-block"><small>Published: 5th February 2021</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/improved-website-because-of-csp/">How I improved my website because of Content Security Policies</a>
              <span class="u-block"><small>Published: 8th January 2021</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/add-your-site-to-eleventy-leaderboard/">Add your site to the Eleventy Leaderboards</a>
              <span class="u-block"><small>Published: 9th December 2020</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/improving-website-security/">Improving Website Security</a>
              <span class="u-block"><small>Published: 20th November 2020</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/creating-a-sitemap-file-with-11ty/">Creating a Sitemap file with Eleventy</a>
              <span class="u-block"><small>Published: 23rd October 2020</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/automated-open-graph-images-with-11ty-and-cloudinary/">Automated Open Graph images with 11ty and Cloudinary</a>
              <span class="u-block"><small>Published: 23rd September 2020</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/using-defer-to-improve-performance/">Using Defer to improve performance</a>
              <span class="u-block"><small>Published: 4th August 2020</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/exploring-the-benefits-of-http-2/">Exploring the benefits of HTTP2</a>
              <span class="u-block"><small>Published: 4th May 2020</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/2019-year-in-review/">2019: Year in review</a>
              <span class="u-block"><small>Published: 5th January 2020</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/multiple-blogs-with-perch-cms/">Multiple blogs with Perch CMS</a>
              <span class="u-block"><small>Published: 13th March 2019</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/keeping-track-of-tasks/">Keeping track of tasks</a>
              <span class="u-block"><small>Published: 8th March 2019</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/home-automation/">Home Automation</a>
              <span class="u-block"><small>Published: 28th February 2019</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/my-git-aliases/">My Git Aliases</a>
              <span class="u-block"><small>Published: 31st January 2019</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/2018-year-in-review/">2018: Year in review</a>
              <span class="u-block"><small>Published: 3rd January 2019</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/tools-i-use/">Tools I Use</a>
              <span class="u-block"><small>Published: 12th November 2018</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/twenty-seventeen/">2017: Year in review</a>
              <span class="u-block"><small>Published: 9th January 2018</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/my-web-design-journey/">My Web Design Journey</a>
              <span class="u-block"><small>Published: 8th June 2017</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/website-design-process-working-with-me/">Website Design Process - working with me</a>
              <span class="u-block"><small>Published: 2nd May 2017</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/automatic-copyright-year-in-perch-cms/">Automatic copyright year in Perch CMS</a>
              <span class="u-block"><small>Published: 6th February 2017</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/2016-year-in-review/">2016: Year in review</a>
              <span class="u-block"><small>Published: 9th January 2017</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/adding-svg-icons-to-a-sprite-with-perch-cms/">Adding SVG icons to a sprite with Perch CMS</a>
              <span class="u-block"><small>Published: 9th December 2016</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/newsletters-for-front-end-developers/">Newsletters for Front-end developers</a>
              <span class="u-block"><small>Published: 29th November 2016</small></span>
            </li>
            
            
            <li>
              <a class="delta" href="https://www.juanfernandes.uk/blog/hello-world-first-blog-post/">Hello World! First blog post.</a>
              <span class="u-block"><small>Published: 26th October 2016</small></span>
            </li>
            
            </ul>
          </div>
        </main>

      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
