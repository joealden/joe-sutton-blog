import React from "react";
import memoize from "memoize-one";

import { Post, FilterSortBy } from "../../utils/types";

import List from "./List";
import sortPosts from "../../utils/sortPosts";

const memoizedSortPosts = memoize(sortPosts);

interface ListContainerProps {
  openInfo: (post: Post) => void;
  posts: Array<Post>;
  sortBy: FilterSortBy;
}

const ListContainer: React.FunctionComponent<ListContainerProps> = ({
  openInfo,
  posts,
  sortBy
}) => {
  const sortedPosts: Array<Post> = memoizedSortPosts(posts, sortBy);
  return <List openInfo={openInfo} posts={sortedPosts} sortBy={sortBy} />;
};

export default ListContainer;
