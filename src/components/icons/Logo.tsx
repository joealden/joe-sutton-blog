import React from "react";
import styled from "../../utils/styled-components";

const StyledSVG = styled.svg`
  display: block;

  rect {
    fill: ${props => props.theme.foregroundColor};
    transition: fill 0.3s ease;
  }
`;

const size = 25;

/* Changed to 20x20 to fix jumping bug in chrome */
const Logo: React.SFC = () => (
  <StyledSVG height={size} width={size}>
    <rect width={size} height={size} />
  </StyledSVG>
);

export default Logo;
