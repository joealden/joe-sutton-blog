import React from "react";
import styled from "../utils/styled-components";

interface FilterProps {
  filterOpen: boolean;
}

class Filter extends React.Component<FilterProps> {
  render() {
    const { filterOpen } = this.props;

    return (
      <FilterContainer
        style={{
          transform: filterOpen ? "translateY(0)" : "translateY(-100%)"
        }}
      >
        <p>test</p>
      </FilterContainer>
    );
  }
}

export default Filter;

const FilterContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  z-index: 10000;
  background-color: ${props => props.theme.accentColor};
  color: #060606;
  transition: transform ${props => props.theme.transition};

  padding: 90px;
`;
