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
