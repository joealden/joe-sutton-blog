import React from "react";
import styled from "../utils/styled-components";

import { Post } from "../pages/index";

import { ListItem, PaddingListItem } from "./ListItem";

interface ListProps {
  toggleInfo: () => void;
  posts: Array<Post>;
}

interface ListState {
  activeItemId: string;
}

class List extends React.Component<ListProps, ListState> {
  state = {
    activeItemId: this.props.posts[0].id
  };

  setCurrentlyActiveItem = (id: string) => this.setState({ activeItemId: id });

  render() {
    const { toggleInfo, posts } = this.props;
    const { activeItemId } = this.state;

    return (
      <ListWrapper>
        <PaddingListItem />
        {posts.map(post => {
          const { id, categories, link, title } = post;
          const className = activeItemId === id ? "active-item" : "";

          return (
            <ListItem
              toggleInfo={toggleInfo}
              setCurrentlyActiveItem={this.setCurrentlyActiveItem}
              className={className}
              key={id}
              catagory={categories[0]}
              id={id}
              link={link}
              title={title}
            />
          );
        })}
        <PaddingListItem />
      </ListWrapper>
    );
  }
}

export default List;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li.active-item {
    & > a > div:nth-child(2) > div:nth-child(2),
    & > a > div:nth-child(1),
    & > a > div:nth-child(2) > div:first-child > span:last-child svg polygon,
    & > a > div:nth-child(2) > div:last-child > span {
      opacity: 1;
      visibility: visible;
    }

    & > a > div:nth-child(2) > div:first-child span:first-child {
      color: ${props => props.theme.foregroundColor};
    }

    & > a > div:nth-child(2) > div:first-child > span:last-child svg polygon {
      fill: ${props => props.theme.foregroundColor};
    }
  }
`;
