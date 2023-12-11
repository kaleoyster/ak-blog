---
title:
layout: default
permalink: /research/
published: true
---

<div class="ProjectContainer">
	<div class="gallery">
  {% for rproject in site.research %}
  {% if rproject.redirect %}
  <div class="projectTile">
          <a href="{{ rproject.redirect }}" target="_blank">
          <span>
              <h2>{{ rproject.title }}</h2>
              <br/>
              <p>{{ rproject.description }}</p>
          </span>
          </a>
  </div>
  {% else %}
  <div class="projectTile">
          <a href="{{ rproject.url | prepend: site.baseurl | prepend: site.url }}">
          <span>
              <h2>{{ rproject.title }}</h2>
              <br/>
              <p>{{ rproject.description }}</p>
          </span>
          </a>
  </div>
  {% endif %}
  {% endfor %}
	</div>
</div>
