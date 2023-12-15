---
title: Using Clamp with Variable fonts
date: '2023-12-03'
summary: 'TODO'
tags:
    - article
    - howto
    - fluid
featureFont: {
    font: Fira Code, 
    author: The Mozilla Foundation, Telefonica S.A., Nikita Prokopov, Stephen Nixon,
    license: Open source,
    url:  https://fonts.google.com/specimen/Fira+Code?selection.family=Fira+Code,
    publisher: Nikita Prokopov, also available on Google Fonts,   
    image: /images/post-assets/fira-code.png,
    featureAlt: Fira Code in different weights on a pink background,
}
card: {
    cardImage: /images/post-assets/cards/fira-code.jpg,
    cardAlt: Fira Code at different sizes
}
---

When variable fonts were first released if you wanted to do any scaling or resizing based on the browser viewport you were required to use a little bit of JavaScript to handle the linear interpolation. You'll notice that some of my earlier demos and articles will utilise a JavaScript function that handles this.

But since then the browsers have added support for the CSS property `clamp()`. When using `clamp()` with font sizes (for example) it allows you to set a font-size that will grow with the size of the viewport and works in a similar way to the traditional approaches to fluid typography. 

The clamp function clamps a middle value within a range of values between a defined min and max. The function takes three parameters: a minimum value, a preferred value, and a maximum allowed value.



```css
clamp(minimum, preferred, maximum);
```

The value it returns will be the preferred value, until that preferred value is lower than the minimum value (at which point the minimum value will be returned) or higher than the maximum value (at which point the maximum will be returned).

Unless you are doing weird min and max values this means that the preferred value will almost always be used, so if you want something that scales, then you need to do a calculation to accomplish the linear interpolation (to get the values between the two points).

So to accomplish this, we take a very similar approach to how we handle it in JavaScript.

## The Calculations

### Step 1, the ranges

In order to do the calculations we need we have to specify 4 values.
- Minimum font size
- Maximum font size
- Minimum viewport width
- Maximum viewport width 

### Step 2, the conversion

For the purpose of this example we need to convert the widths to rem and assume the default font size of 16px. You can use a [online calculator](https://codebeautify.org/px-to-em-converter) to do the conversion. We'll also set the font sizes to 1rem and 4rem. 

- Minimum font size: 1rem (16px)
- Maximum font size: 4rem (64px)
- Minimum viewport width: 22.5rem (360px)
- Maximum viewport width: 80rem (1280px)

### Step 3, the math part

So next up we need to do the math. If you've read the [Getting Started](/getting-started) page this will look somewhat familiar. 

First we need the scale, and then we can determine the size calculation. it will be like the example below.

```math 
scale = (maxFontSize - minFontSize) / (maxWidth - minWidth)
size = -minWidth * scale + minFontSize
```
To do this as actual CSS though we can make use of CSS custom properties. We'll need our font sizes and viewport sizes without units, and then converted to rem units as well. This does look a bit complicated but its not as bad as it looks.

```css
    --minFontSize: 1;
    --maxFontSize: 4;
    --minViewport: 22.5;
    --maxViewport: 80;

    --minFontSizeRem: var(--minFontSize) * 1rem;
    --maxFontSizeRem: var(--maxFontSize) * 1rem;
    --minViewportRem: var(--minViewport) * 1rem;

    --scale: (var(--maxFontSize) - var(--minFontSize)) * (100vw - var(--minViewportRem)) / (var(--maxViewport) - var(--minViewport));

    h1 {
    font-size: clamp(var(--minFontSizeRem), var(--minFontSizeRem) + var(--scale), var(--maxFontSizeRem));
    }
```

A main difference between the math example and the implementation is that we add in a vw unit in the scale calculation. This allows us to convert the numbers to the viewport width.

```math
    (100vw - var(--minViewportRem)) / (var(--maxViewport) - var(--minViewport))
```

This would convert to something like

```math
 (100vw - 22.5rem) / (80 - 22.5)

```

All up the css would calculate to the following numbers (which is definitely not as scary as the above code looks)

```css
--scale: (4 - 1) * (100vw - 22.5rem) / (80 - 22.5);

h1 {
 font-size: clamp(1rem, 1rem + var(--scale), 4rem);
}
```

That will complete the fluid typography, you can check out the code on codepen, in the pen below.

<div class="codepen"><div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="Scrolling variable font effect change" src="//codepen.io/mandymichael/embed/OJdBOxE/?height=300&theme-id=dark&default-tab=result" frameBorder="no" allowfullscreen="true"></iframe></div></div>

Once you have this formula set you can use it for all sorts of things, for example you can tie it to an axis instead of font size. One thing to note here is 