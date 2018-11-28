import { Post } from "./types";

const filterPosts = (posts: Array<Post>, selectedCategory: string | null) => {
  if (selectedCategory === null) return posts;
  return posts.filter(post => post.category === selectedCategory);
};

export default filterPosts;
