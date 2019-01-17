import React from "react";
import styled from "../utils/styled-components";

type ASIProps = {
  active: boolean;
};

const ActiveSortIndicator: React.FunctionComponent<ASIProps> = ({ active }) => (
  <div>
    <div
      style={{
        opacity: active ? 1 : 0,
        visibility: active ? "visible" : "hidden"
      }}
    >
      <Circle />
    </div>
  </div>
);

export default ActiveSortIndicator;

const Circle: React.FunctionComponent = () => (
  <StyledSVG height="12" width="12">
    <circle cx="6" cy="6" r="4" />
  </StyledSVG>
);

const StyledSVG = styled.svg`
  display: block;

  circle {
    fill: #060606;
  }
`;
