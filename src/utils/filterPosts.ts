import { Post } from "./types";

const filterPosts = (
  posts: Array<Post>,
  selectedCategory: string | null,
  selectedTags: Array<string> | null
) => {
  const filteredPostsByCategory = filterPostsByCategory(
    posts,
    selectedCategory
  );
  const filteredPostsByCategoryAndTags = filterPostsByTags(
    filteredPostsByCategory,
    selectedTags
  );
  return filteredPostsByCategoryAndTags;
};

export default filterPosts;

const filterPostsByCategory = (
  posts: Array<Post>,
  selectedCategory: string | null
) => {
  if (selectedCategory === null) return posts;
  return posts.filter(post => post.category === selectedCategory);
};

const filterPostsByTags = (
  posts: Array<Post>,
  selectedTags: Array<string> | null
) => {
  if (selectedTags === null) return posts;
  return posts.filter(post =>
    post.tags.some(tag => selectedTags.includes(tag))
  );
};
