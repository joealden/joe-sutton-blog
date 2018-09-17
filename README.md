# joe-sutton-blog

Joe Sutton's Blog (design inspiration / resource site).

## TODO

### Non-tech

- Find out what the difference is between tags and catagories as talked about in
  `Site Map -> All Posts`.
- What is the use of the search results page? Where are you going to be
  searching from?
- What does Jsutts mean by 'predictive' search functionality.
- Ask where Jsutts favorite stuff like fonts, designers etc. would go on the
  site.
- Think about how to create a fold out menu like
  [snowbird](https://www.snowbird.com/) does.

### Tech

- Create base gatsby project structure
- Add the following files/dirs:
  - `.vscode` with rec extensions
  - `.editorconfig`
  - `.gitignore`
  - `.prettierrc`
  - `.tsconfig.json` for editor settings

## Tools to use

### Gatsby

[https://next.gatsbyjs.org/](https://next.gatsbyjs.org/)

Use v2 as it should be coming out of beta soon (will mitigate migration pain).
Make sure that docs referred to are v2 not v1 and plugin versions are v2
compatible.

#### Plugins to use

- **gatsby-plugin-typescript** to add typescript file (`.ts` and `.tsx`)
  support. It is worth noting that it uses babel to strip types, so it is not
  compiled with tsc. This means that errors will need to be caught in vscode.
- **gatsby-plugin-styled-components** for `styled-components` SSR support. Needs
  `styled-components` and `babel-plugin-styled-components` as peer deps.
- **gatsby-plugin-react-helmet** for `react-helmet` SSR support, needs
  `react-helmet` as peer dep.
- **gatsby-image** for optimising images and for traced placeholder feature,
  among other things.
- **gatsby-source-prismic** to query prismic for site data that jsutts will be
  able to edit (I need to figure out structure when I've got a better idea of
  what content is going to be on it).
- **gatsby-plugin-manifest** for creating a manifest file and perform automatic
  icon generation.
- **gatsby-plugin-offline** to add offline support and fallback offline page.
  Must be loaded after manifest plugin in order for the service worker to cache
  the manifest file.
- **gatsby-plugin-sitemap** to create a `sitemap.xml` file (for SEO).
- **gatsby-plugin-robots-txt** to create a `robots.txt` file (for SEO).

#### Plugins to maybe add

- **gatsby-plugin-google-analytics** for intergrating google analytics into the
  site (if jsutts wants it).
- **gatsby-plugin-nprogress** to add `nprogress` loading bar to the site.
- **gatsby-source-instagram** to query for instagram posts.

### Styled Components

[https://www.styled-components.com/](https://www.styled-components.com/)

Used to style the site.

### Prismic

[https://prismic.io/](https://prismic.io/)

Headless CMS for site data.

### nuka-carousel

[https://github.com/FormidableLabs/nuka-carousel](https://github.com/FormidableLabs/nuka-carousel)

Design doc mentions featured links/posts on homepage to be in a carousel. This
lib is a pure React carousel and is created by Formidable, so it's probably
decent.

See if images inside the carousel can be wrapped in `gatsby-image` component.

### Now

[https://zeit.co/now](https://zeit.co/now)

Deploy site using the static deployment option with Now. Look into CI option for
Now that would automatically rebuild the site on github change or prismic
change. If not, could use Netlify to deploy and use their webhooks to create the
above behaviour.

[https://www.netlify.com/](https://www.netlify.com/)

I would prefer to stick with Now if possible due to personal performance
experiences. Other possible option:

[https://surge.sh/](https://surge.sh/)

## Ideas

### Potential libs for masonry

- **react-masonry-component** -
  (https://github.com/eiriklv/react-masonry-component)[https://github.com/eiriklv/react-masonry-component]
- **react-masonry-css** -
  (https://github.com/paulcollett/react-masonry-css)[https://github.com/paulcollett/react-masonry-css]

### Indiviual Post Pages

Use react portals to create post 'pages' inside the current page.

### Data Schema

#### Post

- Image
- Link
- Text (description)?
- Creation date (automatic)
- Tags (none, one or more than one?)

#### Tag List

Predefined tag list that posts can choose. Can be added to.
