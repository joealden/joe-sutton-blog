import React from "react";
import styled from "../../utils/styled-components";

const Logo: React.FunctionComponent = () => (
  <StyledSVG viewBox="0 0 30 30">
    <polygon points="7.5 22.5 7.5 0 0 0 0 30 30 30 30 22.5 7.5 22.5" />
    <polygon points="30 0 30 15 22.5 15 22.5 7.5 15 7.5 15 0 30 0" />
  </StyledSVG>
);

export default Logo;

const StyledSVG = styled.svg`
  display: block;
  width: 25px;
  margin: 10px;

  polygon {
    fill: ${props => props.theme.foregroundColor};
    transition: fill ${props => props.theme.transition};
  }
`;
