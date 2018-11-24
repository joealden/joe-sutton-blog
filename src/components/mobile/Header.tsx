import React from "react";
import styled, { css } from "../../utils/styled-components";

import BackToTop from "../icons/BackToTop";
import Logo from "../icons/Logo";
import Hamburger from "../icons/Hamburger";

interface HeaderProps {
  toggleTheme: () => void;
}

interface HeaderState {
  menuOpen: boolean;
  showBackToTopButton: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {
    menuOpen: false,
    showBackToTopButton: false
  };

  toggleMenu = () => {
    const { menuOpen } = this.state;

    if (menuOpen) {
      this.setState({ menuOpen: false });
    } else {
      this.setState({ menuOpen: true });
    }
  };

  /** -------------------------------------------------------------------- /
   * TODO:
   * This code is duplicated from the desktop Header component.
   * Extract this functionality out into its own file.
   */

  shouldBackToTopButtonBeShown = () => {
    const { showBackToTopButton } = this.state;

    if (window.pageYOffset > 100) {
      if (showBackToTopButton === false) {
        this.setState({ showBackToTopButton: true });
      }
    } else {
      if (showBackToTopButton === true) {
        this.setState({ showBackToTopButton: false });
      }
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.shouldBackToTopButtonBeShown, {
      passive: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.shouldBackToTopButtonBeShown);
  }

  /* -------------------------------------------------------------------- */

  render() {
    const { toggleTheme } = this.props;
    const { menuOpen, showBackToTopButton } = this.state;
    const { toggleMenu } = this;

    return (
      <HeaderWrapper
        style={{
          padding: showBackToTopButton ? "0 10px 0 10px" : "0 10px 0 20px"
        }}
      >
        <InnerHeaderWrapper>
          <LogoWrapper>
            {showBackToTopButton ? (
              <button
                aria-label="Back To Top"
                onClick={() =>
                  window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: "smooth"
                  })
                }
              >
                <BackToTop />
              </button>
            ) : (
              <Logo />
            )}
          </LogoWrapper>
          <FilterButtonWrapper>
            <button
              style={{
                marginLeft: showBackToTopButton ? "10px" : "0"
              }}
            >
              <span>Filter</span>
            </button>
          </FilterButtonWrapper>
          <MenuIconWrapper>
            <button onClick={toggleMenu}>
              <Hamburger />
            </button>
          </MenuIconWrapper>
        </InnerHeaderWrapper>
        <Menu
          style={{
            transform: menuOpen ? "translateY(0)" : "translateY(-100%)"
          }}
        >
          <div>
            <button>About</button>
          </div>
          <div>
            <button onClick={toggleTheme}>Switch Theme</button>
          </div>
        </Menu>
      </HeaderWrapper>
    );
  }
}

export default Header;

const HeaderWrapper: any = styled("header")`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  min-height: 60px;
  background-color: ${props => props.theme.backgroundColor};
  z-index: 1000;

  transition: background-color ${props => props.theme.transition};
`;

const InnerHeaderWrapper = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  height: 60px;
  min-height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  transition: background-color ${props => props.theme.transition};
`;

const commonInnerHeaderStyles = css`
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  ${commonInnerHeaderStyles};
`;

const FilterButtonWrapper = styled.div`
  ${commonInnerHeaderStyles};
  justify-content: center;

  button {
    color: ${props => props.theme.accentColor};

    span {
      border-bottom: 1px solid ${props => props.theme.accentColor};
    }
  }
`;

const MenuIconWrapper = styled.div`
  ${commonInnerHeaderStyles};
  justify-content: flex-end;
`;

const Menu = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  z-index: -1;

  transition: transform ${props => props.theme.transition},
    background-color ${props => props.theme.transition};

  > div {
    button,
    button:hover {
      color: ${props => props.theme.foregroundColor};
    }
  }

  > div:first-child {
    opacity: 0.5;
  }
`;
