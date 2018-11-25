import React from "react";
import styled from "../../utils/styled-components";

import { FilterSortBy } from "../../utils/types";

import SortByList from "../SortByList";

interface FilterProps {
  isOpen: boolean;
  close: () => void;
  sortBy: FilterSortBy;
  setSortBy: (sortBy: FilterSortBy) => void;
}

const Filter: React.FunctionComponent<FilterProps> = ({
  isOpen,
  close,
  sortBy,
  setSortBy
}) => (
  <FilterWrapper
    style={{
      transform: isOpen ? "translateY(0)" : "translateY(-100%)"
    }}
  >
    <FilterContents>
      <div>
        <h3>Search Tags</h3>
      </div>
      <div>
        <SortByList sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <div>
        <h3>Categories</h3>
        <ul>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
          <li>Placeholder</li>
        </ul>
      </div>
    </FilterContents>
    <BackToResultsButton onClick={close}>Back to Results</BackToResultsButton>
  </FilterWrapper>
);

export default Filter;

const FilterWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;

  background-color: ${props => props.theme.accentColor};
  transition: transform ${props => props.theme.transition};
  z-index: 10000;
`;

const FilterContents = styled.div`
  color: #060606;
  padding: 50px 20px 20px 20px;
  height: calc(100% - 60px);
  overflow: auto;

  > div {
    h3 {
      text-transform: uppercase;
      font-weight: normal;
      margin: 0;
    }

    &:not(:last-child):after {
      content: "";
      display: block;
      margin: 0 0 35px 0;
      height: 1px;
      width: 100%;
      background-color: #060606;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        user-select: none;
      }

      li:first-child {
        padding-top: 25px;
      }

      li:last-child {
        padding-bottom: 35px;
      }
    }
  }

  > div:first-child h3 {
    margin-bottom: 35px;
  }
`;

const BackToResultsButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  width: 100%;
  background-color: #060606;

  color: ${props => props.theme.accentColor};
`;
