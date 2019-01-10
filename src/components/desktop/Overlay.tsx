import React from "react";
import styled from "../../utils/styled-components";

type OverlayProps = {
  visible: boolean;
  handleClick: () => void;
};

const Overlay: React.FunctionComponent<OverlayProps> = ({
  visible,
  handleClick
}) => (
  <OverlayWrapper
    style={{
      visibility: visible ? "visible" : "hidden"
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
  transition: visibility ${props => props.theme.transition};
`;
