import React from "react";
import styled from "../../utils/styled-components";

type MenuButtonProps = {
  toggleMenu: () => void;
  menuOpen: boolean;
};

const MenuButton: React.FunctionComponent<MenuButtonProps> = ({
  toggleMenu,
  menuOpen
}) => (
  <StyledMenuButton aria-label="Open Menu" onClick={toggleMenu}>
    <div className={menuOpen ? "menu-open" : ""}>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
    </div>
  </StyledMenuButton>
);

export default MenuButton;

const StyledMenuButton = styled.button`
  > div {
    position: relative;
    width: 24px;
    height: 24px;

    > div {
      position: absolute;
      left: 0;
      top: 0;
      display: inline-block;
      width: 24px;
      height: 24px;
      transition: transform 0.15s ease;

      > div {
        position: absolute;
        left: 0;
        top: 11px;
        display: inline-block;
        width: 24px;
        height: 2px;
        transition: background-color ${props => props.theme.transition},
          transform 0.15s ease;
        transition-delay: 0.15s;
        background-color: ${props => props.theme.foregroundColor};
      }

      &:first-child {
        > div {
          transform: translateY(-5px);
        }
      }

      &:last-child {
        > div {
          transform: translateY(5px);
        }
      }
    }

    &.menu-open {
      > div {
        transition-delay: 0.15s;

        &:first-child {
          transform: rotate(45deg);
        }

        &:last-child {
          transform: rotate(-45deg);
        }

        > div {
          transform: none;
          transition-delay: 0s;
        }
      }
    }
  }
`;
