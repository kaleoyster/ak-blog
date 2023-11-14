---
title:
layout: default
permalink: /resumes/
published: true
---
<div class="ProjectContainer">
    <div class="gallery">
  {% for project in site.projects %}
  {% if resume.redirect %}
  <div class="projectTile">
          <a href="{{ resumes.redirect }}" target="_blank">
          <span>
              <h2>{{ resumes.title }}</h2>
              <br/>
              <p>{{ resumes.description }}</p>
          </span>
          </a>
  </div>
  {% else %}

  <div class="projectTile">
          <a href="{{ resumes.url | prepend: site.baseurl | prepend: site.url }}">
          <span>
              <h2>{{ resumes.title }}</h2>
              <br/>
              <p>{{ resumes.description }}</p>
          </span>
          </a>
  </div>

  {% endif %}

  {% endfor %}

</div>

</div>
