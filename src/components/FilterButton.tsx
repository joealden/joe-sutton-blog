import React from "react";
import styled, { keyframes } from "../utils/styled-components";

import { FilterSortBy } from "../utils/types";

enum LineTransition {
  Initial,
  Enter,
  Leave,
  /* Two different state so that reload is actually triggered */
  Reload1,
  Reload2
}

const calculateLineTransitionClass = (lineTransition: LineTransition) => {
  switch (lineTransition) {
    case LineTransition.Initial:
      return "";
    case LineTransition.Enter:
      return "filter-line-enter";
    case LineTransition.Leave:
      return "filter-line-leave";
    case LineTransition.Reload1:
      return "filter-line-reload-1";
    case LineTransition.Reload2:
      return "filter-line-reload-2";
  }
};

interface FilterButtonProps {
  openFilter: () => void;
  /* ----------------------- */
  sortBy: FilterSortBy;
  selectedCategory: string | null;
  selectedTags: Array<string>;
}

interface FilterButtonState {
  lineTransition: LineTransition;
}

class FilterButton extends React.Component<
  FilterButtonProps,
  FilterButtonState
> {
  state = {
    lineTransition: LineTransition.Initial
  };

  setLineTransitionState = (prevProps: FilterButtonProps) => {
    const newProps = this.props;
    const { lineTransition } = this.state;

    if (
      (lineTransition === LineTransition.Initial ||
        lineTransition === LineTransition.Leave) &&
      (newProps.sortBy !== FilterSortBy.NewestFirst ||
        newProps.selectedCategory !== null ||
        newProps.selectedTags.length !== 0)
    ) {
      this.setState({ lineTransition: LineTransition.Enter });
    } else if (
      lineTransition === LineTransition.Enter ||
      lineTransition === LineTransition.Reload1 ||
      lineTransition === LineTransition.Reload2
    ) {
      if (
        newProps.sortBy === FilterSortBy.NewestFirst &&
        newProps.selectedCategory === null &&
        newProps.selectedTags.length === 0
      ) {
        this.setState({ lineTransition: LineTransition.Leave });
      } else if (
        prevProps.sortBy !== newProps.sortBy ||
        prevProps.selectedCategory !== newProps.selectedCategory ||
        prevProps.selectedTags !== newProps.selectedTags
      ) {
        if (lineTransition === LineTransition.Reload1) {
          this.setState({ lineTransition: LineTransition.Reload2 });
        } else {
          this.setState({ lineTransition: LineTransition.Reload1 });
        }
      }
    }
  };

  componentDidUpdate(prevProps: FilterButtonProps) {
    this.setLineTransitionState(prevProps);
  }

  render() {
    const { openFilter } = this.props;
    const { lineTransition } = this.state;

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

/** ----------------------------------- /
 * NOTE:
 * This is horrible hacky code, please
 * replace with JavaScript animations.
 */

const lineAnimationEnter = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`;

const lineAnimationLeave = keyframes`
  from {
    width: 100%;
    margin-left: 0;
  }

  to {
    width: 0;
    margin-left: 100%;
  }
`;

const lineAnimationReload1 = keyframes`
  0% {
    width: 100%;
    margin-left: 0;
  }

  50% {
    width: 0;
    margin-left: 100%;
  }

  51% {
    margin-left: 0;
  }

  100% {
    width: 100%;
    margin-left: 0;
  }
`;

/* 'from' and 'to' used to trigger animation to reload */
const lineAnimationReload2 = keyframes`
  from {
    width: 100%;
    margin-left: 0;
  }

  50% {
    width: 0;
    margin-left: 100%;
  }

  51% {
    margin-left: 0;
  }

  to {
    width: 100%;
    margin-left: 0;
  }
`;

/** ----------------------------------- */

const StyledFilterButton = styled.button`
  /* NOTE: This offsets the bottom border height */
  margin-top: 1px;

  span:after {
    content: "";
    display: block;
    width: 0;
    height: 1px;
    background-color: ${props => props.theme.accentColor};
  }

  &.filter-line-enter span:after {
    animation: ${lineAnimationEnter} 0.3s ease forwards;
  }

  &.filter-line-leave span:after {
    animation: ${lineAnimationLeave} 0.3s ease forwards;
  }

  &.filter-line-reload-1 span:after {
    animation: ${lineAnimationReload1} 0.6s ease forwards;
  }

  &.filter-line-reload-2 span:after {
    animation: ${lineAnimationReload2} 0.6s ease forwards;
  }
`;
