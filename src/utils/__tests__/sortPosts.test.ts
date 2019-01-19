import sortPosts from "../sortPosts";

import { Post, FilterSortBy } from "../types";

type MockedPost = {
  title: string;
  createdAt: string;
};

const dateStringOf = (year: number, monthIndex: number, day: number) =>
  new Date(year, monthIndex, day).toISOString();

const mockPosts: Array<MockedPost> = [
  {
    title: "Bornfight",
    createdAt: dateStringOf(2019, 0, 1)
  },
  {
    title: "Zero",
    createdAt: dateStringOf(2018, 2, 4)
  },
  {
    title: "Checkout",
    createdAt: dateStringOf(2018, 5, 10)
  },
  {
    title: "Rally Interactive",
    createdAt: dateStringOf(2019, 0, 30)
  },
  {
    title: "Burger",
    createdAt: dateStringOf(2018, 10, 2)
  },
  {
    title: "Quiet Studio",
    createdAt: dateStringOf(2019, 0, 6)
  }
];

/* This is so that I don't have to create full Post types for testing */
const mockPostsTypedAsRealPosts = mockPosts as Array<Post>;

test("sorts posts A-Z correctly", () => {
  expect(sortPosts(mockPostsTypedAsRealPosts, FilterSortBy.AToZ)).toEqual([
    {
      title: "Bornfight",
      createdAt: dateStringOf(2019, 0, 1)
    },
    {
      title: "Burger",
      createdAt: dateStringOf(2018, 10, 2)
    },
    {
      title: "Checkout",
      createdAt: dateStringOf(2018, 5, 10)
    },
    {
      title: "Quiet Studio",
      createdAt: dateStringOf(2019, 0, 6)
    },
    {
      title: "Rally Interactive",
      createdAt: dateStringOf(2019, 0, 30)
    },
    {
      title: "Zero",
      createdAt: dateStringOf(2018, 2, 4)
    }
  ]);
});

test("sorts posts Z-A correctly", () => {
  expect(sortPosts(mockPostsTypedAsRealPosts, FilterSortBy.ZToA)).toEqual([
    {
      title: "Zero",
      createdAt: dateStringOf(2018, 2, 4)
    },
    {
      title: "Rally Interactive",
      createdAt: dateStringOf(2019, 0, 30)
    },
    {
      title: "Quiet Studio",
      createdAt: dateStringOf(2019, 0, 6)
    },
    {
      title: "Checkout",
      createdAt: dateStringOf(2018, 5, 10)
    },
    {
      title: "Burger",
      createdAt: dateStringOf(2018, 10, 2)
    },
    {
      title: "Bornfight",
      createdAt: dateStringOf(2019, 0, 1)
    }
  ]);
});

test("sorts newest posts first correctly", () => {
  expect(
    sortPosts(mockPostsTypedAsRealPosts, FilterSortBy.NewestFirst)
  ).toEqual([
    {
      title: "Rally Interactive",
      createdAt: dateStringOf(2019, 0, 30)
    },
    {
      title: "Quiet Studio",
      createdAt: dateStringOf(2019, 0, 6)
    },
    {
      title: "Bornfight",
      createdAt: dateStringOf(2019, 0, 1)
    },
    {
      title: "Burger",
      createdAt: dateStringOf(2018, 10, 2)
    },
    {
      title: "Checkout",
      createdAt: dateStringOf(2018, 5, 10)
    },
    {
      title: "Zero",
      createdAt: dateStringOf(2018, 2, 4)
    }
  ]);
});

test("sorts oldest posts first correctly", () => {
  expect(
    sortPosts(mockPostsTypedAsRealPosts, FilterSortBy.OldestFirst)
  ).toEqual([
    {
      title: "Zero",
      createdAt: dateStringOf(2018, 2, 4)
    },
    {
      title: "Checkout",
      createdAt: dateStringOf(2018, 5, 10)
    },
    {
      title: "Burger",
      createdAt: dateStringOf(2018, 10, 2)
    },
    {
      title: "Bornfight",
      createdAt: dateStringOf(2019, 0, 1)
    },
    {
      title: "Quiet Studio",
      createdAt: dateStringOf(2019, 0, 6)
    },
    {
      title: "Rally Interactive",
      createdAt: dateStringOf(2019, 0, 30)
    }
  ]);
});
