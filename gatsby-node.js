exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise(resolve => {
    if (page.path === "/") {
      /* 
      const data = graphql`
        query categoriesQuery {
          allContentfulPost {
            edges {
              node {
                category
              }
            }
          }
        }
      `;

      const categories = data.allContentfulPost.edges.map(
        edge => edge.node.category
      ); */

      /**
       * NOTE:
       * I am currently unsure of how you can access graphql
       * data from the `onCreatePage` hook. I have asked the
       * question here:
       *
       * https://github.com/gatsbyjs/gatsby/issues/10099#issuecomment-442085097
       *
       * So that I can move forward with implementing the filter
       * section I have hardcoded in the current categories as
       * seen below. When I figure out how to access the actual
       * Contentful data, delete the below `categories` array.
       */
      const categories = [
        "Websites",
        "Brand Identites",
        "Fonts",
        "Foundries",
        "Studios",
        "Case Studies"
      ];

      const newPage = {
        ...page,
        context: {
          categories
        }
      };

      deletePage(page);
      createPage(newPage);
    }

    resolve();
  });
};
