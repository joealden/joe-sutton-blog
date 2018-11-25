import React from "react";
import styled from "../../utils/styled-components";

import { FilterSortBy, FilterType } from "../../utils/types";

interface FilterProps {
  close: () => void;
  setFilterSortBy: (sortBy: FilterSortBy) => void;
  filter: FilterType;
}

const Filter: React.FunctionComponent<FilterProps> = ({
  close,
  setFilterSortBy,
  filter
}) => (
  <FilterWrapper
    style={{
      transform: filter.open ? "translateY(0)" : "translateY(-100%)"
    }}
  >
    <h2 onClick={close}>Filter</h2>
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
