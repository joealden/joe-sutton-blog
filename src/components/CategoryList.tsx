import React from "react";

import ActiveSortIndicator from "./ActiveSortIndicator";

interface CategoryListProps {
  categories: Array<string>;
  selectedCategory: string | null;
  setSelectedCategory: (selectedCategory: string | null) => void;
}

const CategoryList: React.FunctionComponent<CategoryListProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory
}) => {
  const setSelectedCategoryIfNotCurrent = (
    nextSelectedCategory: string | null
  ) => {
    if (selectedCategory !== nextSelectedCategory) {
      setSelectedCategory(nextSelectedCategory);
    }
  };

  return (
    <>
      <h3>Categories</h3>
      <ul>
        <li onClick={() => setSelectedCategoryIfNotCurrent(null)}>
          <span>All</span>
          <ActiveSortIndicator active={selectedCategory === null} />
        </li>
        {categories.map(category => (
          <li
            key={category}
            onClick={() => setSelectedCategoryIfNotCurrent(category)}
          >
            <span>{category}</span>
            <ActiveSortIndicator active={selectedCategory === category} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoryList;
