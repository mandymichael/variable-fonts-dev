---
title: Light Sensor Demo
FontName: Tiny
Creator: Jack Halten Fahnestock
Publisher: Velvetyne Type Foundry
Characters: Latin, Dingbats, emoji
Release: 2019-04-04
Licensing: Open source
Download: velvetyne.fr
DownloadSource: https://velvetyne.fr
demoText: Light it up
css: css/light.css
Codepen: https://codepen.io/mandymichael/pen/YYaWop
developer: Mandy Michael
developerTwitter: Mandy_Kerr
featureColor: 1d1c41
featureColorAccent: e2744c
featureColorReverse: 8a8cca
demoId: light-sensor
date: 2019-06-11
description: An example of how a variable font can react based on input from web browser apis and sensors like the Ambient light sensor.
---

{% block content %}
## Making the Light Sensor

The purpose of this example is to demonstrate how Variable Fonts can _react_ and change based on input from web browser apis and sensors like the Ambient light sensor.

**Please note as of 11th June 2019 this demo has very limited support, please refer to [Can I Use](https://caniuse.com/#search=ambient%20light%20sensor) for up to date support information.**

### The HTML

Before getting into the nitty gritty I highly recommend you read the [Getting Started](/getting-started) page, which covers the basics of using variable fonts.

First up we create our HTML element, I'm using a `h1`, but it can be whatever semantic text element you need.

``` html
<h1>Light it up</h1>
```


### The Initial CSS Setup

With our HTML all set up and ready to go we can start to set up the visual effect.

Firstly I am using a font called {{FontName}} by {{Creator}}. {{FontName}} is an Open Source font and is available to <a href="{{DownloadSource}}" target="_blank">Download</a> from <a href="{{DownloadSource}}">{{ Publisher }}</a>. You can use whatever variable font you like. I chose this font because I thought it fit nicely with the effect for demo purposes.

Let's get started setting up the base CSS!

``` css
h1 {
	--axis: 20; // CSS Custom Property for modifying the axis

	font-family: 'TINY';
	font-weight: var(--axis);
}

```
Importantly I have set up a CSS Custom Property called `--axis` with a default value of `20` (which is the lowest value of the weight axis of {{FontName}}). This will become important later as it will allow us to update the value of our axis using JavaScript. As we are using the `wght` axis for this effect we can make use of the `font-weight` property instead of `font-variation-settings` (You should always use the mapped CSS properties when they are available).

### Accessing the Sensor data with JavaScript

In order to access the Ambient Light Sensor we will make use of a little bit of JavaScript and a JavaScript function that I created called "Fluid Axis Variation Events" which you can find on [Github](https://github.com/mandymichael/fluid-axis-variation-events) or in the JS panel on the [Codepen]({{Codepen}}) example.

Initially we need to set up a few bits of information about the axis we want to affect and the event we want to use (in this case the Ambient Sensor API).

```js
    const minAxisValue = 20;
    const maxAxisValue = 300;

    const minEventValue = 0;
    const maxEventValue = 1000;
```

Firstly we need to know what our minimum and maximum axis value will be. The Axis value determines the lowest value and highest value you want to use on the Variable Fonts Axis, in this case I'm using the full range that {{FontName}} has to offer which is `20 - 300`, but you can choose any value along the axis.

Secondly we need to define the minimum and maximum event value. This will allow you to set a start and end point to cap the range. This is important because if we try to use the full range for some events, like sensors, or viewport width the effect's impact is often lost. In this demo, the event value comes from the `sensor.illuminance` reading. I have opted to start at `0` and capped it at `1000`.

Next we can setup the the Ambient Light Sensor!

```js
if ( 'AmbientLightSensor' in window ) {
    const sensor = new AmbientLightSensor();
    sensor.onreading = () => {
        fluidAxisVariation(minAxisValue, maxAxisValue, minEventValue, maxEventValue, sensor.illuminance, "--axis", element);
    };
    sensor.onerror = (event) => {
        console.log(event.error.name, event.error.message);
    };
    sensor.start();
}
```
First we check to see if we have access to the Ambient Light Sensor, and create a new instance.

Using our newly created sensor we can start to get sensor readings with the `sensor.onreading` event handler. The reading frequency is decided by you, you can pass an optional value to the sensor's constructor which will specify the number of readings per second.

Inside the function we can use the `fluidAxisVariation` function I mentioned earlier, you can read up about how it works on the <a href="/getting-started">Getting Started</a>.

For this demo we'll pass in our minimum and maximum event and minimum and maximum axis values, the `sensor.illuminance` value, the name of our CSS Custom Property we defined in our CSS earlier and finally the element.

Passing the values in manually it would look something like the following code:

```js
   fluidAxisVariation(20, 300, 0, 1000, sensor.illuminance, "--axis", document.getElementById("demoText"));
```

Finally we tell the sensor to start with the `sensor.start()` method.

You can also add in some error checking in case something goes wrong, as per my example. I find this useful for debugging.

### Some additional styling

We can then add some additional styles (below) to finish off the effect and create a bit of a "blur" that allows the colours to blob together as the weight increases. The `text-shadow` below will create an outline around the text in white and then implement a soft blur.

``` css
h1 {
	--axis: 0; // CSS Custom Property for modifying the axis

	font-family: 'TINY';
	font-weight: var(--axis);

    text-shadow: -1px -1px 0 rgba(#fff, .4), 1px -1px 0 rgba(#fff, .4), -1px 1px 0 rgba(#fff, .4), 1px 1px 0 rgba(#fff, .4), 0 -2px 8px, 0 0 2px, 0 0 5px #ff7e00, 0 0 15px #ff4444, 0 0 2px #ff7e00, 0 2px 3px #000;

    // General design
    color: #fefefe;
    font-size: 200px;
    margin: 0;
    text-transform: uppercase;
	position: relative;
}
```

You can checkout the full code and styles on [Codepen]({{Codepen}}), however, because of the iframes the Ambient Light Sensor does not work inside the Codepen editor so to see it working you need to view it in <a href="https://s.codepen.io/mandymichael/debug/6c905675972969f4a9a5a89c382b1473">debug mode</a>. (Also remember you need to enable flags in the browser to test this).

Have fun and enjoy!

{{developer}}

{% endblock %}
