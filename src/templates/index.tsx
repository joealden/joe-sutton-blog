import React from "react";
import { graphql } from "gatsby";

import { Post } from "../utils/types";
import Listed from "../components/Listed";
import "../styles/styles.css";

type ContentfulPosts = {
  allContentfulPost: {
    edges: Array<{
      node: Post;
    }>;
  };
};

type IndexProps = {
  data: ContentfulPosts;
  pageContext: {
    categories: Array<string>;
    tags: Array<string>;
  };
};

/**
 * NOTE:
 * Read the note in `src/gatsby-node.js` for more information on why this
 * component is not treated as a regular page component located in `src/pages`,
 * and why it is instead located here in `src/templates`.
 */
const Index: React.FunctionComponent<IndexProps> = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.edges.map(edge => edge.node);
  const { categories, tags } = pageContext;

  return (
    <React.StrictMode>
      <Listed posts={posts} categories={categories} tags={tags} />
    </React.StrictMode>
  );
};

export default Index;

export const query = graphql`
  query contentfulData {
    allContentfulPost(sort: { order: DESC, fields: createdAt }) {
      edges {
        node {
          id
          title
          link
          category
          tags
          createdAt
          image {
            fluid(maxWidth: 1130) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
