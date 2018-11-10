import React from "react";
import { graphql } from "gatsby";
import Listed from "../components/Listed";
import "../styles/styles.css";

interface IndexProps {
  data: ContentfulPosts;
}

const Index: React.SFC<IndexProps> = ({ data }) => {
  const posts = data.allContentfulPost.edges.map(edge => edge.node);
  return <Listed posts={posts} />;
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
          categories
          tags
          createdAt
          image {
            fluid(maxWidth: 1130) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;

export type Post = {
  id: string;
  title: string;
  link: string;
  categories: Array<string>;
  tags: Array<string>;
  createdAt: string;
  image: {
    fluid: {
      base64: string;
      aspectRatio: number;
      src: string;
      srcSet: string;
      sizes: string;
    };
  };
};

type ContentfulPosts = {
  allContentfulPost: {
    edges: Array<{
      node: Post;
    }>;
  };
};
