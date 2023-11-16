---
title: How to use a color font
date: '2023-11-16'
summary: Variable fonts were a game changer for fonts on the web, but you can take it a step further with the addition of the color font spec. Control both the font and the colours of the font truly enabling Photoshop like text effects with real text on the web.
tags:
    - color
    - weird
    - fun
    - list
featureFont: {
    font: Irregardless, 
    author: James Edmondson,
    license: Paid/Commercial,
    url: https://ohnotype.co/fonts/irregardless,
    publisher: OH no Type Co,   
    image: /images/post-assets/Image.png
}
card: {
    cardImage: /images/post-assets/cards/mixed-width.jpg,
    cardAlt: Bandeins Strange Font showing mixed width character B being stretched wider than the a and c characters
}
lastUpdated: '2023-11-06'
---

Where variable fonts added new axis to combine multiple font styles into the one file color fonts do a similar thing but with color. Color fonts have been around in one form or another for a while but they haven't really picked up much traction, there have been a number of different specs for them and only one of those work with variable fonts. 

Essentially they allow font designers to merge multiple color layers into one font file and assign a color to each layer. They come with one or more colour palettes predetermined but developers can access and change these values through CSS using the `font-palette` property. 

[Support](https://caniuse.com/colr-v1) for variable color fonts is pretty good, you might find some discrepancies with rendering between the browsers, but they are still something you can use now with minimal issues. Check out my post on [How to use colour variable fonts](/posts/how-to-use-color-variable-fonts) for more information on the technical usage with CSS.

The reason I love Variable color fonts is that they make some of my original experiments in text effects completely obsolete. For me this demonstrates the growth and maturity of the platform and specs and also saves us a lot of time and effort.

There is a great short article called [A tiny guide to Variable Color Fonts
](https://www.typearture.com/howdotheywork/) by [Typearture](https://www.typearture.com/) that talks through how they are made and also has some great examples of what you can do with them outside of the "A-Z".

## How to use a colour font

Using a color font is 