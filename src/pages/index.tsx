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

interface IndexProps {
  data: ContentfulPosts;
}

const Index: React.FunctionComponent<IndexProps> = ({ data }, ...rest) => {
  console.log(rest);

  const posts = data.allContentfulPost.edges.map(edge => edge.node);
  return (
    <React.StrictMode>
      <Listed posts={posts} />
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
