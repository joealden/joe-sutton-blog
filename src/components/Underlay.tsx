import React from "react";
import styled from "../utils/styled-components";

const Underlay: React.SFC = () => (
  <UnderlayWrapper>
    <div />
    <div />
    <div />
  </UnderlayWrapper>
);

export default Underlay;

const UnderlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  display: grid;
  grid-template-columns: 60px 3fr 1fr;

  div:nth-child(2) {
    border-left: 1px solid ${props => props.theme.lineColor};
    border-right: 1px solid ${props => props.theme.lineColor};
    transition: border-color ${props => props.theme.transition};
  }
`;
