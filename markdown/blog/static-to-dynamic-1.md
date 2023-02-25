---
title: Observe and Orient
series: Static to Dynamic: Unlocking the Power of Reactivity
entry: 1
image: 
tags: vue, preact, typescript, angular, typescript
---

In this series of posts, I will take you on a journey from building static web pages to creating dynamic and reactive user interfaces. You will learn about how the frameworks you know, love, and hate all work on the inside and the decisions and trade-offs made to make them what they are today.  You will truly unlock the power of reactivity and build your own custom reactive frontend frameworks from scratch along the way.

Reactivity is a fundamental concept in modern web development. Users expect highly interactive and responsive applications that can automatically update the user interface in response to changes in the underlying data.

In this series, I will explore the challenges that arise when building state-driven UIs and how to build a custom reactive frontend framework from the ground up using TypeScript. I will start by covering the basics of reactivity and exploring the challenges that arise when building state-driven UIs with raw TypeScript. 
 
You'll learn about different paths to templating, rendering, state management, and, of course, the reactivity systems themselves.

By the end of this series, you will have a solid understanding of how reactive frontend frameworks work and how to build your own custom solution. You will also have gained valuable insights into the trade-offs involved in building these systems and be better equipped to make informed decisions when creating dynamic and responsive user interfaces that meet the demands of modern web development. So let's get started on this exciting journey to unlock the power of reactivity!

## What you should already know

As mentioned, this series is designed for intermediate level web developers who are already familiar with the basics of web development and have experience working with TypeScript. To get the most out of this course, you should have a solid understanding of:

-   TypeScript and Modern ECMAScript: Only going to be demoing modern code. Sorry.
-   Frontend Frameworks: You don't need to be an aficionado, but having an idea of what is out there, and some indepth knowledge in one is best.
-   Setting up your dev environment: This isn't a code along, so if you want to experiment as we go (recommended), you can setup your environment in the way you like

If you are not yet comfortable with these prerequisites, then this series won't be for you. This will help you get the most out of the material and ensure that you have a solid foundation for building custom reactive frontend frameworks.

> Note: In this, even code meant to emulate behaviors of the past will be written with some more modern practices that can often be missing in actual legacy code from the era, partly from new language and browser features, and partly because the average developer is better now than then.

## The Dark Days

Before the rise of modern frontend frameworks and reactive programming, building dynamic and interactive user interfaces for the web was a challenging and often tedious task. In the early days of increased interactivity, developers were forced to hand-write code to update specific elements on a page, a process that was both time-consuming and error-prone.

```ts
/** @typescript */

document.querySelector('button#quantity-inc')
	.addEventListener('click', (e) => {
		const quantity = document.querySelector('span#quantity')
		const price = document.querySelector('span#price')
		const val = Number(quantity.textContent) + 1
		quantity.textContent = val
		price.textContent = formatMoney(price.dataset.initial * val)
	})
```

Imperatively hooking up interactive buttons took quite a bit more code, and often required increasing the rigidity of the layout, making updates likely to break in ways difficult to correct for. False ideas of the strict separation of concerns made the dependencies between display and logic unclear in the best of times. This lead to bloat and loads of zombie code. If you can't easily tell what depends on what, removing or changing anything becomes a minefield. Easier to just leave everything in place and write new code to handle new circumstances.

As the web grew in popularity and complexity, the need for more sophisticated techniques for handling the UI became apparent. jQuery was one of the first libraries many might consider a 'framework', as it was most often a case of once you add some jQuery to the site, you kind of need to keep adding new things in jQuery. However, while jQuery made development easier by abstracting the differences between browsers and adding some features that JavaScript would later incorporate into the standard library, it did little to change the way developers actually built their UIs.

Developers still needed to craft specific listeners making specific updates for every action.

As web applications continued to grow in size and complexity, this became apparent. When many simple user actions could have a cascading effect on the UI, these handlers increased in complexity, requiring more updates across more code to implement simple changes. 

Just imagine the example above, but now that is in a cart page, where changing that one items quantity cascades to updating it's price, which updates the carts total price, which changes the taxes, which may cross a free shipping threshold or enable a promotional discount.

### Just Brute Force It

There followed a time that started to bridge into the ideas we commonly have now of declarative and reactive data-driven UIs. This was referred to as the "naive" or "brute force" approach to UI rendering. This essentially imitated what Server rendered sites do when data changes: Just rerender everything from nothing!

You would have data for the UI:

```ts
/** @typescript **/
const cartData = {
	items: [
		{
			id: 123,
			price: 1200,
			quantity: 2,
			name: 'Bill and Teds Excellent Adventure',
			image: 'https://placekitten.com/200/200',
			get linePrice() {
				return this.price * this.quantity
			}
		}
	],
	get subTotal() {
		return this.items.reduce((tot, item) => tot + item.linePrice, 0)
	},
	get taxes() {
		return this.subTotal * 0.08
	},
	get total() {
		return this.subTotal + this.taxes
	}
}
```

Then you would make a function to update the UI from data:

```ts
/** @typescript **/
function renderCart() {
	document.querySelector('#subtotal-price').textContent = cartData.subTotal
	document.querySelector('#taxes-price').textContent = cartData.taxes
	document.querySelector('#total-price').textContent = cartData.total

	const itemNodes = document.querySelectorAll('.cart-item')
	for (let i = 0; i < cartData.items.length || i < cartData.items.length; i++) {
		if (cartData.items[i] && !itemNodes[i]) {
			addNewItem(cartData.items[i]) // something that makes new item and appends it
			continue
		}
		if (!cartData.items[i] && itemNodes[i]) {
			itemNodes[i].remove()
			continue
		}
		updateNote(itemNodes[i], cartData.items[i]) // something that updates each card similar to above cart updates
	}
}
```

Then you would call it every time after making any changes. This did improve some aspects of the code, namely that you had centralized rendering logic, but it could be costly to walk through large datasets making updates in the DOM that didn't need to be made. Some systems for this even just created entirely new nodes from scratch and just replaced them entirely (saving the effort of writing branching code between generation and hydration).

It still required writing a lot of bespoke logic, and you could end up with templating information (about how to actually represent the data in HTML) in both the `html` files and your `js` scripts. In the above, would new cart items get rendered with html strings? `createElement`? or cloned templates? Everything was on the table, and you might even see mixtures across the application.

Then factor in that many sites were still using server rendering, with this code taking over interactivity in just a few places, and you might be writing rendering logic in many different places that need to be kept in sync.

### The Light Peeks Through

But there were some good ideas starting to show themselves. 

- We have a simple data structure as the source of truth,
- We have `getters` to allow for the use of derived values (updating a quantity automatically updates the price) though you will often find this kind of code not leveraging that at all,
- And we have a structure that somewhat resembles a modern component: data tightly coupled with rendering logic. 

In fact, many aspiring developers nowadays (likely you included) start to make things that look a bit similar to this pretty early in their learning, once they get to making their first (of many) todo apps.

