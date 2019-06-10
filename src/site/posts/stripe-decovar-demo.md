---
title: Stripe Decovar Demo
FontName: Decovar
Creator: David Berlow
Publisher: Font Bureau
Characters: Latin (limited)
Release: 2017-02-07
Licensing: Open source
Download: https://github.com/TypeNetwork/Decovar
DownloadSource: github
demoText: Hello
css: css/stripe-decovar.css
Codepen: https://codepen.io/mandymichael/pen/dJZQaz
developer: Mandy Michael
developerTwitter: Mandy_Kerr
featureColor: f5f5f5
featureColorReverse: 717171
featureColorAccent: ff0
date: 2019-05-08
---


{% block content %}
## Making the Grow Demo

Like all variable font effects this demo is only possible because {{ FontName }} contains the axis I need in order to create the "stripey" look.

What I love most about this demo is that it showcases something very specific about how effects applied with variable font axis vary to those applied with normal CSS or JS. What you can see in this example is that as the axis value is changed, the text shadow dissapears with the text. We are not just applying in effect to the text we are changing how the individual characters themselves are displayed, because of this, as the axis value changes the text shadow disapears with it.

To me this is a superb and beautiful demonstration of the exciting opportunities variable fonts present.

### The HTML

First up we create our HTML element, I'm using a `h1`, but it can be whatever semantic text element you need.

``` html
<h1>Hello</h1>
```

### The Initial CSS Setup

We start, like always with setting up the font with `@font-face` and adding some base styles to our `h1`.

``` css
@font-face {
	font-family: 'Decovar';
	src: url('/Decovar.woff2');
}

h1 {
	font-family: "Decovar";
	font-variation-settings: 'SSTR' 1000;
}
```

As we are using a custom axis we'll set up the `font-variation-settings` property and use the `SSTR` axis to create the stripy effect. The maximum value is 1000, because I want the demo to start stripy and end in one piece i'll start with 1000 as it's value.

### The Animation

Now we have our base setup we can create the animation. There are a number of ways to animate variable fonts, in this demo we'll use CSS keyframe animations using the `font-variation-settings`.

``` css
@keyframes stripe {
	0% {
		font-variation-settings: 'SSTR' 1000;
	}

	50% {
		font-variation-settings: 'SSTR' 0;
	}
}
```

Once we have created the keyframes we can add the animation to the `h1` element.

``` css
h1 {
	font-family: "Decovar";
	font-variation-settings: 'INLN' 1000, 'SWRM' 1000;
    animation: stripe 4s linear infinite;
}
```

### The Shadow

With the animation complete, we can add the shadow to make it look extra special. The `text-shadow` on this effect can look quite intimidating but I can assure you it's not as complex as it looks.

``` css
    text-shadow:
		-1px -1px 0 rgba(255, 255, 255, .7),
		1px -1px 0 rgba(255, 255, 255, .7),
		-1px 1px 0 rgba(255, 255, 255, .7),
		1px 1px 0 rgba(255, 255, 255, .7),
		-1px 2px 1px #a0a0a0,
		-2px 4px 2px #a0a0a0,
		-3px 6px 3px rgba(#a0a0a0, 0.6),
		-4px 8px 4px rgba(#a0a0a0, 0.5),
		-5px 10px 5px rgba(#a0a0a0, 0.4),
		-6px 12px 6px rgba(#a0a0a0, 0.3),
		-7px 13px 7px rgba(#a0a0a0, 0.2),
		-8px 15px 8px rgba(#a0a0a0, 0.2),
		-9px 17px 9px rgba(#a0a0a0, 0.2),
		-10px 19px 10px rgba(#a0a0a0, 0.2),
		-11px 20px 11px rgba(#a0a0a0, 0.1),
		-12px 22px 12px rgba(#a0a0a0, 0.1),
		-13px 24px 13px rgba(#a0a0a0, 0.1),
		-14px 26px 14px rgba(#a0a0a0, 0.1),
		-15px 28px 15px rgba(#a0a0a0, 0.1),
		-16px 30px 16px rgba(#a0a0a0, 0.1),
		-17px 32px 17px rgba(#a0a0a0, 0.1),
		-18px 34px 18px rgba(#a0a0a0, 0.1),
		-19px 36px 19px rgba(#a0a0a0, 0.1),
		-20px 38px 20px rgba(#a0a0a0, 0.1),
		-21px 39px 21px rgba(#a0a0a0, 0.1);
```

The main texture comes from the extra layer I mentioned earlier, which we will create using a pseudo-element. Making the most of the CSS attribute function we can pass the data from our data-attribute into the content property of the pseudo-element.

Once we have the new layer we can position it over the top of the `h1` and start to add some texture. As I wanted this to look kind of like a hedge, I added a grass background image, and made use of the `background-clip` property to clip the background to the text area. I can then add the `-webkit-text-fill-color` property to remove the fill from the text revealing our grass image below.

You can change the background-repeat and background-size to suit the image you are using and if you like add an additional text shadow to emphasize the layers.

``` css
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

These are all the elements we need in order to create the effect. Most of the hard work is done by the font itself!

Have fun and enjoy!

Mandy
{% endblock %}
