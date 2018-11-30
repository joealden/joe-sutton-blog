import React from "react";
import styled from "../../utils/styled-components";

import { FilterSortBy } from "../../utils/types";

import SortByList from "../SortByList";
import CategoryList from "../CategoryList";

interface FilterProps {
  isOpen: boolean;
  close: () => void;
  sortBy: FilterSortBy;
  setSortBy: (sortBy: FilterSortBy) => void;
  categories: Array<string>;
  selectedCategory: string | null;
  setSelectedCategory: (selectedCategory: string | null) => void;
  tags: Array<string>;
  selectedTags: Array<string>;
}

const Filter: React.FunctionComponent<FilterProps> = ({
  isOpen,
  close,
  sortBy,
  setSortBy,
  categories,
  selectedCategory,
  setSelectedCategory,
  tags,
  selectedTags
}) => (
  <>
    <FilterContainer
      style={{
        transform: isOpen ? "translateY(0)" : "translateY(-100%)"
      }}
    >
      <InnerFilter>
        <SortBy>
          <SortByList sortBy={sortBy} setSortBy={setSortBy} />
        </SortBy>
        <Categories>
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Categories>
        <SearchTags>
          <h3>Search Tags</h3>
        </SearchTags>
        <FilterTitle>
          <h2>Filter</h2>
        </FilterTitle>
      </InnerFilter>
      <CloseButtonContainer>
        <button onClick={close}>Close</button>
      </CloseButtonContainer>
    </FilterContainer>
    <FilterCover />
  </>
);

export default Filter;

const FilterContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  background-color: ${props => props.theme.accentColor};
  color: #060606;
  transition: transform ${props => props.theme.transition};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 85px 0 25px 0;
`;

const InnerFilter = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr 1fr;
  grid-template-areas: "logo sort-by categories search-tags filter-title";

  > div {
    margin: 0 30px;
  }

  h3 {
    text-transform: uppercase;
    font-weight: normal;
    margin: 0 0 15px 0;

    &:after {
      content: "";
      display: block;
      margin-top: 15px;
      height: 1px;
      width: 100%;
      background-color: #060606;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 15px 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      span {
        padding: 1px 0;
        transition: opacity ${props => props.theme.transition};
        user-select: none;
      }

      &:hover {
        span {
          opacity: 0.5;
        }
      }
    }
  }
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;

  button {
    color: #060606;
    transition: opacity ${props => props.theme.transition};

    &:hover {
      opacity: 0.5;
      color: #060606;
    }
  }
`;

const SortBy = styled.div`
  grid-area: sort-by;
`;

const Categories = styled.div`
  grid-area: categories;
`;

const SearchTags = styled.div`
  grid-area: search-tags;
`;

const FilterTitle = styled.div`
  grid-area: filter-title;
  writing-mode: vertical-rl;

  h2 {
    font-weight: normal;
    font-size: 5vw;
    margin: 0 60px 0 0;
    line-height: 80%;
    user-select: none;
  }
`;

/**
 * This is needed so that on macOS where they have overscrolling
 * in Chrome and Safari, the over scroll background color is the
 * same color as the current themes background color when the
 * filter is closed. If this didn't exist, the user would see
 * the bottom of the filter when they overscrolled at the top of
 * the page. This was not wanted.
 */
const FilterCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  /* Work out what this actually needs to be */
  height: 500px;

  z-index: 10001;
  background-color: ${props => props.theme.backgroundColor};
  transition: background-color ${props => props.theme.transition};
  transform: translateY(-100%);
`;
