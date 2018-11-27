import React from "react";
import styled from "../../utils/styled-components";

import { Post, FilterSortBy } from "../../utils/types";

import { ListItem, PaddingListItem } from "./ListItem";

interface ListProps {
  openInfo: (post: Post) => void;
  posts: Array<Post>;
  sortBy: FilterSortBy;
  selectedCategory: string | null;
}

interface ListState {
  activeItemId: string | null;
}

class List extends React.Component<ListProps, ListState> {
  state = {
    activeItemId: this.props.posts[0] ? this.props.posts[0].id : null
  };

  setCurrentlyActiveItem = (id: string) => this.setState({ activeItemId: id });

  /**
   * This is needed so that if the user changes the sortBy or category option
   * in the filter dropdown, the currentlyActiveItem (the list item that is
   * highlighted, has the link arrow and has its preview image showing) is set
   * to the top most item of that new sortBy choice. If this was not in place,
   * the currentlyActiveItem would stay the say as it was before the sortBy
   * option was changed even if the item moved in the list. This was not the
   * desired behaviour.
   */
  componentDidUpdate(prevProps: ListProps) {
    const { posts, sortBy, selectedCategory } = this.props;

    const sortByChanged = sortBy !== prevProps.sortBy;
    const selectedCategoryChanged =
      selectedCategory !== prevProps.selectedCategory;
    const postsIsNotEmpty = posts.length !== 0;

    if (sortByChanged || (selectedCategoryChanged && postsIsNotEmpty)) {
      this.setCurrentlyActiveItem(posts[0].id);
    }
  }

  render() {
    const { openInfo, posts } = this.props;
    const { activeItemId } = this.state;

    return (
      <ListWrapper>
        {posts.length === 0 ? (
          <NoPostsMessage>
            <div />
            <div>
              <p>Sorry, looks like no posts match your search criteria.</p>
            </div>
            <div />
          </NoPostsMessage>
        ) : (
          <>
            <PaddingListItem />
            {posts.map(post => {
              const { id, category, link, title, image } = post;
              const className = activeItemId === id ? "active-item" : "";

              return (
                <ListItem
                  openInfo={() => openInfo(post)}
                  setCurrentlyActiveItem={this.setCurrentlyActiveItem}
                  className={className}
                  key={id}
                  catagory={category}
                  id={id}
                  link={link}
                  title={title}
                  image={image}
                />
              );
            })}
            <PaddingListItem />}
          </>
        )}
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
    & > a > div:nth-child(2) > div:last-child > span,
    & > a > div:nth-child(3) > div {
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

const NoPostsMessage = styled.li`
  height: calc(100vh - 60px);
  display: grid;
  grid-template-columns: 60px 3fr 1fr;

  div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin: 0;
      color: ${props => props.theme.foregroundColor};
    }
  }
`;
