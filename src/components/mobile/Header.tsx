import React from "react";
import styled, { css } from "../../utils/styled-components";

import Logo from "../icons/Logo";
import Hamburger from "../icons/Hamburger";

interface HeaderProps {
  toggleTheme: () => void;
}

interface HeaderState {
  menuOpen: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {
    menuOpen: false
  };

  toggleMenu = () => {
    const { menuOpen } = this.state;

    if (menuOpen) {
      this.setState({ menuOpen: false });
    } else {
      this.setState({ menuOpen: true });
    }
  };

  render() {
    const { toggleTheme } = this.props;
    const { menuOpen } = this.state;
    const { toggleMenu } = this;

    return (
      <HeaderWrapper>
        <InnerHeaderWrapper>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <FilterButtonWrapper>
            <button>
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
            <button onClick={toggleTheme}>Switch Theme</button>
          </div>
          <div>
            <button>About</button>
          </div>
        </Menu>
      </HeaderWrapper>
    );
  }
}

export default Header;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  min-height: 60px;
  background-color: ${props => props.theme.backgroundColor};
  z-index: 1000;

  transition: background-color ${props => props.theme.transition};

  /* 8px on right because button has 10px padding */
  padding: 0 10px 0 20px;
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
