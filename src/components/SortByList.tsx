import React from "react";

import { FilterSortBy } from "../utils/types";

import ActiveSortIndicator from "./ActiveSortIndicator";

type SortByListProps = {
  sortBy: FilterSortBy;
  setSortBy: (sortBy: FilterSortBy) => void;
};

const SortByList: React.FunctionComponent<SortByListProps> = ({
  sortBy,
  setSortBy
}) => {
  const setSortByIfNotCurrent = (nextSortBy: FilterSortBy) => {
    if (sortBy !== nextSortBy) setSortBy(nextSortBy);
  };

  return (
    <>
      <h3>Sort By</h3>
      <ul>
        <li onClick={() => setSortByIfNotCurrent(FilterSortBy.NewestFirst)}>
          <span>Newest - Oldest</span>
          <ActiveSortIndicator active={sortBy === FilterSortBy.NewestFirst} />
        </li>
        <li onClick={() => setSortByIfNotCurrent(FilterSortBy.OldestFirst)}>
          <span>Oldest - Newest</span>
          <ActiveSortIndicator active={sortBy === FilterSortBy.OldestFirst} />
        </li>
        <li
          onClick={() => {
            if (sortBy === FilterSortBy.Random1) {
              setSortBy(FilterSortBy.Random2);
            } else {
              setSortBy(FilterSortBy.Random1);
            }
          }}
        >
          <span>Random</span>
          <ActiveSortIndicator
            active={
              sortBy === FilterSortBy.Random1 || sortBy === FilterSortBy.Random2
            }
          />
        </li>
        <li onClick={() => setSortByIfNotCurrent(FilterSortBy.AToZ)}>
          <span>A - Z</span>
          <ActiveSortIndicator active={sortBy === FilterSortBy.AToZ} />
        </li>
        <li onClick={() => setSortByIfNotCurrent(FilterSortBy.ZToA)}>
          <span>Z - A</span>
          <ActiveSortIndicator active={sortBy === FilterSortBy.ZToA} />
        </li>
      </ul>
    </>
  );
};

export default SortByList;
