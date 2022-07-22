---
project: alpine
title: Add Promise to $nextTick
git: github.com/alpinejs/alpine/pull/2841
---

To bring the functionality more inline with [Vue's implementation](https://v2.vuejs.org/v2/api/?redirect=true#Vue-nextTick) of `$nextTick`, the magic returns a Promise that resolves when the callback is run.