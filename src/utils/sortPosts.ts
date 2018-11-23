/* TODO: Create own impl as this is 2.6k gzipped! */
import shuffle from "lodash.shuffle";

import { Post } from "../pages/index";
import { FilterSortBy } from "../components/desktop/Site";

const sortPosts = (posts: Array<Post>, sortBy: FilterSortBy) => {
  switch (sortBy) {
    case FilterSortBy.NewestFirst:
      return posts.sort(sortPostsByNewestFirst);
    case FilterSortBy.OldestFirst:
      return posts.sort(sortPostsByOldestFirst);
    case FilterSortBy.AToZ:
      return posts.sort(sortPostsAToZ);
    case FilterSortBy.ZToA:
      return posts.sort(sortPostsZToA);
    case FilterSortBy.Random1:
    case FilterSortBy.Random2:
      return shuffle(posts);
  }
};

export default sortPosts;

const sortPostsByNewestFirst = (postA, postB) => {
  const postADate = new Date(postA.createdAt);
  const postBDate = new Date(postB.createdAt);
  return postBDate.valueOf() - postADate.valueOf();
};

const sortPostsByOldestFirst = (postA, postB) => {
  const postADate = new Date(postA.createdAt);
  const postBDate = new Date(postB.createdAt);
  return postADate.valueOf() - postBDate.valueOf();
};

const sortPostsAToZ = (postA, postB) => {
  if (postA.title > postB.title) return 1;
  if (postA.title < postB.title) return -1;
  return 0;
};

const sortPostsZToA = (postA, postB) => {
  if (postA.title > postB.title) return -1;
  if (postA.title < postB.title) return 1;
  return 0;
};
