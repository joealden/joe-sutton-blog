// @ts-check

const path = require("path");
const flatten = require("lodash.flatten");

const sortArrayOfStringsAToZ = (stringA, stringB) => {
  if (stringA > stringB) return 1;
  if (stringA < stringB) return -1;
  return 0;
};

/**
 * NOTE:
 *
 * Links referenced:
 * ------------------------------------------------------------------
 * [1] https://github.com/gatsbyjs/gatsby/issues/10099
 * [2] https://www.gatsbyjs.org/docs/creating-and-modifying-pages
 * [3] https://github.com/gatsbyjs/gatsby/issues/5255
 * ------------------------------------------------------------------
 *
 * In order to get the categories and tags from Contentful, we must query for
 * the categories and tags used on all of Listed's posts. Initially, I thought
 * I would have preferred a more direct way to query for Contentful validation
 * rules on content types ([1]), but I realised that it wouldn't be exactly what
 * I wanted. This is because the validation rules for both the categories and
 * tags could include values that are not currently used by any posts. This
 * would mean that including these categories and tags would have been pointless,
 * and likely detrimental to the UX of the filtering process, as users would be
 * able to select filter criteria that would never return them any results.
 *
 * As mentioned in [1], I wanted to be able to fetch and derive the unique
 * categories and tags at build time. This is so that it wouldn't need to be done
 * by the client every time the page was loaded. This will be more important as
 * the number of posts increases, as the time taken to get the unique categories
 * and tags would increase linearly, as the whole list of posts has to be
 * iterated over.
 *
 * As pointed out in [1] by a Gatsby team member, I could do this by hooking
 * into Gatsby's life-cycle events in `gatsby-node.js` (this file). However, they
 * did not specify exactly how to. From reading [2], and from inspecting the
 * parameters passed to `onCreatePage`, it seems to me that you cannot access the
 * data layer from this hook like you can in the `createPages` hook (through the
 * passed `graphql` function). This seemed strange to me, as in [2], under the
 * subsection titled 'Pass context to pages', they show how to pass context down
 * to a page, but they don't show how to pass context down that is based on
 * data from the data layer. To me, this seems like something that should be
 * possible, but as I said, it looks like it is currently not.
 *
 * For this reason, I have used the `createPages` hook so that I can access data
 * from the data layer. However, I did run into one more issue. Initially, I
 * had `index.tsx` (the root site component) located in `src/pages`. This is the
 * directory that Gatsby looks in to generate pages for you (using the plugin
 * `gatsby-plugin-page-creator`). Although I haven't looked at the source code
 * of this plugin, I can take an educated guess that the plugin implements
 * `createPages`, and iterates over the contents of `src/pages`. Each page
 * created by this plugin triggers the `onCreatePage` hook. I expected that any
 * pages created by our own implementation of `createPages` would fire
 * `onCreatePage` as well, but this is not the case currently due to a bug ([3]).
 *
 * The reason why I wanted this to happen is because I originally implemented
 * an `onCreatePage` handler in this file to delete the page created by the
 * `gatsby-plugin-page-creator` plugin (the index page located at `/`). This was
 * because I wanted to create a page at the same location (`/`) that had the
 * correct context passed to it. The implementation of this `onCreatePage`
 * handler was pretty simple, all it did was delete the page if it matched the
 * criteria `page.path === "" && page.context == {}`. This would mean that the
 * hook would delete the index page created by `gatsby-plugin-page-creator` as
 * it would have an empty context object, and leave the page created by our own
 * `createPages` handler as it would pass a context object that was not empty.
 *
 * Because of bug [3] with Gatsby, this meant the above solution did not work.
 * I seem to remember seeing a config option where you could tell Gatsby to not
 * generate pages in the `src/pages` directory, but I couldn't find it when I
 * looked for it (I might be remembering a next.js config option). Instead, I
 * moved `index.tsx` out of `src/pages`, and move it into a directory that Gatsby
 * would not auto generates pages from (in this case, `src/templates`). This
 * means that Gatsby won't auto generate any pages, which in turn means that
 * Gatsby's default behaviour will not interfere with our own `createPages`
 * handler.
 *
 * So in the below `createPages` handler, we fetch the categories and tags from
 * all of the posts, then derive the unique categories and tags and sorted them
 * alphabetically. Then we create a page that will be at `/` that has the unique
 * and sorted categories and tags passed to it via context.
 */

exports.createPages = async ({ graphql, actions }) => {
  const { errors, data } = await graphql(`
    {
      allContentfulPost {
        edges {
          node {
            category
            tags
          }
        }
      }
    }
  `);

  if (errors) throw new Error(errors);

  const posts = data.allContentfulPost.edges.map(edge => edge.node);

  const duplicateCategories = posts.map(post => post.category);
  const uniqueCategories = [...new Set(duplicateCategories)];
  const sortedUniqueCategories = uniqueCategories.sort(sortArrayOfStringsAToZ);

  const duplicateTags = flatten(posts.map(post => post.tags));
  const uniqueTags = [...new Set(duplicateTags)];
  const sortedUniqueTags = uniqueTags.sort(sortArrayOfStringsAToZ);

  actions.createPage({
    path: "/",
    component: path.resolve("src/templates/index.tsx"),
    context: {
      categories: sortedUniqueCategories,
      tags: sortedUniqueTags
    }
  });
};
