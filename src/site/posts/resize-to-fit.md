---
title: Resize to fit
FontName: Barlow
Creator: Jeremy Tribby
Publisher: Tribby Type Co.
Characters: Latin
Release:
Licensing: Open source
Download: Github
DownloadSource: https://github.com/jpt/barlow
demoText: CSS is Awesome
demoType: standard
demoId: resize-to-fit
# demoAttribute: resize-to-fit
css: css/resize-to-fit.css
Codepen: https://codepen.io/mandymichael/pen/NWqaNJL
developer: Mandy Michael
developerTwitter: Mandy_Kerr
featureColor: 171515
featureColorAccent: 000000
featureColorReverse: ffffff
date: 2020-03-06
description: Adjust the width of your text to fit it's parent container using a variable font width axis 
postTitle: Resize text to fit the parent with variable font width axis

---

{% block content %}

One of the most exciting things for me about variable fonts is that their flexibility opens up an opportunity to create more responsive designs and components.

There are a number of ways you can have text resize to fit its parent container, but it's been largely limited to adjusting the font size. The problem with this approach is that making the font smaller is not always the best option for our designs.

With variable fonts that contain a width axis, we can adjust the `font-stretch` property with CSS to condense the font. When we combine this with `font-size` as well we can create more flexible response text on the web. For our example, we are using [Barlow]({{FontName}}) which has a width axis with a range of 300% to 500%. 

<iframe width="1280" height="720" src="https://www.youtube.com/watch?v=C7zHUz54Mg8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The Code

You can either check out the [Codepen]({{Codepen}}) now, or you can read on to get a breakdown.

To accomplish this we need a few things, firstly the width of the parent container and secondly, we will use `scrollWidth` to measure the width of our text.

``` js
	const parentContainerWidth = text.parentNode.clientWidth;
    const currentTextWidth = text.scrollWidth;
```

Once we have these we also need to determine what the current `font-stretch` value is so we can update it as the parent changes. One way to do this is to use `getComputedStyle`.

``` js
	const currentFontStretch = parseInt(window.getComputedStyle(text).fontStretch);
```

Finally, we can use these values to determine the new `font-stretch` value. `Math.min` and `Math.max` are really useful in this case because I don't want to extend past the available axis range for the font. 

``` js
	const newValue = Math.min(Math.max(300, (parentContainerWidth / currentTextWidth) * currentFontStretch), 500)
```

If we break this down, let's say our parent container is 300px wide, our text is 150px wide and out current font-stretch value is at the starting value of 300%. If we divide the parent by the child we'd have a value of 2, which we then multiply by the current `font-stretch` of 300, giving us a value of 600 e.g.  `Math.max(300, 600)`. Because `Math.max` will return the highest value we'll take 600, leaving us with `Math.min(600, 500)`, in this case we want the minimum value (our maximum font-stretch) so the final value will be 500.

This will ensure that our font-stretch value matches the width of our container, within the constraints of the available values. 

Finally we can use CSS custom properties to update our `font-stretch` value in our CSS leaving us with the final effect.

``` js
	text.style.setProperty('--fontStretch', newValue + '%');
```

In order to update in real time, for my Codepen example I used the `resizeObserver` to detect changes to the box div around my text and then i'd run a function called `calcWidth` which container the above code each time a change was detected.

`new ResizeObserver(calcWidth).observe(box);`


## Bonus

While I was working on this I wanted a quick way to resize a div for the demo, I procrastinated a lot on it because I thought i'd have to write a bunch of code. Turns out, Chris Coyier had a great CSS only suggestion! `resize`. This property accepts a number of options and sets whether an element is resizable, and in which directions you can resize it! It only works on elements that don't have an overflow of hidden though. Check it out on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/resize). (Or have a play with the bottom right corner on the header box).

You can see the full implementation in the [Codepen]({{Codepen}}) example.

Have fun and make cool things.

Mandy

{% endblock %}
