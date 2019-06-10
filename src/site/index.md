---
title: Variable Fonts for Developers
layout: layouts/home.njk
bodyClass: home
description: Variable fonts effects, examples and experiments for developers!
developer: Mandy Michael
---

<div class="listing">
{% for page in collections.post | reverse %}

{% if page.data.featureColor === 'f5f5f5' %}
    {% set featureColor = page.data.featureColorReverse %}
{% else %}
    {% set featureColor = page.data.featureColor %}
{% endif %}
<div class="sidebar" class="sidebar" style="--featureColor: #{{ featureColor }}">
<time>{{ page.date | dateDisplay("LLL d, y") }}</time>
<h2 style="--featureColor: #{{ featureColor }}">{{ page.data.title }}</h2>
<div class="demo-meta">
<p>Font: {{ page.data.FontName }} by {{ page.data.Creator }}</p>
<p>Code by <a href="https://twitter.com/{{page.data.developerTwitter}}">{{ page.data.developer }}</a></p>
<a href="/posts/{{ page.data.title | replace(" ", "-") | lower}}" class="post-button">Read post</a>
</div>

</div>
<a style="--featureColor: #{{ page.data.featureColor }}" class="item" href="/posts/{{ page.data.title | replace(" ", "-") | lower}}">
<img src ="/images/{{ page.data.title | replace(" ", "-") | lower}}.png" /></a>


{% endfor %}
</div>
