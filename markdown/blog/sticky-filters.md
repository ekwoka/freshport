---
title: Making a Multi-directional Sticky Filters Panel
tags: shopify, alpine
---

Recently, I was working with a client on implementing quite a few different components on an ecommerce site with AlpineJS and Tailwind. I actually found them on Discord, where they were attempting to find a solution for a bit of a tricky problem, which I was helping them solve. I ended up just being hired to get it, and many others done.

What they wanted was a sticky filters panel to be on the side of a product list. Pretty common, but they really wanted a great UX related to it, which introduced a few things that dramatically increased the complexity of the implementation.

This article will take you through a focussed down version of my process for tackling this problem.

## The Requirements

At first, the requirements almost seem too simple: A sticky panel. How could that take much time? But now consider the following:

- The panel is of variable height (it has accordians inside it)
- The panel can contain so many filter options that the panel itself goes beyond the height of the screen
- The panel should not require the user to scroll all the way up or down to reveal more filter options

Maybe you have some ideas of how to solve it (hopefully none more effective than mine 🤞).

