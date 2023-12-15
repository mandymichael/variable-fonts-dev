---
title: How to use a color font
date: '2023-12-01'
summary: Variable fonts were a game changer for fonts on the web, but you can take it a step further with the addition of the color font spec. Control both the font and the colours of the font truly enabling Photoshop like text effects with real text on the web.
tags:
    - color
    - article
    - howto
    - featured
featureFont: {
    font: Variable Color Initials, 
    author: Arthur Reinders Folmer,
    url: https://www.typearture.com/variable-color-font-initials/,
    publisher: Typeature,   
    image: /images/post-assets/color-font/jello-feature.jpg
}
card: {
    cardImage: /images/post-assets/color-font/jello-card.jpg,
    cardAlt: Jello "J" color font initial by Typearture,
     featured: /images/post-assets/color-font/jello-feature.jpg,
    cardFeaturedSummary: Where variable fonts added new axis to combine multiple font styles into the one file color fonts do a similar thing but with color.
}
---

Where variable fonts added new axis to combine multiple font styles into the one file color fonts do a similar thing but with color. Color fonts have been around in one form or another for a while but they haven't really picked up much traction, there have been a number of different specs for them and unfortunately not all of them are compatible with variable fonts. I don't like to take sides, but in my opinion not supporting variable fonts is a huge mistake for the color font spec. So today we'll look at some variable color fonts. (I may be a little biased)

Essentially Color Fonts allow font designers to merge multiple color layers into one font file and assign a color to each layer. They come with one or more colour palettes predetermined but developers can access and change these values through CSS using the `font-palette` property. 

[Support](https://caniuse.com/colr-v1) for variable color fonts is pretty good, you might find some discrepancies with rendering between the browsers, but they are still something you can start experimenting with now. Check out my latest list of cool colour fonts you can play with including some from Google Fonts [Color font list](/posts/color-font-list).

The reason I love Variable color fonts is that they make some of my original experiments in text effects completely obsolete. For me this demonstrates the growth and maturity of the platform and specs and also saves us a lot of time and effort.

There is a great short article called [A tiny guide to Variable Color Fonts
](https://www.typearture.com/howdotheywork/) by [Typearture](https://www.typearture.com/) that talks through how they are made and also has some great examples of what you can do with them outside of the "A-Z".

## How to use a colour font

Using a color font is very similar to how you would use a regular font. We set the fonts up the same way we usually do, using `@font-face`.

```css
@font-face {
    font-family: 'Color Font Name';
    src: url('color-font-file.woff');
}
```

If it's a variable font with mapped axis for things like weight width etc you can add in the different values in, e.g. see the font-weight definition below. 

```css
@font-face {
    font-family: 'Color Font Name';
    src: url('color-font-file.woff') format('woff-variations');
    font-weight: 200 900;
}
```
You can check out the [Getting started](/getting-started) page for more information on getting started with variable fonts specifically.

![Example of Rocher Color font in pink navy and yellow](/images/post-assets/color-font/rocher-color.jpg)

A good example of a color font is “Rocher Color”. It's an experimental variable color font featuring 2 axes (bevel and shadow) with 11 predefined colour palette options. 

To access one of the pre-defined palettes we can use the `font-palette` property and the `font-palette-values` function.

First we define the function. Rocher has a number of different palettes you can choose from. The font documentation will tell you what palettes are available.

```css

@font-palette-values --blue {
    base-palette: 7;
} 

h1 {
   font-family: Rocher;
   font-palette: --blue;
}

```

This will give you the blue palette defined within the font, it looks like the image below.

![Rocher color blue palette](/images/post-assets/color-font/rochercolor-bluepalette.jpg)

The following image show some of the included palettes for Rocher, but if you don’t like any of the included palettes you can also create your own. I highly recommend you visit the page for Rocher Color to see the animations available as part of the variable font axis.

<div className="videoPlayer">
<iframe width="1088" height="599" src="https://www.youtube-nocookie.com/embed/x2m_pZO6_w4?si=zq-7e0Lp2QgmA-7d?rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=x2m_pZO6_w4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</div>

The process is similar but you don’t need to define a base-palette, instead you set `override-colors` and define a colour for each of the options in the font, how many colours you have to set will vary between font, in this case we can set 4 colours.

We then use `font-palette` property exactly the same as the previous example.

```css
@font-palette-values --jello {
	override-colors:
      0 #94b95e,
      1 #eb1a7d,
      2 #5f0552,
      3 #f556d6;
}

h1 {
   font-family: Rocher;   
   font-palette: --jello;
}

```

This will give you the following colors for the font.

![Rocher color custom pink and green palette](/images/post-assets/color-font/rochercolor-custompalette.jpg)

If you  want to change one of the colors in a base palette you can do that as well by specifying the base palette and then overriding the one color you want to change. For example:

```css
@font-palette-values --jello {
    base-palette: 3;
	override-colors:
      3 #f556d6;
}

h1 {
   font-family: Rocher;   
   font-palette: --jello;
}

```

Like variable fonts, colour fonts expand the opportunities we have for working with text on the web. Right now there aren't a lot to choose from but the more we talk about them the more practical and creative applications we'll have access to. [Nabla](https://nabla.typearture.com/?_ga=2.129006923.699660361.1701400228-449230105.1700016798) (below) is a beautiful font demonstrating much of the capabilities and possibilities that variable color fonts provide.

![Nabla by Typeature](/images/post-assets/color-font/nabla.jpg)

Google fonts have a number of free color fonts available including [Reem](https://fonts.google.com/specimen/Reem+Kufi+Fun) which is inspired by Arabic calligraphy. It uses color gradients as an artistic interpretation of what the ink flow of traditional calligraphy would look like when written with a nib and ink. 

![Reem](/images/post-assets/color-font/reem.jpg)

There are also a lot of experiments in making more graphical typefaces like the following example from Typearture - [Variable Color initials](https://www.typearture.com/variable-color-font-initials/). This is actually my dog Jello in variable font form  which is the coolest thing to ever happen.

![Jello "J" Variable color initials by Typeature](/images/post-assets/color-font/jello.jpg)

Similarly Google has a font called [Noto color emoji](https://fonts.google.com/noto/specimen/Noto+Color+Emoji) available on Google Fonts can give us more options for working with and controlling emojis on the web. 

![Noto Emoji Font](/images/post-assets/color-font/noto.jpg)

New color fonts are available every day, and like variable fonts they present us with a lot of opportunities for displaying text on the web in creative, and impactful ways. Check out my latest list of colour fonts you can play with now, both paid and free [Color font list](/posts/color-font-list). You can also check out the color fonts available on [Google Fonts](https://fonts.google.com/?coloronly=true).