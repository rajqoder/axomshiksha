---
date: '2025-12-21T12:05:00+05:30'
draft: false
title: 'Working with Hugo Shortcodes'
tags:
    - 'hugo'
    - 'shortcodes'
    - 'content'
categories:
    - 'Guide'
readingTime: '7 minutes'
thumbnail: 'https://picsum.photos/800/400?random=7'
---

Shortcodes are one of Hugo's most powerful features, allowing you to add rich content and functionality to your posts without writing complex HTML. In this post, we'll explore how to use and create shortcodes.

## What Are Shortcodes?

Shortcodes are simple snippets inside your content files that Hugo renders using predefined templates. They're written in double curly braces and can accept parameters.

## Built-in Shortcodes

Hugo comes with several built-in shortcodes:

1. `figure` - For inserting images with captions
2. `gist` - For embedding GitHub Gists
3. `highlight` - For syntax highlighting code blocks
4. `instagram` - For embedding Instagram posts
5. `ref` and `relref` - For linking to other content
6. `tweet` - For embedding Twitter posts
7. `vimeo` and `youtube` - For embedding videos

Example of using the figure shortcode:
{{</* figure src="/images/example.jpg" title="Example Figure" */>}}

## Creating Custom Shortcodes

You can create your own shortcodes by adding template files to `layouts/shortcodes/`. For example, to create a warning box shortcode:

1. Create `layouts/shortcodes/warning.html`
2. Add your HTML template:
```html
<div class="warning-box">
  <strong>Warning:</strong> {{ .Inner }}
</div>
```

3. Use it in your content:
{{</* warning */>}} This is important! {{</* /warning */>}}

## Parameterized Shortcodes

Shortcodes can accept parameters for greater flexibility:

```
{{</* banner text="Welcome!" color="blue" */>}}
```

In your shortcode template, access parameters with `.Get`:
```html
<div class="banner banner-{{ .Get "color" }}">
  {{ .Get "text" }}
</div>
```

## Positional Parameters

You can also use positional parameters:
```
{{</* quote "John Doe" "Author" */>}}
```

Access them with index numbers:
```html
<blockquote>
  {{ .Inner }}
  <cite>{{ .Get 0 }}, {{ .Get 1 }}</cite>
</blockquote>
```

## Nested Shortcodes

Shortcodes can be nested within each other, allowing for complex layouts:
```
{{</* section */>}}
{{</* heading level="2" */>}}Section Title{{</* /heading */>}}
{{</* /section */>}}
```

Mastering shortcodes will greatly enhance your content creation workflow and allow you to add rich, interactive elements to your Hugo sites.