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
Chee is one of my favourite variable fonts to create fun demos with because it has a few really interesting axes. For this effect, we make use of the "Temp" axis which makes the font characters look like they are dripping. This axis could be used for a whole bunch of different styles, slime, blood, water drops, icecream! It's a pretty versatile axis if you are willing to get creative with it.

Like our other examples we set up base html and css.

``` html
<h1>Ooze</h1>
```

``` css
h1 {
    font-family: "Chee";
	font-variation-settings: "temp" 1000;
}
```

### The Animation

For this example we'll use CSS keyframes to create the animation and transition it from no dripping to full drip mode! To keep it simple i've used a linear easing and run the animation infinitley.

I have also included an `animation-direction` of alternate so the animation will run back and forth between oozing and...not oozing.

``` css
@keyframes ooze {
	0% {
		font-variation-settings: "temp" 0;
	}
	50% {
		font-variation-settings: "temp" 1000;
	}
}

h1 {
    animation: ooze 10s linear infinite alternate;
    font-family: "Chee";
	font-variation-settings: "temp" 1000;
}
```

Having an animation just infinitely loop is not super exciting so I like to think about how we can trigger these effects with an interaction, sensor or other event on the page. For example, my personal favourite is making it ooze only in "dark mode" (because it's dark mode, and it's oozy slime..get it, haha).

The way we accomplish this is with a CSS transition and a media query. So rather than creating an animation keyframe we can set our "light mode" as a `temp` of 0, and inside our media query we set `prefers-color-scheme: dark` and change our `font-variation-settings` `temp` value to 1000.

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

Have fun and make cool things.

Mandy

{% endblock %}
