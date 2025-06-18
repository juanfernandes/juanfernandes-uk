---
layout: "post"
eleventyExcludeFromCollections: true
title: "Weeknotes #18"
description: "Bit of a slow week at work while we wait for the new UX Designer to get
  acquainted with the business and produce some designs for the Front-end
  Developers to produce."
keywords:
  - website
  - designer
  - freelance
  - contract
  - front-end developer
  - front end development
  - GIT
  - FreeAgent
  - Invoice Ninja
  - Heart Internet
  - the website of doom
  - website hosting
date: 2019-06-12T20:05:02Z
---
Bit of a slow week at work while we wait for the new UX Designer to get acquainted with the business and produce some designs for the Front-end Developers to produce.{.lead}

## Work
This week my main focus was on creating a 'getting started' guide on creating a new component within our Fractal based component library. Got that finished and ready for review. It's interesting how much you forget about when it's not documented, even though the process here is new to me.

Spent some time teaching some of the other developers how to use GIT via the command line, in this case, GIT Bash. Most of the developers here have never used GIT and they started using recently after switching from SVN - but they started using it via their IDEs which has led to a mixture of issues.

Things like working on the wrong branch because they thought their IDE has switched to the feature branch but it hadn't and they committed their changes into the develop branch and UI elements saying things like _Merge_ when it means _Pull_ etc.

So we've decided it will be easier if they all know some basic commands because they all have different IDEs and everyone is in agreement with this change. I think if the command line had been introduced first, they may have been scared to use it, but having seen how many issues they have had with their IDEs and their GIT UIs and then seeing myself and the other contractor hop over, jump on the command line and fix the issues with ease - they are now not afraid of the command line.

I also learnt some new GIT things this week. I learned that you can rename a branch, local and remote using the following command will rename the local branch you are currently in:
```git branch -m new-name```

And I created myself a new alias:
```alias use-the-force=git push --force-with-lease```

With some many developers merging into ```develop``` I found I have to rebase quite a lot and so I got fed up of type ```git push --force-with-lease``` every time and decided it was time I _Used the force_ 😬


## Freelance
This week in freelance has mainly consisted of admin work and moving the last few websites and domain names away from Heart Internet.

### Domain names and website hosting
Over the past year, I've been migrating 44 websites - some simple, other database and CMS based one and it has been painful. Mainly because of not having enough time to focus on this while doing freelance and contract work, so I let this task slip.

But finally, the last 3 websites were dealt with. One was deleted as the client no longer needs it as they focus on other ventures, another had to be transferred to Heart Internet 💩 - because it guaranteed no downtime and not extra IT resources on my clients' side, so my client chose to stay with Heart Internet. I helped by creating a new account with Heart Internet and initiated the support request to get it migrated from my account to theirs.

Another, [thewebsiteofdoom.com](https://www.thewebsiteofdoom.com "The Website of Doom!") was also going to get deleted, but one the contributors decided to keep it going and has taken on the hosting costs, so had to get it moved over to my new hosts, [Guru 💰](https://my.guru.co.uk/aff.php?aff=6526 "Guru.co.uk - affliliate link") and managed to get some initial issues fixed - I hate WordPress websites! (I'm still fixing a few issues with it, doesn't help that I didn't build it).

### Simplifying my business
I cancelled my renewal of [InvoiceNinja.com](https://www.InvoiceNinja.com "Invoice Ninja") as I decided to move to FreeAgent because I got it for free (I'm also switching business bank accounts, that's how I got FA for free). So that's a bit of saving but getting rid of another yearly subscription as I continue to simplify things with my business.

It turns out, that after years of logging expenses in a spreadsheet and taking photos of my expenses receipts using an app was a waste of time because you only need to log them if you're claiming those expenses back, but since I use a business card and not my own bank card, I don't claim expenses and I only need to keep the receipts!

### Client work
Didn't do much client work this week, other than tidying up an export of the members from a clients website. They have 'free membership' on their website currently, but as part of the shop project I've been working on for them, they will be selling memberships.

So we need to remove all current members (not very active) and we will be emailing them (we have their consent for this, don't worry) to let them know about the changes to membership and invite them to join again if they want.

This was a very manual process as I couldn't find a way to print out the full list of members, so I exported the table from the database into a CSV file and cleaned it up in Excel. 🤷

That's it for this week. Do let me know if you're reading this and are enjoying it or not - you send me a tweet or DM me over on [Twitter](https://x.com/juanfernandes "Juan Fernandes on Twitter")

## Reading
- [Self-Host Your Static Assets – CSS Wizardry](https://csswizardry.com/2019/05/self-host-your-static-assets/ "Self-Host Your Static Assets – CSS Wizardry")
- [An emotional adventure](https://colly.com/journal/an-emotional-adventure "An emotional adventure")
- [ownership is resistance](https://mailchi.mp/pjrvs/ownership-is-resistance?e=2b9a432579 "ownership is resistance")
- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/ "A successful Git branching model")
- [Part 1: Understanding Implicit Tracks](https://css-irl.info/debugging-css-grid-part-1-understanding-implicit-tracks/ "Part 1: Understanding Implicit Tracks")
- [The Crushing Weight of the Facepile—zachleat.com](https://www.zachleat.com/web/facepile/ "The Crushing Weight of the Facepile—zachleat.com")
- [Weeknotes #6 - Dave Rupert](https://daverupert.com/2019/06/weeknotes-6/ "Weeknotes #6 - Dave Rupert")
