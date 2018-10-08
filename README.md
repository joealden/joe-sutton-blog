# Listed

Design inspiration / resource site.

## GraphQL to use

```gql
fragment commonFields on ContentfulPost {
  id
  title
  link
  image {
    file {
      url
    }
  }
}

query allPosts {
  allContentfulPost(sort: { fields: createdAt, order: ASC }) {
    edges {
      node {
        ...commonFields
        createdAt
        categories
        tags
      }
    }
  }
}

query featuredPosts {
  allContentfulFeaturedPosts {
    edges {
      node {
        posts {
          ...commonFields
        }
      }
    }
  }
}
```

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

- Add the following files/dirs:
  - `.vscode` with rec extensions
  - `.tsconfig.json` for editor settings

## Tools to use

### Gatsby

[https://gatsbyjs.org/](https://gatsbyjs.org/)

#### Plugins to use

- **gatsby-source-prismic** to query prismic for site data that jsutts will be
  able to edit (I need to figure out structure when I've got a better idea of
  what content is going to be on it).

#### Plugins to maybe add

- **gatsby-image** for optimising images and for traced placeholder feature,
  among other things.
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
