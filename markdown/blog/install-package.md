---
title: No, you shouldn't install that package
tags: npm
---

Building new apps from bundled bricks of code others have written is practically a ritual at this point. Many of our apps are built "On the shoulders of giants" as they say.

And, for great reason: having portions of our code maintained and analyzed by many more devs can provide a quality coverage our organizations couldn't even hope to. Pooling these resources from many specialized individuals can allow us to ship apps, libraries, and side projects at an accelerated pace.

The problem really happens when new developers reach for packages instead of actually learning what they are doing.

## Learn How To Do It Yourself!!!

If you're getting started in the world of web dev and you need to compare two dates, why reach for `moment` or `date-fns` when you can spend the few minutes to learn how to do it with the native `Date` class?

These extra packages can often be huge, and many older ones are not setup to be tree-shakable (just making a data with `moment` adds 45kb to your bundle), and you're robbing yourself really seeing what is happening underneath!

When you understand the limitations and behavior of all the native APIs, then you can better evaluate where a package actually brings you benefits.

`axios` is a very common library for making http requests, but it rarely saves you any effort over just using the native `fetch` apis. You mostly end up writing the same code just to give up control (and add another useless 15kb to your bundle).

While these packages can make certain things much easier, it's rare that you'll really be using them to their full potential to make the trade-offs worth while.

## Knowing How, not just What

Of course, most are taught to try to make sites with vanilla DOM manipulations before jumping into more full-feature reactive frameworks like `preact` or `solid`, but for some reason the advice  regarding using libraries often ends there.

The moment any minor trouble appears, it's "just install axios/moment/whatever".

A major benefit of doing it with the native APIs first is to help draw a distinction between what is the languages behaviors and what is the libraries behavior.

Many people starting with `preact` come in asking questions about their `preact` issue, just for it to be a basic `javascript` issue that they've misrecognized.

The lack of experience makes it so they can't even tell where the issue comes from, or why it may exist.

And when taking up using a package, you'll have a much better understanding of what the package does, and how to use it appropriately.