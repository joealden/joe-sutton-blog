export type Image = {
  fluid: {
    base64: string;
    aspectRatio: number;
    src: string;
    srcSet: string;
    sizes: string;
  };
};

export type Post = {
  id: string;
  title: string;
  link: string;
  category: string;
  tags: Array<string>;
  createdAt: string;
  image: Image;
};

/**
 * Two random states needed so
 * that memoization triggers correctly.
 */
export enum FilterSortBy {
  NewestFirst,
  OldestFirst,
  AToZ,
  ZToA,
  Random1,
  Random2
}

export type InfoType = {
  open: boolean;
  post: Post;
};

export type FilterType = {
  open: boolean;
  sortBy: FilterSortBy;
  selectedCategory: string | null;
  selectedTags: Array<string>;
};
