import shuffle from "lodash.shuffle";

import { Post, FilterSortBy } from "./types";

const sortPosts = (posts: ReadonlyArray<Post>, sortBy: FilterSortBy) => {
  const mutablePosts: Array<Post> = [...posts];

  switch (sortBy) {
    case FilterSortBy.NewestFirst:
      return mutablePosts.sort(sortPostsByNewestFirst);
    case FilterSortBy.OldestFirst:
      return mutablePosts.sort(sortPostsByOldestFirst);
    case FilterSortBy.AToZ:
      return mutablePosts.sort(sortPostsAToZ);
    case FilterSortBy.ZToA:
      return mutablePosts.sort(sortPostsZToA);
    case FilterSortBy.Random1:
    case FilterSortBy.Random2:
      return shuffle(posts);
  }
};

export default sortPosts;

const sortPostsByNewestFirst = (postA: Post, postB: Post) => {
  const postADate = new Date(postA.createdAt);
  const postBDate = new Date(postB.createdAt);
  return postBDate.valueOf() - postADate.valueOf();
};

const sortPostsByOldestFirst = (postA: Post, postB: Post) => {
  const postADate = new Date(postA.createdAt);
  const postBDate = new Date(postB.createdAt);
  return postADate.valueOf() - postBDate.valueOf();
};

const sortPostsAToZ = (postA: Post, postB: Post) => {
  if (postA.title > postB.title) return 1;
  if (postA.title < postB.title) return -1;
  return 0;
};

const sortPostsZToA = (postA: Post, postB: Post) => {
  if (postA.title > postB.title) return -1;
  if (postA.title < postB.title) return 1;
  return 0;
};
