import React from "react";
import styled from "../utils/styled-components";

const StyledSVG = styled.svg`
  display: block;

  circle {
    fill: ${props => props.theme.foregroundColor};
    transition: fill 0.3s ease;
  }
`;

/* Changed to 20x20 to fix jumping bug in chrome */
const Circle: React.SFC = () => (
  <StyledSVG height="20" width="20">
    <circle cx="10" cy="10" r="4" />
  </StyledSVG>
);

export default Circle;
