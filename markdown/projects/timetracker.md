---
repo: github.com/ekwoka/time-tracker
images: timetracker.png
core: solidjs, tauri
tools: vite, typescript, rust, tailwind
title: Time Tracker Desktop App
---

Unhappy with the quality of various time trackers and finding a constant situation of each different app having some factors I love, and others I hate. I'm setting out to make one that works for exactly what I need it for: Tracking time across different clients and tasks that allows easy export for invoicing.

Of course, why do any side project without using the most bleeding edge technologies? So this is made with Tauri + Solidjs with TypeScript and Rust.

Tauri uses the devices native webview (as opposed to bundling a browser) allowing for smaller application size, rendering a frontend in the webview and connecting it to a runtime powered by Rust to handle interfacing with the OS and file systems.

Here I use Solidjs to power the front end, for it's many benefits and performance characteristics, and because it's the hot thing (at the time of writing).
