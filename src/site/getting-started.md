---
title: Getting Started
layout: layouts/info.njk
---

## Basics of Variable Fonts
There are a few basic things that will be common for all examples. For a more in-depth guide on Variable fonts i'd highly recommend reading the [Variable Fonts Guide on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide).

### Using Font Face
For the most part we set the fonts up the same way we do now, using `@font-face`.

``` css
@font-face {
    font-family: "Source Sans Variable";
    src: url("source-sans-variable.woff") format("woff-variations");
    font-weight: 200 900;
}
```

The main change is to how we define the variations for descriptors like `font-weight`, `font-stretch` and `font-style`.

Previously we would have set `font-weight: 200` and defined this as our light version. Then we'd set up another `@font-face` block for the bold version. With a variable font we can do this all as one block and set the range to whatever weight range we want to access.

In the above example, Source Sans Variable has a font weight range of 200 to 900 so we set a font weight range of 200 to 700. This gives us access to the full range of values along the axis from 200 to 700.

### The CSS

``` css
h1 {
    font-family: "Source Sans Variable";
    font-weight: 658;
}
```

Once we have set up the `@font-face` block we can reference it the same way we normally would in our CSS - but because we’ve defined a range of weights we can set the value to whatever number we want between 200 and 700. So for example 658.

This is great for styles like `weight`, because we already have a CSS property that we can use.

This is known as a registered axis, all this means is that it's been standardised in the spec. There five registered axes at the moment, weight, width, slant, italic, and optical size and they are all mapped to pre-existing css properties - font-weight, font-stretch, font-style (italic and slant/oblique), font-optical-size, respectively.

However if we want to use a custom Axis that does not have a mapped property, we need a new CSS property.

``` css
h1 {
    font-family: "My Variable Font";
    font-variation-settings: 'jelo' 88, 'felo' 203;
}
```

That CSS property is called `font-variation-settings` and it enables us to define as many registered and custom axis as we need.

In the above example, we have two custom axes - each referencing by a four character string and an associated number value.

Custom axis codes are determined by the font creator, whereas a the codes for a registered axis are defined in the spec.

You can use a registered axis in the `font-variation-settings` property but it’s strongly recommended that you use their mapped CSS properties (like the `font-weight` property) instead. (This makes it easier to manager your typography in the codebase anyway, so I'd definately recommend it).

### Unsupported Browsers

Variable Fonts have pretty good support across the modern browsers, you can see the most up to date stats on [Can I Use](https://caniuse.com/#search=variable%20fonts). However, if you are worried about unsupported browsers we can use fallback fonts by making use of CSS feature detection.

```css
h1 {
    font-family: "Source Sans", sans-serif;
    font-weight: 700;
}

@supports (font-variation-settings: normal) {
    h1 {
        font-family: "Source Sans Variable";
        font-weight: 675;
    }
}
```

We can check for `font-variation-settings` support and add our variable font styles inside the css block, with our standard fonts used in the unsupported browsers.

### Using JavaScript

JavaScript will allow us to access different browser and web api's to manipulate the font axis. We can start to design our typography to adjust to things like screen width, the gyroscope, light sensors, scroll position, mouse position and more.


Using a straightforward example, let’s say we wanted to match our font weight to the size of our viewport - as the viewport gets smaller the font weight gets heavier.

The problem with this is that we might have a font weight range of say 200 to 900 and a viewport size range of 320px to 1440px.

We need to align these two sets of values, which are not only different ranges, but also different measurements. As a result we need to re-adjust the scales into something more usable.

Let's get started using this example. First we need the current viewport width, which we can access with something like `window.innerWidth`

```js
const windowWidth = window.innerWidth
```

Then we create the new scale for the viewport, so rather than the pixels values we need to convert it to a range of 0 - 0.99.

We do this by taking the current `windowWidth - minWindowSize` and divide that by the `maxWindowSize - minWindowSize`.

This will output a value from 0 - 0.99 which we can use in our calculations.

```js
const windowSize = (currentSize - minSize) / (maxSize - minSize)
// Outputs a value from 0 - 0.99 including decimal places
```

We can then take that new viewport decimal value and use that to determine the font weight based on the window size.

```js
const fontWeight = windowSize * (minWeight - maxWeight) + maxWeight;
// Outputs a value from 200 - 900 including decimal places
// For example: 0.66 * ( 200 - 900) + 900
```

Once we have that value we can make use of CSS Custom Properties to update the value of our weight axis in the `font-weight` property in the CSS. If you were using a custom axis, you would update the value in the `font-variation-settings` property.

```js
p.style.setProperty("--weight", fontWeight);
```

Putting it all together into a function we can check for the window resize event and update whenever needed.

In it’s simplest form, this will give us our fluid variation attached to viewport width.

```js
function fluidAxisVariation() {
  // Current viewport width
  const windowWidth = window.innerWidth

  // Get new scales for viewport and font weight
  const viewportScale = (windowWidth - 320) / (1440 - 320);
  const fontWeightScale = viewportScale * (200 - 900) + 900;

  // Set in CSS using CSS Custom Property
  element.style.setProperty("--weight", fontWeightScale);
}

window.addEventListener("resize", fluidAxisVariation);
```

This code can be used to change any axis, once you have it, you simply pass different event values to create all sorts of interactive effects. Some examples include [Ambient Light Sensor Demo](/posts/light-sensor-demo).