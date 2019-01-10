import React from "react";
import styled from "../../utils/styled-components";
import Img from "gatsby-image";

import { Post } from "../../utils/types";

type ListProps = {
  posts: Array<Post>;
  openInfo: (post: Post) => void;
  infoOpen: boolean;
};

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
      /**
       * NOTE:
       *
       * As seen on the mobile version of the site and in the mobile
       * designs, only the post's title and category are shown to the
       * user in the main list. However, the below code also includes
       * the posts image using `gastby-image`'s `Img` component.
       *
       * It is also important to note the `ListItem` styled component
       * applies `display: none` to the span containing the image.
       * This not only results in the image being visually removed from
       * the DOM, it also results in only the base64 version of the
       * image being downloaded. This means that when the user is on
       * the main list, all post's have their base64 version downloaded.
       *
       * The reason why I wanted this behaviour is so that the
       * placeholder version of the image is instantly ready for when
       * the user clicks on the post and opens up the info section.
       * Without including this extra code, the placeholder version of
       * the image would have to be downloaded on demand, resulting in
       * a jolty load of the post's image, which kind of ruins the
       * UX that `gatsby-image` provides in the first place.
       *
       * These base64 versions of the images are incredibly small, so
       * they add very little to the payload size.
       *
       * --------------------------------------------------------------
       * |                                                            |
       * |  Once I have implmented the list virtualisation, I should  |
       * |  check how it effects the loading of the images and their  |
       * |  placeholders.                                             |
       * |                                                            |
       * --------------------------------------------------------------
       */
      posts.map(post => (
        <ListItem key={post.id} onClick={() => openInfo(post)}>
          <span>{post.title}</span>
          <span>{post.category}</span>
          <span>
            <Img alt={post.title} fluid={post.image.fluid} />
          </span>
        </ListItem>
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
`;

const ListItem = styled.li`
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
