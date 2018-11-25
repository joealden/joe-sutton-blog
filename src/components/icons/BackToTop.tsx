import React from "react";
import styled from "../../utils/styled-components";

const BackToTop: React.FunctionComponent = () => (
  <StyledSVG viewBox="0 0 21 12" width="25">
    <polygon points="20.34 10.24 10.32 0.23 0.32 10.24 1.73 11.65 10.32 3.06 18.92 11.65 20.34 10.24" />
  </StyledSVG>
);

const StyledSVG = styled.svg`
  display: block;

  polygon {
    fill: ${props => props.theme.foregroundColor};
    transition: fill ${props => props.theme.transition};
  }
`;

export default BackToTop;
