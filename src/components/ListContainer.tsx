import React from "react";
import memoize from "memoize-one";

import { Post } from "../pages/index";
import { FilterSortBy } from "./Site";

import List from "./List";
import sortPosts from "../utils/sortPosts";

const memoizedSortPosts = memoize(sortPosts);

interface ListContainerProps {
  toggleInfo: () => void;
  posts: Array<Post>;
  sortBy: FilterSortBy;
}

const ListContainer: React.SFC<ListContainerProps> = ({
  toggleInfo,
  posts,
  sortBy
}) => {
  const sortedPosts: Array<Post> = memoizedSortPosts(posts, sortBy);
  return <List toggleInfo={toggleInfo} posts={sortedPosts} />;
};

export default ListContainer;
