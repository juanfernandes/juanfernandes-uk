---
layout: "post"
title: "My Git Aliases"
description: "Quick post to share my Git aliases. I love seeing other developers' aliases - a lot of mine have been copied from others. So I thought I'd share mine - in the hopes someone will find it useful."
keywords:
  - git
  - alias
  - aliases
  - developer
  - development
  - bash
  - fish
  - bashrc
intro:
  heading:
  subheading:
date: 2019-01-31T16:05:36Z
tags:
  - development
---
I use Git via the command line and have always used it that way ever since it was introduced at a company I worked at a few years ago.{.lead}

But soon after using it Git for a few days, I started disliking the repetitiveness of the commands - so I did some googling and found that I could create shortcuts (aliases) in Bash.

So I started creating aliases for the commands I used several times a day and over the years I have added to them as I find other developers' own git aliases.

## How to create an alias

You can create an alias in a .bash_profile or in . bashrc, usually in the your users home directory.

A bash alias takes on this format:

    alias ALIAS_NAME="ALIAS_COMMAND"

Here are my aliases:

{% cloudinaryImage "/v1638977502/aliases_nalmi0.png", "q_auto,f_auto", "List of GIT aliases" %}

You can see the list on this [Github gist](https://gist.github.com/juanfernandes/7e13fa0c81253ae46f8d "GIt Aliases Gist")

## Bash the fish

With my new laptop (MacBook Pro) I decided to try Fish, a bash alternative, so creating aliases with fish is not done the same way - they are know as functions in Fish.

Instead of adding them to a file, you create them on the command line, like so:

    alias x='exit'

Then, save it using this command:

    funcsave x

The functions are then saved in a folder: \~/.config/fish/functions/ - to see all the functions in a web based interface, type the following command:

    fish_config functions

I won't get too deep into Fish, as I'm still learning it - maybe a future post.

Did you find this useful? Have you got a your own set of aliases - please share them.
