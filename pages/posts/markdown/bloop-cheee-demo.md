---
title: Scrolling Bloop 'Cheee' Demo
date: '2019-09-17'
summary: Variable fonts are perfect for scrolling effects in storytelling and interactive webpages as they enable animation without losing the practicality, accessibility and ease of real fonts
tags:
    - animation
    - effect
    - demo
    - article
featureFont: {
    font: Chee, 
    author: James Edmondson,
    license: available to buy,
    url: https://www.futurefonts.xyz/ohno,
    publisher: OH no Type Co,   
    video: https://www.youtube-nocookie.com/embed/7daahuvsQz4?rel=0&amp;controls=0&amp;showinfo=0,
}
card: {
    cardImage: /images/post-assets/cards/bloop.jpg,
    cardAlt: Chee font with full yest and gravity axis spelling bloop
}
demo: {
    url: https://codepen.io/mandymichael/pen/LJeZBO,
    authorUrl: http://mandy.dev,
    author: Mandy Michael,
}
lastUpdated: '2023-11-06'
---

## Creating a scrolling effect with Chee

Scrolling text effects can help to unify a design and content by linking your animation and effects with the text itself. My goal with this demo is to demonstrate how you can use variable fonts to create these animations similar to how we bring in or change content as the users scrolls. The aim is the feeling that as we scroll down to the bottom of the page the text feels as though it's falling and then "plops" onto the floor.

<div class="codepen"><div class="codepen"><iframe height="400" style="width: 100%;" scrolling="no" title="Scrolling variable font effect change" src="//codepen.io/mandymichael/embed/LJeZBO/?height=300&theme-id=dark&default-tab=result" frameBorder="no" allowfullscreen="true"></iframe></div></div>

I previously used Chee in the <a href="/ooze-cheee-demo">Ooze Demo</a> using the `temp axis`. In this example we'll be using the `yest` and `gvty` axes. I try to use CSS where possible for animation, but in order to utilise the scroll we'll use a CSS Custom Property and connect it up with the browser scroll event using some JavaScript.

To get started I've set up our base html and css including a few css custom properties. The custom properties are a really important part of this process as they are what we will update over in our JS to change the values of the variable font axis.

```html
<h1>Bloop</h1>
```

In the CSS below I have two custom properties, `--axis` and `--pos`. The `--axis` variable will change the value of both axes in the variable font (`yest` and `gvty`) - more on this later - and the `--pos` custom property will update the top offset of the text in relation to the page. This what will make the text to look like it's "falling" as we scroll.

```css
h1 {
    --axis: 0;
    --pos: 0;
    font-family: 'Cheee';
    font-variation-settings: 'yest' var(--axis), 'gvty' var(--axis);
    top: var(--pos);
}
```

Over in our JavaScript we'll set up the code needed to hook into the scroll event.

### Accessing the Scroll position

Like our [Ambient Light Sensor](/light-sensor-demo) example we need to set up a few bits of information about the axis we want to affect and the event we want to use.

In our case we need the min and max values for both axes in Chee (`yest` and `gvty`), because they have the same range values we can just define the values once instead of defining two. If you wanted to vary the range values you would need to define them separately. 

We also need to specify the min and max scroll position. This will be 0% scroll from the top, to 100% scroll from the top. I've specified these as numbers in our code to make it easier to do some math, we convert it back to a percentage later on.

```js
const maxAxis = 1000;
const minAxis = 0;

const posTop = 0;
const posBottom = 100;
```

Next we add an Event Listener to check when the user is scrolling and determine what the current scroll position is.

The code below will convert the scroll position into a decimal which we can use to calculate two new values to pass into our CSS. As I mentioned earlier this will be one for the two font axis and one to calculate the top offset of the text.

```js
var text = document.querySelector('h1');

window.addEventListener('scroll', function(e) {
    var scrollPosition =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    const percent = scrollPosition / 0.99;
    const axisScale = percent * (maxGravity + minGravity) - minGravity;
    const positionScale = percent * (posBottom - posTop) + posTop;
});
```

We access the scroll position by using the `scrollTop` property for the element and the body. This will get the number of pixels that the element or body has scrolled vertically. For this example we'll add the element's `scrollTop` value to the body's `scrollTop` value and then we'll divide that by the elements `scrollHeight` value minus the `clientHeight` value.

```js
var scrollPosition =
    (document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight - document.documentElement.clientHeight);
```

The `scrollHeight` is essentially the height of all the elements content, including padding (whether it's visible or not) and the `clientHeight` which is the inner height of an element including padding but not borders, margins etc.

This will give us an accurate position for the top of the text element to shift it down the page.

The next step is to convert the position value to a decimal, so we can use it to normalise the axis values and link them together. This then allows us to multiple the new position value by the the max axis value minus the min axis value, providing us with a number along our axis scale which is linked to the viewport scroll position.

The same applies to the position, but instead of subtracting the top position value we'll add it instead so it looks like it's moving down the page.

```js
const position = scrollPosition / 0.99;
const axisScale = position * maxGravity - minGravity;
const positionScale = position * posBottom + posTop;
```

The last step is updating the CSS Custom Properties so that our CSS has access to the new values. We do this by using the `setProperty` method, which will set a new value for a property in our CSS.

```js
text.style.setProperty('--axis', axisScale);
text.style.setProperty('--pos', positionScale + '%');
```

Jumping back to the CSS we can access the values of our custom properties by using the `var()` function.

For example:

```css
h1 {
    --axis: 0;
    --pos: 0;
    font-family: 'Cheee';
    font-variation-settings: 'yest' var(--axis), 'gvty' var(--axis);
}
```

Once you have the axis updating on scroll all that's left is to style the text to meet your needs. You can take this example and apply it to any variable font axis, simply change the axis that you are updating.

You can see the full implementation in the [Codepen]({{Codepen}}) example.
