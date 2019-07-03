# Block Live Preview

A theme to provide live preview for Blocks.

## Introduction

This theme hosts a Block editor page that dynamically loads a Block and renders the live preview. 

The Block editor page is built for an iframe, so that it can be displayed in the plugin directory for Blocks.

## Build JS and CSS files

Run

```bash
npm install
grunt build
```

## Develop

* Run `grunt watch`
* Install this theme in a WordPress site.
* Browse to `https://{wordpress_site}/?block=boxer-block`.

## Notes
* Adapted from [Gutenberg theme](https://meta.svn.wordpress.org/sites/trunk/wordpress.org/public_html/wp-content/themes/pub/gutenberg/).