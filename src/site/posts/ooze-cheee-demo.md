---
title: Ooze Cheee Demo
FontName: Chee
Creator: James Edmondson
Publisher: OH no Type Co
Characters: Latin (limited)
Release:
Licensing: Paid/Commercial
Download: Future Fonts
DownloadSource: https://www.futurefonts.xyz/ohno/cheee
demoType: video
css: css/ooze.css
videoSource: https://www.youtube-nocookie.com/embed/pas474Bh0iQ?rel=0&amp;controls=0&amp;showinfo=0
Codepen: https://codepen.io/mandymichael/pen/pxXNbr
developer: Mandy Michael
developerTwitter: Mandy_Kerr
featureColor: 1a2c02
featureColorReverse: c3ee2d
featureColorAccent: 89e220
date: 2019-09-10
description: Creating an oozing slimey text effect using Chee!
postTitle: Making slime text effects

---


{% block content %}
Chee is one of my favourite variable fonts to create fun demos with because it has a few really interesting axes. For this effect, I've used the `temp` axis which makes the font characters look like they are dripping.

This axis could be used for a whole bunch of different styles, slime, blood, icecream! It's a pretty versatile axis if you think a little creatively. So with that in mind, let's get started.

First I'll setup the foundations i.e. the html and css. In this case is a simple `h1` with some text in it, and the `font-family` set to Chee, and `font-variation-settings` property using the `temp` axis and an initial value of `0`, which happens to be it's minimum value.

``` html
<h1>Ooze</h1>
```

``` css
h1 {
    font-family: "Chee";
	font-variation-settings: "temp" 0;
}
```

### The Animation

To create the animation I used CSS keyframes to animate the "drip" effect! To keep it simple I've used a linear easing and run the animation infinitley.

I have also included an `animation-direction` of `alternate` so the animation will run back and forth between oozing and...not oozing.

``` css
@keyframes ooze {
	0% {
		font-variation-settings: "temp" 0;
	}
	100% {
		font-variation-settings: "temp" 1000;
	}
}

h1 {
    font-family: "Chee";
    font-variation-settings: "temp" 1000;
    animation: ooze 5s linear infinite alternate;
}
```

Having an animation just infinitely loop is not super exciting so I like to think about how we can trigger these effects with an interaction, sensor or other event on the page. For example, my personal favourite is making it ooze only in "dark mode" (because it's dark mode, and it's oozy slime..get it, haha).

The way we accomplish this is with a CSS transition and a media query. So rather than creating an animation keyframe we can set our "light mode" as a `temp` of `0`, and inside our media query we set `prefers-color-scheme: dark` and change our `font-variation-settings` `temp` axis value to 1000.

```css
h1 {
	font-family: "Chee Bleed";
    font-variation-settings: "temp" 0;
    transition: all 4s linear;
}

@media (prefers-color-scheme: dark) {
	h1 {
		font-variation-settings: "temp" 1000;
	}
}
```

With this code, when you switch between dark and light mode the text will transition between "oozing" and standard text. If you want to try this out, the <a href="https://codepen.io/mandymichael/pen/xQxvPG">code demo</a> is available on Codepen.

### Oozy CSS styles

In order to make it look slimey, there are really only two main css properties that accomplish the effect: `opacity` and `text-shadow`.

```css
opacity: 0.8;
text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2), 0px -5px 25px rgba(#3f6c12, 1);
```

The opacity makes the text look semi-translucent, kinda like jelly, or slime, but it's really the text shadows that do all the work here - they give the slime a bit of a shine and glow around the edges.

The second part is creating the layers, I'm accomplishing this using `pseudo-elements` but you can also do this with some `spans` and `aria-hidden`. The layers are used to give the effect some depth, the first is just to add some extra colour, and the second is to make use of another text shadow.

```css
	h1::before {
        ...
		z-index: -1;
		color: #7ebf28;
	}

	h1::after {
        ...
		z-index: 1;
		text-shadow: 2px 2px 5px rgba(#2a4308, 0.4);
    }
```

You can see the full implementation in the [Codepen]({{Codepen}}) example.

Have fun and make cool things.

Mandy

{% endblock %}
