import React from "react";
import styled from "../utils/styled-components";

interface OverlayProps {
  infoOpen: boolean;
  filterOpen: boolean;
  handleClick: () => void;
}

const Overlay: React.FunctionComponent<OverlayProps> = ({
  filterOpen,
  infoOpen,
  handleClick
}) => (
  <OverlayWrapper
    style={{
      visibility: infoOpen || filterOpen ? "visible" : "hidden",
      opacity: infoOpen || filterOpen ? 0.5 : 0
    }}
    onClick={handleClick}
  />
);

export default Overlay;

const OverlayWrapper = styled.div`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  background-color: ${props => props.theme.backgroundColor};
  transition: opacity ${props => props.theme.transition},
    visibility ${props => props.theme.transition};
`;
