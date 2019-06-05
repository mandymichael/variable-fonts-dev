---
title: Variable Fonts for Developers
intro: Variable fonts are amazing - check out some examples of how you can use them.
layout: layouts/base.njk
---

<p class="intro">
    {{intro}}
</p>

<div class="listing">
{% for page in collections.post %}
<a class="item" href="/posts/{{ page.data.title | replace(" ", "-") | lower}}">
<img src ="/images/{{ page.data.title | replace(" ", "-") | lower}}.png" />{{ page.data.title }} - {{ page.date | dateDisplay("LLL d, y") }}</a>
{% endfor %}
</div>