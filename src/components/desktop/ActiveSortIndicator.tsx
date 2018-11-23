import React from "react";
import styled from "../../utils/styled-components";

interface ASIProps {
  active: boolean;
}

const ActiveSortIndicator: React.FunctionComponent<ASIProps> = ({ active }) => (
  <ASIWrapper>
    <div
      style={{
        opacity: active ? 1 : 0,
        visibility: active ? "visible" : "hidden"
      }}
    >
      <Circle />
    </div>
  </ASIWrapper>
);

export default ActiveSortIndicator;

const ASIWrapper = styled.div`
  /* div {
    transition: opacity ${props => props.theme.transition},
      visibility ${props => props.theme.transition};
  } */
`;

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
