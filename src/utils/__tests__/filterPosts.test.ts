import filterPosts from "../filterPosts";

import { Post } from "../../utils/types";

type Category =
  | "Websites"
  | "Brand Identities"
  | "Fonts"
  | "Foundaries"
  | "Studios"
  | "Case Studies";

type Tag =
  | "Ecommerce"
  | "Fashion"
  | "Minimalist"
  | "Editorial"
  | "Neue Haas"
  | "Activ Grotesk";

type MockedPost = {
  id: string /* To keep track of which post it is */;
  category: Category;
  tags: Array<Tag>;
};

const mockPosts: Array<MockedPost> = [
  {
    id: "1",
    category: "Websites",
    tags: ["Ecommerce"]
  },
  {
    id: "2",
    category: "Brand Identities",
    tags: ["Ecommerce", "Minimalist"]
  },
  {
    id: "3",
    category: "Fonts",
    tags: ["Ecommerce", "Minimalist", "Fashion"]
  },
  {
    id: "4",
    category: "Foundaries",
    tags: ["Fashion"]
  },
  {
    id: "5",
    category: "Studios",
    tags: ["Fashion", "Minimalist"]
  },
  {
    id: "6",
    category: "Websites",
    tags: ["Minimalist"]
  },
  {
    id: "7",
    category: "Websites",
    tags: ["Fashion", "Ecommerce"]
  }
];

/* This is so that I don't have to create full Post types for testing */
const mockPostsTypedAsRealPosts = mockPosts as Array<Post>;

test("filters categories correctly", () => {
  expect(filterPosts(mockPostsTypedAsRealPosts, "Websites", [])).toEqual(
    mockPosts.filter(
      post => post.id === "1" || post.id === "6" || post.id === "7"
    )
  );
});

test("filters tags correctly", () => {
  expect(filterPosts(mockPostsTypedAsRealPosts, null, ["Minimalist"])).toEqual(
    mockPosts.filter(
      post =>
        post.id === "2" || post.id === "3" || post.id === "5" || post.id === "6"
    )
  );
});

test("filters categories and tags correctly together", () => {
  expect(
    filterPosts(mockPostsTypedAsRealPosts, "Websites", ["Ecommerce"])
  ).toEqual(mockPosts.filter(post => post.id === "1" || post.id === "7"));
});
