import React from "react";
import styled from "../../utils/styled-components";

const Hamburger: React.FunctionComponent = () => (
  <StyledSVG width="25" viewBox="0 0 24 12">
    <rect width="24" height="2" />
    <rect y="10" width="24" height="2" />
  </StyledSVG>
);

const StyledSVG = styled.svg`
  display: block;

  rect {
    fill: ${props => props.theme.foregroundColor};
    transition: fill ${props => props.theme.transition};
  }
`;

export default Hamburger;
