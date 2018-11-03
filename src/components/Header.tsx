import React from "react";
import styled, { css } from "../utils/styled-components";

import Circle from "../components/icons/Circle";
import Logo from "../components/icons/Logo";
import BackToTop from "../components/icons/BackToTop";

interface HeaderProps {
  showBackToTopButton: boolean;
  toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
  toggleFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header: React.SFC<HeaderProps> = ({
  showBackToTopButton,
  toggleTheme,
  toggleFilter
}) => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <FilterAndBackToTopWrapper>
        <button onClick={toggleFilter}>Filter</button>
        <button
          className={showBackToTopButton ? "" : "hidden"}
          onClick={() =>
            window.scrollTo({
              behavior: "smooth",
              left: 0,
              top: 0
            })
          }
        >
          <BackToTop />
        </button>
      </FilterAndBackToTopWrapper>
      <AboutAndThemeChangeWrapper>
        <button>About</button>
        <button onClick={toggleTheme}>
          <Circle />
        </button>
      </AboutAndThemeChangeWrapper>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  display: grid;
  grid-template-columns: var(--logo-width) 3fr 1fr;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;

  z-index: 100;
  background-color: ${props => props.theme.backgroundColor};
  transition: background-color ${props => props.theme.transition};
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const commonFlexHeaderStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  overflow: hidden;
`;

const FilterAndBackToTopWrapper = styled.div`
  ${commonFlexHeaderStyles};
  border-left: 1px solid ${props => props.theme.lineColor};
  border-right: 1px solid ${props => props.theme.lineColor};
  transition: border-color ${props => props.theme.transition};

  button:last-child {
    transition: opacity ${props => props.theme.transition},
      visibility ${props => props.theme.transition};
    opacity: 1;

    &.hidden {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

const AboutAndThemeChangeWrapper = styled.div`
  ${commonFlexHeaderStyles};
`;
