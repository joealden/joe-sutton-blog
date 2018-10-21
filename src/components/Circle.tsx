import React from "react";
import styled from "../utils/styled-components";

const StyledSVG = styled.svg`
  display: block;

  circle {
    fill: ${props => props.theme.secondaryColor};
    transition: fill 0.3s ease;
  }
`;

const Circle: React.SFC = () => (
  <StyledSVG height="10" width="10">
    <circle cx="5" cy="5" r="4" />
  </StyledSVG>
);

export default Circle;
