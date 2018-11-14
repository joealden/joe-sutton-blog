import React from "react";
import styled from "../../utils/styled-components";

const Circle: React.FunctionComponent = () => (
  <StyledSVG height="20" width="20">
    <circle cx="10" cy="10" r="5" />
  </StyledSVG>
);

const StyledSVG = styled.svg`
  display: block;

  circle {
    fill: ${props => props.theme.foregroundColor};
    transition: fill ${props => props.theme.transition};
  }
`;

export default Circle;
