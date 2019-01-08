import React from "react";
import styled, { keyframes } from "../utils/styled-components";

import { FilterSortBy, FilterLineTransition } from "../utils/types";

const calculateLineTransitionClass = (lineTransition: FilterLineTransition) => {
  switch (lineTransition) {
    case FilterLineTransition.Initial:
      return "";
    case FilterLineTransition.Entering:
      return "filter-line-entering";
    case FilterLineTransition.Entered:
      return "filter-line-entered";
    case FilterLineTransition.Leaving:
      return "filter-line-leaving";
    case FilterLineTransition.Reloading:
      return "filter-line-reloading";
  }
};

interface FilterButtonProps {
  openFilter: () => void;
  lineTransition: FilterLineTransition;
  setlineTransition: (lineTransition: FilterLineTransition) => void;
  /* ----------------------- */
  sortBy: FilterSortBy;
  selectedCategory: string | null;
  selectedTags: Array<string>;
}

class FilterButton extends React.Component<FilterButtonProps> {
  setLineTransitionState = (prevProps: FilterButtonProps) => {
    const { lineTransition, setlineTransition, ...newProps } = this.props;

    if (
      lineTransition === FilterLineTransition.Initial &&
      (newProps.sortBy !== FilterSortBy.NewestFirst ||
        newProps.selectedCategory !== null ||
        newProps.selectedTags.length !== 0)
    ) {
      setlineTransition(FilterLineTransition.Entering);
      setTimeout(() => setlineTransition(FilterLineTransition.Entered), 300);
    } else if (lineTransition === FilterLineTransition.Entered) {
      if (
        newProps.sortBy === FilterSortBy.NewestFirst &&
        newProps.selectedCategory === null &&
        newProps.selectedTags.length === 0
      ) {
        setlineTransition(FilterLineTransition.Leaving);
        setTimeout(() => setlineTransition(FilterLineTransition.Initial), 300);
      } else if (
        prevProps.sortBy !== newProps.sortBy ||
        prevProps.selectedCategory !== newProps.selectedCategory ||
        prevProps.selectedTags !== newProps.selectedTags
      ) {
        setlineTransition(FilterLineTransition.Reloading);
        setTimeout(() => setlineTransition(FilterLineTransition.Entered), 600);
      }
    }
  };

  componentDidUpdate(prevProps: FilterButtonProps) {
    this.setLineTransitionState(prevProps);
  }

  render() {
    const { openFilter, lineTransition } = this.props;

    return (
      <StyledFilterButton
        onClick={openFilter}
        className={calculateLineTransitionClass(lineTransition)}
      >
        <span>Filter</span>
      </StyledFilterButton>
    );
  }
}

export default FilterButton;

const lineAnimationEnter = keyframes`
  from { width: 0; }
  to   { width: 100%; }
`;

const lineAnimationLeave = keyframes`
  from { width: 100%; margin-left: 0; }
  to   { width: 0;    margin-left: 100%; }
`;

const lineAnimationReload1 = keyframes`
  0%   { width: 100%; margin-left: 0; }
  50%  { width: 0;    margin-left: 100%; }
  51%  {              margin-left: 0; }
  100% { width: 100%; margin-left: 0; }
`;

const StyledFilterButton = styled.button`
  /* This offsets the underline height */
  margin-top: 1px;

  span:after {
    content: "";
    display: block;
    width: 0;
    height: 1px;
    background-color: ${props => props.theme.accentColor};
  }

  &.filter-line-entered span:after {
    width: 100%;
  }

  &.filter-line-entering span:after {
    animation: ${lineAnimationEnter} 0.3s ease forwards;
  }

  &.filter-line-leaving span:after {
    animation: ${lineAnimationLeave} 0.3s ease forwards;
  }

  &.filter-line-reloading span:after {
    animation: ${lineAnimationReload1} 0.6s ease forwards;
  }
`;
