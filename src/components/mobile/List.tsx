import React from "react";
import styled from "../../utils/styled-components";
import Img from "gatsby-image";

import { Post } from "../../utils/types";

interface ListProps {
  posts: Array<Post>;
  openInfo: (post: Post) => void;
  infoOpen: boolean;
}

const List: React.FunctionComponent<ListProps> = ({
  posts,
  openInfo,
  infoOpen
}) => (
  <ListWrapper
    style={{
      transform: infoOpen ? "translateX(-100%)" : "translateX(0)"
    }}
  >
    {posts.length === 0 ? (
      <NoPostsMessage>
        <p>Sorry, looks like no posts match your search criteria.</p>
      </NoPostsMessage>
    ) : (
      posts.map(post => (
        <li key={post.id} onClick={() => openInfo(post)}>
          <span>{post.title}</span>
          <span>{post.category}</span>
          <span>
            <Img /* alt={post.title} */ fluid={post.image.fluid} />
          </span>
        </li>
      ))
    )}
  </ListWrapper>
);

export default List;

const ListWrapper = styled.ul`
  list-style: none;
  min-height: 100%;
  padding: 0;
  /* 130px because header is 60px (60px + 70px) */
  margin: 130px 0 70px;
  transition: transform ${props => props.theme.transition};

  li {
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
    cursor: pointer;
    user-select: none;

    transition: color ${props => props.theme.transition};

    span:first-child {
      font-size: 7vw;
      letter-spacing: -0.3vw;
      line-height: 70%;
    }

    span:nth-child(2) {
      opacity: 0.5;
      line-height: 70%;
      display: flex;
      align-items: flex-end;
      font-size: 12px;

      @media screen and (min-width: 350px) {
        font-size: 14px;
      }
      @media screen and (min-width: 550px) {
        font-size: 16px;
      }
      @media screen and (min-width: 700px) {
        font-size: 18px;
      }
    }

    span:last-child {
      display: none;
    }
  }
`;

const NoPostsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    max-width: 75%;
    text-align: center;
    transition: color ${props => props.theme.transition};
  }
`;
