import { Post } from "./types";

const filterPosts = (
  posts: Array<Post>,
  selectedCategory: string | null,
  selectedTags: Array<string>
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

const filterPostsByTags = (posts: Array<Post>, selectedTags: Array<string>) => {
  if (selectedTags.length === 0) return posts;
  return posts.filter(post =>
    selectedTags.every(selectedTag => post.tags.includes(selectedTag))
  );
};
