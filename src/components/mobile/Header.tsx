import React from "react";
import styled, { css } from "../../utils/styled-components";

import { FilterSortBy, FilterLineTransition } from "../../utils/types";

import FilterButton from "../FilterButton";
import MenuButton from "./MenuButton";

import BackToTop from "../icons/BackToTop";
import Logo from "../icons/Logo";

type HeaderProps = {
  sortBy: FilterSortBy;
  setFilterSortBy: (sortBy: FilterSortBy) => void;
  selectedCategory: string | null;
  setSelectedCategory: (selectedCategory: string | null) => void;
  selectedTags: Array<string>;
  clearSelectedTags: () => void;
  toggleTheme: () => void;
  openFilter: () => void;
  openAbout: () => void;
  infoOpen: boolean;
  filterLineTransition: FilterLineTransition;
  setFilterLineTransition: (filterLineTransition: FilterLineTransition) => void;
  menuOpen: boolean;
  toggleMenu: () => void;
};

type HeaderState = {
  showBackToTopButton: boolean;
};

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {
    showBackToTopButton: false
  };

  resetFilterCriteria = () => {
    const {
      setSelectedCategory,
      setFilterSortBy,
      clearSelectedTags
    } = this.props;

    setSelectedCategory(null);
    setFilterSortBy(FilterSortBy.NewestFirst);
    clearSelectedTags();
  };

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
    const {
      sortBy,
      selectedCategory,
      selectedTags,
      toggleTheme,
      openFilter,
      openAbout,
      infoOpen,
      filterLineTransition,
      setFilterLineTransition,
      menuOpen,
      toggleMenu
    } = this.props;

    const { showBackToTopButton } = this.state;
    const { resetFilterCriteria } = this;

    return (
      <HeaderWrapper
        style={{
          transform: infoOpen ? "translateX(-100%)" : "translateX(0)"
        }}
      >
        <InnerHeaderWrapper>
          <LogoAreaWrapper>
            <div
              style={{
                opacity: showBackToTopButton ? 1 : 0,
                visibility: showBackToTopButton ? "visible" : "hidden"
              }}
            >
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
            </div>

            <LogoButtonWrapper
              style={{
                opacity: showBackToTopButton ? 0 : 1,
                visibility: showBackToTopButton ? "hidden" : "visible"
              }}
            >
              <button
                aria-label="Reset Filter Criteria"
                onClick={resetFilterCriteria}
              >
                <Logo />
              </button>
            </LogoButtonWrapper>
          </LogoAreaWrapper>
          <FilterButtonWrapper>
            <FilterButton
              openFilter={() => {
                openFilter();
                if (menuOpen) {
                  setTimeout(() => {
                    toggleMenu();
                  }, 300);
                }
              }}
              sortBy={sortBy}
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
              lineTransition={filterLineTransition}
              setlineTransition={setFilterLineTransition}
            />
          </FilterButtonWrapper>
          <MenuButtonWrapper>
            <MenuButton toggleMenu={toggleMenu} menuOpen={menuOpen} />
          </MenuButtonWrapper>
        </InnerHeaderWrapper>
        <Menu
          style={{
            transform: menuOpen ? "translateY(0)" : "translateY(-100%)"
          }}
        >
          <div>
            <button
              onClick={() => {
                openAbout();
                if (menuOpen) {
                  setTimeout(() => {
                    toggleMenu();
                  }, 300);
                }
              }}
            >
              About
            </button>
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

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  min-height: 60px;
  background-color: ${props => props.theme.backgroundColor};
  z-index: 1000;
  padding: 0 10px;
  transition: background-color ${props => props.theme.transition},
    transform ${props => props.theme.transition};
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
  user-select: none;
`;

const LogoAreaWrapper = styled.div`
  ${commonInnerHeaderStyles};

  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "left-position";

  > div {
    grid-area: left-position;
    transition: opacity ${props => props.theme.transition},
      visibility ${props => props.theme.transition};
  }
`;

const LogoButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 0;
  }
`;

const FilterButtonWrapper = styled.div`
  ${commonInnerHeaderStyles};
  justify-content: center;

  button {
    color: ${props => props.theme.accentColor};
  }
`;

const MenuButtonWrapper = styled.div`
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
