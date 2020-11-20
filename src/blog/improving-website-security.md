---
layout: post
title: Improving Website Security
description: Since WebPageTest.org started testing website security, I wanted to learn
  more about it and figure out how to improve my websites' security using headers
  on Netlify
keywords:
- eleventy
- 11ty
- website security
- security headers
- web security
- netlify
postImage: "/v1579162296/computer-18363301920-1.jpg"
date: 2020-11-20T16:00:00.000+00:00
tags:
- eleventy
- ssg
- website-security
- netlify

---
Ever since I converted my website to Eleventy - from PHP - I have been obsessively working ton improving its performance.

One well-known tool that I use for checking website performance is [WebPageTest.org](https://www.webpagetest.org "Test your website performance") and they recently added a new metric to test for - security.

This new test is provided by the [Snyk](https://snyk.io/). You can sign up for a free account, give it access to your project's repository and it will actively perform security checks on your code dependencies and you'll be notified if there are any vulnerabilities.

You don't need to have a Snyk account to improve your website security. You only need one if you want them to scan your website repository. 👍 But If you do, you can also use their command-line tool to check your website locally as you work on it.

## So why do this?

Firstly, I didn't like seeing that red square with an E grade next to all the green checks ✅ - but also it was a good learning opportunity.

{% fyi "Confession time - I'm not a website or server security expert. Everything I did to my website was based on what I learnt whilst researching the suggestions from Snyk and WebPageTest." %}

Also, and most importantly to protect my website and users from hacks introduced via JavaScript vulnerabilities like cross-site scripting or compromised npm scripts and a lot more.

## How do I do this?

First, test your website using WebPateTest.org and see what level of security your website currently has. Then If you need to improve it, look at your security report to see what Snyk recommends you need to improve.

Based on the report from Snyk, on WebPageTest I researched each of the issues it said I needed to fix. To see what you need to fix, click on the grade letter for security to be taken to your detailed report.

**These are the security issues I had to fix:**

* **X Content Type Options:**
  The only defined value, "nosniff", prevents Internet Explorer from MIME-sniffing a response away from the declared content-type. This also applies to Google Chrome, when downloading extensions
* **X Frame Options:**
  Clickjacking protection: deny - no rendering within a frame, sameorigin - no rendering if origin mismatch, allow-from - allow from specified location, allowall - non-standard, allow from any location
* **Content Security Policy:**
  A computer security standard introduced to prevent cross-site scripting (XSS), clickjacking and other code injection attacks resulting from execution of malicious content in the trusted web page context
* **X XSS Protection:**
  A Cross-site scripting filter. The HTTP X-XSS-Protection response header is a feature of Internet Explorer, Chrome and Safari that stops pages from loading when they detect reflected cross-site scripting (XSS) attacks.

## Let's look at some code

This was done specifically for my website which is hosted with Netlify, but the same principles apply to other hosts - just be aware that the way the headers code is formatted may differ.

There are two ways to do this for a website hosted on netlify - you can either add it to your `netlify.toml` config file or create a `_headers` file.

* [Syntax for the config file](https://docs.netlify.com/routing/headers/#syntax-for-the-netlify-configuration-file)
* [Syntax for the headers file](https://docs.netlify.com/routing/headers/#syntax-for-the-headers-file)

It's up to you which one you use - the difference between the two is how the headers code is formatted.

I chose to add mine to the netlify config file because I already had that file and it made sense to keep all netlify related settings in the same place.

Here is what my security headers look like in my netlify config file:

    [[headers]]
      for = "/*"
      [headers.values]
        X-Content-Type-Options = "nosniff"
        Content-Security-Policy = "default-src 'self' https://res.cloudinary.com; frame-ancestors 'none'; style-src 'self' 'unsafe-inline';"
        X-Frame-Options = "DENY"
        X-XSS-Protection = "1; mode=block"

{% fyi "You could copy the above code and add it to your netlify config file, but it may be better if you do your research, as some of these security headers may stop scripts from third-parties working on your website." %}

## Conclusion

{% cloudinaryImage "/v1605887921/before-and-after_sbwdh3.jpg", "q_auto,f_auto", "Before and after WebPageTest results" %}

There you have it - easy when you know how and I didn't break my site once. There are still a few more things to work on going forward, looking at the Mozilla Observatory test results for my website shows that there is still room for improvement - but I now have the basics covered and a more secure website.

I hope you found this post useful. I have listed the resources I used bellow to help you make your website more secure.

## Resources

### Learning Resources

* [X XSS Protection documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)
* [Content Security Policy documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
* [X Frame Options documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
* [X Content Type Options documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
* [Netlify Headers](https://notes.elmiko.dev/2019/06/27/netlify-headers.html)
* [X Content Type Options on KeyCDN](https://www.keycdn.com/support/x-content-type-options)
* [Improve your Mozilla observatory score](https://tomodwyer.com/posts/2017-08-20-improve-your-mozilla-observatory-score)
* [Web Security - Mozilla guide](https://infosec.mozilla.org/guidelines/web_security)

### Tools

* [Mozilla Observatory](https://observatory.mozilla.org/)
* [Security Headers](https://securityheaders.com/)
* [SSL Labs](https://www.ssllabs.com/ssltest/)