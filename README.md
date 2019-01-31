<p align="center"><img width="50" src="src/images/listed-icon.png"></h2>
<h1 align="center">Listed</h1>
<p align="center">A Curated List of Design Inspiration Resources.</p>

![Listed Screenshot](.github/listed.png)

## Why

This site was built for a digital and brand designer that wanted a site to
record and catalog design inspiration resources that they used or would like
to reference in their future work. This was built for the benefit of both the
designer themselves as a place to search for inspiration in the future, as
well as a place for other designers to come to if they needed inspiration.

## Architecture

The mobile and desktop designs for this site shared a lot of common state,
but the structure of the UIs was completely different. Instead of having a
single component tree for both mobile and desktop where components would
contain a lot of conditonal rendering logic and media queries, I decided to
split the rendering tree into two parts after the component that contained
state that was needed by both the mobile and the desktop UIs.

This resulted in the codebase being a lot easier to manage, as when I was
working on either the desktop or mobile component trees, I didn't have to
read through code that wasn't related to the task at hand at all.

Read the following issue if you want more details on this:
https://github.com/joealden/listed/issues/3

## Setup

Download dependencies:

```bash
yarn
```

Start development server:

```bash
yarn dev
```

Build production files:

```bash
yarn build
```

## Tech Used

- React
- TypeScript
- Gatsby
- styled-components
- Jest
- Contentful

## Notes

### Using WebP in gatsby-image

WebP is currently supported in the latest versions of Chrome and Firefox. This
test was performed with 24 items loaded (requires scrolling down the list as the
images are lazy loaded). The below numbers are gzipped.

- Before - 1.2MB
- After - 740KB

This shows a roughly 40% reduction in total payload size. This reduction size does
also not take into account that the JS and HTML bundles are basically the same size
both before and after using conditional WebP formatting.
