---
title: Taking Alpine from Good to Great
image: 
tags: alpine, typescript, vitest
---

[Alpine.js](https://alpinejs.dev/) is a quite powerful and simple system for spicing up HTML with framework-like interactivity that has become quite popular, specifically for sites that use non-javascript rendering pipelines. For example: hand crafted HTML, Shopify Liquid, or Django.

The secret to Alpine's success in these contexts is owed to the framework-like syntax and it's presence with large amounts of logic written directly into the markup. You might even recognize a lot of the syntax from Vue which was a major inspiration for Alpine (and the driver behind the powerful reactivity engine).

```html
/** @html */

<div x-data="{ open: false }">
	<button @click="open = true">Expand</button>
	<span x-show="open">
		Content...
	</span>
</div>
```

It's quite easy to pickup and understand what is going on even when diving into Alpine components you have never seen before.

It's really no wonder that Alpine has found a lot of use in everything from ecommerce and fintech to [Harvard Medical](https://www.health.harvard.edu/) and [the Monaco Government](https://monservicepublic.gouv.mc/en).

## My Journey

I have a definite sweet spot for Alpine.js. It was really my introduction into web development as a serious persuit.

I was working as a UX consultant, and, out of frustration from working with slow off-shore engineers, started getting into doing the dev work myself.

This was in Shopify, so it had the Liquid rendering engine (similar to Django Templates or Jinja). Most of the clients I was managing had themes that were packed full of eratic jQuery and somehow even more eratic BEM style CSS.

Maybe those things work okay for people that have been steeped in them for some time, but as someone new to this, I just couldn't help but feel like there was a better way. I shouldn't need to jump around between 3 files (or even more!) just to figure out what the hell is going on. Above all, it was extemely unclear what was causing logic to happen.

Most of the jQuery had little standard for how it attached events onto different elements, so it was pretty close to impossible to tell how changing something about the layout would break the functionality. It was a nightmare.

In trying to find out if this was normal and okay, I stumbled upon both Alpine and Taiwlind. It was a godsend. Now my Liquid components could be pretty much a single file. I could hop into a file representing a component, and just by looking at the templating, I could see what it does, and understand how it looks at a glance. I could make changes with confidence knowing where and how interactivity was attached.

This really fostered my transition into Web Dev as a full time profession. Most of the money I have made freelancing has been from clients needing an expert in Alpine and it doesn't seem like it's going to flip any time soon.

While I would generally recommend a full TypeScript framework for anyone making new projects today (the DX of everything in TypeScript is just unmatched), Alpine is absolutely the thing I recommend for handling frontend interactivity and reactivity when the rendering does not come from JavaScript. It's definitely won me over with the powerful simplicity it offers. 

## The Problems

While Alpine is a fantastic tool, and pretty well rooted as the best choice in it's niche, it isn't exactly winning any awards for it's size, performance, or memory cost.

When compared against just about every other framework at it's level of popularity, it's slower at just about everything. Alpine is smaller as a payload than some of the more bloated competition, but there are also much smaller competitors that pack even more capabilities into a smaller package. And to top it off, Alpine also uses more memory than all the competitors (most of the time).

I don't think this is inherent to Alpine's approach to the problems it solves. While Caleb Porzio, the madman behind Alpine and Livewire, is a very talented developer (especially in PHP), he's not exactly a JavaScript crackhead. I think there are some places where simple changes can be made for major benefits. I could be wrong though. I've been in this game for way less time.

So my goal with this project is to make Alpine truly competitive, from DX (for consumers and contributors) to raw performance and size and document the insights from the process.

## Initial Improvements

I felt, while making my many PRs to Alpine, that there were fundamental aspects of the DX in the repo that made it more difficult to develop for than was necessary. Namely: No Typescript, and Slow Tests.

### First Class Types

Alpine has no types. There is a user created `definitely-typed` package, but it's not often updated, and is simplistic at best.

Many may argue that how Alpine is most often used doesn't inherently benefit from types, and I'd mostly agree. The experience of using Alpine in a TS project isn't that bad, but it's basically a lot of implicit any, or needing to use `as` a lot. You basically don't get much help from the type checking. Add to that how much of the actual use of the component is in attributes in the DOM, maybe types aren't that important beyond the basics.

With all this in mind, I contest that the main benefit of having the project in TypeScript is to the development of Alpine itself. As it stands, Alpine leans heavily on function signatures with lots of optional arguments of multiple types. This can create a lot of issues in making improvements to the framework, since it is often not clear what any of the arguments may be, especially as an argument moves through multiple functions (across multiple files) from creation to definitive use.

Converting the project to typescript can improve this experience and enable more atomic refactorings with far more certainty about the effectiveness of the changes.

So the first step was to do just this. Get a TS based dev environment set up, and work to slowly convert every file over, attempting to get everything to being strictly typed. This took a while, and there were more than a few times where a type I thought was correct initially turned out to be too limited, due to the aforementioned issues of clarity in the type flow.

Along the way, I did some minor style refactorings and managed to actually cut down about 500kb from the minzipped package! Not even major changes. Smaller packages, with more safety.

### Enter Vitest

The main Alpine repo uses Cypress for all testing. So everything is e2e in the browser. If you've ever worked with Cypress, it is slow. The test suite for Alpine can take over 20 minutes to run. Even when you do have it only run single test files it can be nearly a minute to get any feedback.

Doing real in-browser tests with Cypress is great for a validation, but pretty awful for doing refactorings and updates. It's just too slow.

20 minutes for about 180 tests just won't cut it. Preact does 1000 tests in less than a second. They don't even need fancy dependency tracking on the tests, since just running everything is so fast!

To solve this, of course we gotta do Vitest with Happy-DOM. With this, we can have tests that complete very quickly, and properly track the dependencies of which files are run during different tests.

> Note: This was not exactly a painless process. I had to build a fairly complicated (and surprisingly functional) way to have the tests use the actual Alpine source files (with all the DOM apis)  in isolation, and I found many bugs in Happy-DOM and places where aspects of the spec were missing from the Happy-DOM implementation.
> 
> Opened many PRs to Happy-DOM that got merged, but also utilized a package locally that could patch my fixes into Happy-DOM in the meantime.

After writing all of the tests for Alpine into Vitest, tests take from 3 - 7 seconds for over 200 tests. This allows very quick feedback as to what, if anything, has broken. Fast enough to have running as you code to get instant feedback on every save.

Along the way, I did find a few places where the original tests were wrong (described themselves as testing one thing when they actually tested something else, etc) and incomplete (where a behavior was not being tested for). That's more PRs to Alpine upstream to solve.

Cypress will likely be worked in at a later date, but instead of fairly isolated tests, it would be a limited number of much larger tests emulating real applications, and would not be used in pre-commits, but only in PR testing.

## Benchmarking

Of course, moving in to more significant optimizations, we need to get a baseline. 