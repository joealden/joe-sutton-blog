import React from "react";
import styled from "../../utils/styled-components";
import Img from "gatsby-image";

import { Post } from "../../pages/index";

import Info from "./Info";

interface ListProps {
  posts: Array<Post>;
}

interface ListState {
  infoOpen: boolean;
  infoPost: Post;
}

class List extends React.Component<ListProps, ListState> {
  state = {
    infoOpen: false,
    infoPost: this.props.posts[0]
  };

  openInfo = (post: Post) =>
    this.setState({
      infoOpen: true,
      infoPost: post
    });

  closeInfo = () => this.setState({ infoOpen: false });

  render() {
    const { posts } = this.props;
    const { infoOpen, infoPost } = this.state;
    const { openInfo, closeInfo } = this;

    return (
      <>
        <ListWrapper>
          {posts.map(post => (
            <li key={post.id} onClick={() => openInfo(post)}>
              <span>{post.title}</span>
              <span>{post.category}</span>
            </li>
          ))}
        </ListWrapper>
        <Info isOpen={infoOpen} post={infoPost} close={closeInfo} />
      </>
    );
  }
}

export default List;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  /* 130px because header is 60px (60px + 70px) */
  margin: 130px 0 70px;

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

    span:last-child {
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
  }
`;
