<p align="center"><img width="50" src="src/images/listed-icon.png"></h2>
<h1 align="center">Listed</h1>
<p align="center">A Curated List of Design Inspiration Resources.</p>

![Listed Screenshot](.github/listed.png)

## TODO

- Create a "Why" section, the use of the site
- Create a "Tech used" section with languages + libs + tools (including contentful for CMS [Netlify build hooks])
- Create an "Architecture" section talking about the project's structure (desktop, mobile and shared component trees)
- Create a "Usage" section (how to get development going (+ testing) and also how to build the site for prod)
- Create a "Challenges and Solutions" sections about problems experience and the solutions to these issues
  - Lazy loading of images (difference between desktop and mobile implementations)
  - Scroll management (started of using `no-scroll` then moved to a custom implementation)
  - Post randomisation with React's rendering process
  - Native like navigation on mobile (using the History API)
  
## Notes

## Using WebP in gatsby-image

WebP is currently only support in Chrome so only effect it. This test is with 24
items with all item's images loaded (requires scrolling down the whole list as
they are lazy loaded). The below numbers are gzipped.

- Before - 1.2MB
- After - 740KB

This shows a roughly 40% reduction in total size. This reduction size does also
not take into account that the js and html bundles are basically the same size
both before and after using conditional WebP.
