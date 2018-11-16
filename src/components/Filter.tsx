import React from "react";
import styled from "../utils/styled-components";

interface FilterProps {
  open: boolean;
}

class Filter extends React.Component<FilterProps> {
  render() {
    const { open } = this.props;

    return (
      <>
        <FilterContainer
          style={{
            transform: open ? "translateY(0)" : "translateY(-100%)"
          }}
        >
          <p>test</p>
        </FilterContainer>
        <FilterCover />
      </>
    );
  }
}

export default Filter;

const FilterHeight = "500px";

const FilterContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${FilterHeight};
  z-index: 10000;
  background-color: ${props => props.theme.accentColor};
  color: #060606;
  transition: transform ${props => props.theme.transition};

  padding: 90px;
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
  height: ${FilterHeight};
  z-index: 10001;
  background-color: ${props => props.theme.backgroundColor};
  transition: background-color ${props => props.theme.transition};
  transform: translateY(-100%);
`;
