---
title: Fira Code Google API Demo
FontName: Fira Code
Creator: Multiple Designers
Publisher: Google
Characters: Latin
Release:
Licensing: Open source
Download: Google Fonts
DownloadSource: https://fonts.google.com/specimen/Fira+Code?selection.family=Fira+Code
demoText: Fira Code Variable
demoAttribute: data-splitting
demoType: standard-animation
demoId: fira-google-api
css: css/fira-google-api.css
Codepen: https://codepen.io/mandymichael/pen/OJLrgdv
developer: Mandy Michael
developerTwitter: Mandy_Kerr
featureColor: b94b9e
featureColorAccent: ff00e7
featureColorReverse: fec7ff
date: 2019-09-20
description: Demoing the Google V2 API for accessing variable fonts
postTitle: Using the Google API to access variable fonts.

---

{% block content %}
The [Google Fonts](https://fonts.google.com/) website is a great resource and with the ever increasing interest in variable fonts the question often comes up, will Google Fonts have variable fonts, and if so how will we use them?

Well, the good news is, yes, Google Fonts will have variable fonts, and more importantly, they have released an updated version of their API that will enable you to use variable fonts to their full potential.

Google made the announcement of the new API at ATypI Tokyo (2019) and released a [Codepen Demo](https://codepen.io/nlwilliams/full/JjPJewp) with some examples of the currently available variable fonts. I'll do a super quick run down, but Jason Pamental
 has written a great post that goes into some more depth that you can check out on medium if you like: [Variable fonts & the new Google Fonts API](https://medium.com/web-typography-news/variable-fonts-the-new-google-fonts-api-d442e9a0a255)

Having a look at the Codepen the V2 API it's pretty straightforward to use and doesn't deviate too much from the current implementation of the Google Fonts API.

You can use the api with `import` in your css or with the external resource `link` element in your html. I usually use `link` myself so I was pleased both of those options remained.


```html
<link
   href="https://fonts.googleapis.com/css2?family=Fira%20Code:wght@300..700&display=swap"
   rel="stylesheet"
>
```

```css
@import url('https://fonts.googleapis.com/css2?family=Fira%20Code:wght@300..700&display=swap');
```

As far as changes go to how we reference the fonts themselves, there are a couple of differences. The way we specify the font family is still the same, but the way we request the weight, or other axis is a little different.

Previously we would have done something like the example below, where the font weights or values were separated by commas.

```html
https://fonts.googleapis.com/css?family=Fira+Code:400,700&display=swap
```

In the new api we have to specify the axis e.g. `wght` and the value, where multiple values are separated by a semi-colon. This is how we would use the API for your standard, non-variable, fonts.

```html
css2?family=Fira%20Code:wght@300;700
```

If you want make use of the full range of weights available in a variable font you can request them a little differently, they are known in the api as Axis value groups (or tuples), they cannot overlap or touch and they must be sorted in numerical order.

```html
css2?family=Fira%20Code:wght@300...700
```

When it comes to using the font in your actual css, from here everything works exactly the same, we can set the `font-family` on our selector and choose a weight between the range we requested from the Google API.

``` css
h1 {
    font-family: "Fira Code";
    font-weight: 278;
}
```

You can see the full implementation in the [Codepen]({{Codepen}}) example.

Have fun and make cool things.

Mandy

{% endblock %}
