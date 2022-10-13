---
project: alpine
title: Add Promise to $nextTick
git: github.com/alpinejs/alpine/pull/2841
---

To bring the functionality more inline with Vue's implementation of `$nextTick`, the magic returns a Promise that resolves when the callback is run.
