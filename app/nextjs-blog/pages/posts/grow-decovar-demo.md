---
title: Growing text demo featuring Decovar
date: '2019-06-11'
summary: My first and most famous variable font text effect demo, the one I am most proud of, this demo was the inspiration for  everything I have done with variable fonts.
tags:
    - effect
    - creative
    - weird
    - demo
    - article
featureFont: {
    font: Decovar, 
    author:  David Berlow,
    license: Open Source,
    url: https://github.com/TypeNetwork/Decovar,
    publisher: Font Bureau,   
    video: https://www.youtube-nocookie.com/embed/2rlTHzK4uKg?rel=0&amp;controls=0&amp;showinfo=0"
}
card: {
    cardImage: /images/post-assets/cards/grass.jpg,
    cardAlt: Decovar font demonstrating a growing leaf effect
}
demo: {
    url: https://codepen.io/mandymichael/pen/YYaWop,
    authorUrl: http://mandy.dev,
    author: Mandy Michael,
}
---

This was the first demos I created, it was what inspired my journey into variable fonts and it will forever hold a special place in my heart. My goal was to create a text effect that made it look like the text was "growing" without the need for SVG or canvas. I used the text "Grass" instead of "Grow" in the original demo for some unknown reason, oops! 

Like all variable font effects this demo is only possible because Decovar contains the axis I need in order to create the "leafy" look.

### The HTML

The basic animation with the variable font only requires one copy of the text, but in order to create the texture we are going to need an additional copy.

First up we create our HTML element, I'm using a `h1`, but it can be whatever semantic text element you need.

```html
<h1 data-text="Grow">Grow</h1>
```

In this example I've included a `data-attribute` that will allow me to create a copy of the text to use as a new layer in my CSS.

### The Initial CSS Setup

Now for the fun part! We'll set the base variable font effect up first.

```css
h1 {
    font-family: 'Decovar';
    font-variation-settings: 'INLN' 1000, 'SWRM' 1000;
}
```

For this effect I'm using two custom axis, the first is called "Inline" and is represented by the code `INLI` and the second is "Skeleton Worm" represented by the code `SWRM`. Each having their own associated number value representing a point along the axis.

For both Inline and Skeleton Worm the maximum value is `1000` and the minimum value is `0`, for the purposes of this demo we'll start at the maximum values.

### The Animation

Now we have our base setup we can create the animation. There are a number of ways to animate variable fonts, in this demo we'll use CSS keyframe animations using the `font-variation-settings`.

The code below will start with the "leaves" expanded, shrink back into the font and then expand again.

```css
@keyframes grow {
    0% {
        font-variation-settings: 'INLN' 1000, 'SWRM' 1000;
    }

    50% {
        font-variation-settings: 'INLN' 1000, 'SWRM' 0;
    }
}
```

Once we have created the keyframes we can add the animation to the `h1` element.

```css
h1 {
    font-family: 'Decovar';
    font-variation-settings: 'INLN' 1000, 'SWRM' 1000;
    animation: grow 4s linear infinite;
}
```

### The texture

With the animation complete, we can add some texture to make it look extra special.

I usually start by adding a text shadow, which will give the font a bit of depth, you can make your shadows as simple or complex as you need, in this example i've created an outline all the way around the characters and then a darker more opaque shadow with a wider spread.

```css
text-shadow: 1px 1px 2px rgba(#2a4308, 0.5), -1px 1px 2px rgba(#2a4308, 0.5),
    -1px -1px 2px rgba(#2a4308, 0.5), 1px -1px 2px rgba(#2a4308, 0.5),
    3px 3px 20px rgba(#000, 0.5);
```

The main texture comes from the extra layer I mentioned earlier, which we will create using a pseudo-element. Making the most of the CSS attribute function we can pass the data from our data-attribute into the content property of the pseudo-element.

Once we have the new layer we can position it over the top of the `h1` and start to add some texture. As I wanted this to look kind of like a hedge, I added a grass background image, and made use of the `background-clip` property to clip the background to the text area. I can then add the `-webkit-text-fill-color` property to remove the fill from the text revealing our grass image below.

You can change the background-repeat and background-size to suit the image you are using and if you like add an additional text shadow to emphasize the layers.

```css
h1::before {
    content: attr(data-text);
    position: absolute;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: url(/images/grass-bg.jpg);
    background-size: 56%;
    background-repeat: repeat;
    text-shadow: 2px 2px 5px rgba(#2a4308, 0.4);
}
```

These are all the elements we need in order to create the effect as you can see most of the hard work is done by the font itself so be sure to thank your Type Designers by buying their fonts!

Extra special thanks to David Barlow for inspiring my variable fonts journey, I will never forget Decovar and the fun i've had with it!