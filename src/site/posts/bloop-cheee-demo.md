---
title: Bloop Cheee Demo
FontName: Chee
Creator: James Edmondson
Publisher: OH no Type Co
Characters: Latin (limited)
Release:
Licensing: Paid/Commercial
Download: Future Fonts
DownloadSource: https://www.futurefonts.xyz/ohno/cheee
demoType: video
css: css/bloop.css
videoSource: https://www.youtube-nocookie.com/embed/7daahuvsQz4?rel=0&amp;controls=0&amp;showinfo=0"
Codepen: https://codepen.io/mandymichael/pen/LJeZBO
developer: Mandy Michael
developerTwitter: Mandy_Kerr
featureColor: 3d709c
featureColorReverse: 1c2d7e
featureColorAccent: 26d0ce
date: 2019-09-17
description: Creating an on scroll variable font effect using Chee by OH no Type Co.
postTitle: On scroll variable font effect with Chee

---


{% block content %}
I previously used Chee in the <a href="/ooze-cheee-demo">Ooze Demo</a> using the `temp` axis. In this example we'll be using the `yest` and `gvty` axes, but rather than animating with CSS, we'll use a CSS Custom Property and connect it up with the browser scroll event.

The effect I am going for here is inspired by being underwater, as the text scrolls down to the bottom of the page it "plops" onto the floor.

To get started we set up our base HTML and CSS including a few css custom properties. The custom properties are a really important part of this process as they are what we will update over in our JS to change the values of the variable font axis.


``` html
<h1>Bloop</h1>
```
(It took me a really long time to figure out what text I wanted in this example. Words matter!)

``` css
h1 {
	--axis: 0;
	--pos: 0;
	font-family:'Cheee';
	font-variation-settings: "yest" var(--axis), "gvty" var(--axis);
}
```
Over in our JavaScript we'll set up the code needed to hook into the scroll event.

### Accessing the Scroll position


Like our [Ambient Light Sensor](/light-sensor-demo) example we need to set up a few bits of information about the axis we want to affect and the event we want to use.

```js
const maxGravity = 1000;
const minGravity = 0;

const posTop = 0;
const posBottom = 100;
```

Next we'll add an Event Listener to check for scroll, inside the event listener we'll get the current scroll position.

This code is essentially the function that I wrote for generic access to variable font axes via JavaScript, you can read about it on the [Getting Started](/getting-started) page or find the source on [Github](https://github.com/mandymichael/fluid-axis-variation-events).

The code below will convert the scroll position into a decimal which we can use to calculate two new values to pass into our css. One for the font axis (we can use the same value because they have the same axis min and max values) and one to calculate the top offset of the text so it looks like it's "falling" down the page as we scroll.

```js

var text = document.querySelector("h1");

window.addEventListener("scroll", function(e) {

	var scrollPosition = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

	const percent = scrollPosition / 0.99;
	const axisScale = percent * (maxGravity + minGravity) - minGravity;
	const positionScale = percent * (posBottom - posTop) + posTop;

})
```

The last step is updating the CSS Custom Properties so that our CSS has access to the new values. We do this by using the `setProperty` method interface, which will set a new value for a property in our CSS.

```js
  text.style.setProperty("--axis", axisScale);
  text.style.setProperty("--pos", positionScale +'%');
```

Looking back at the CSS (below) you can see we are using two properties, `--axis` and `--pos` which we can access by using the `var()` function. For example:

``` css
h1 {
	--axis: 0;
	--pos: 0;
	font-family:'Cheee';
	font-variation-settings: "yest" var(--axis), "gvty" var(--axis);
}
```

After this the last step is to update the rest of the styles however you need to so you can make a beautiful, interesting Bloop yourself!

You can see the full implementation in the [Codepen]({{Codepen}}) example.

Have fun and make cool things.

Mandy

{% endblock %}
