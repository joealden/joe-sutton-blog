import React from "react";
import styled from "../utils/styled-components";

interface MainContainerProps {
  infoOpen: boolean;
  children: React.ReactNode;
}

const MainContainer: React.FunctionComponent<MainContainerProps> = ({
  infoOpen,
  children
}) => (
  <MainContainerWrapper
    style={{
      transform: infoOpen ? "translateX(var(--column-width))" : "translateX(0)"
    }}
  >
    {children}
  </MainContainerWrapper>
);

export default MainContainer;

const MainContainerWrapper = styled.div`
  position: relative;
  transition: transform ${props => props.theme.transition};
`;
