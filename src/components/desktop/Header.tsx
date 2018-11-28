import React from "react";
import styled, { css } from "../../utils/styled-components";

import { FilterSortBy } from "../../utils/types";

import Circle from "../icons/Circle";
import Logo from "../icons/Logo";
import BackToTop from "../icons/BackToTop";

interface HeaderProps {
  sortBy: FilterSortBy;
  setFilterSortBy: (sortBy: FilterSortBy) => void;
  selectedCategory: string | null;
  setSelectedCategory: (selectedCategory: string | null) => void;
  toggleTheme: () => void;
  openFilter: () => void;
  openAbout: () => void;
}

interface HeaderState {
  showBackToTopButton: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {
    showBackToTopButton: false
  };

  shouldBackToTopButtonBeShown = () => {
    const { showBackToTopButton } = this.state;

    if (window.pageYOffset > 200) {
      if (showBackToTopButton === false) {
        this.setState({ showBackToTopButton: true });
      }
    } else {
      if (showBackToTopButton === true) {
        this.setState({ showBackToTopButton: false });
      }
    }
  };

  /* https://developers.google.com/web/updates/2016/06/passive-event-listeners */
  componentDidMount() {
    window.addEventListener("scroll", this.shouldBackToTopButtonBeShown, {
      passive: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.shouldBackToTopButtonBeShown);
  }

  logoClick = () => {
    const { setSelectedCategory, setFilterSortBy } = this.props;
    setSelectedCategory(null);
    setFilterSortBy(FilterSortBy.NewestFirst);
  };

  render() {
    const {
      toggleTheme,
      openFilter,
      openAbout,
      sortBy,
      selectedCategory
    } = this.props;

    const { showBackToTopButton } = this.state;
    const { logoClick } = this;

    const sortApplied = sortBy !== FilterSortBy.NewestFirst;
    const categoryApplied = selectedCategory !== null;
    const filterApplied = sortApplied || categoryApplied;

    return (
      <HeaderWrapper>
        <LogoWrapper onClick={logoClick}>
          <Logo />
        </LogoWrapper>
        <FilterAndBackToTopWrapper>
          <button
            onClick={openFilter}
            className={filterApplied ? "filter-applied" : ""}
          >
            <span>Filter</span>
          </button>
          <button
            aria-label="Back To Top"
            className={showBackToTopButton ? "" : "hidden"}
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
        </FilterAndBackToTopWrapper>
        <AboutAndThemeChangeWrapper>
          <button onClick={openAbout}>About</button>
          <button aria-label="Toggle Theme" onClick={toggleTheme}>
            <Circle />
          </button>
        </AboutAndThemeChangeWrapper>
      </HeaderWrapper>
    );
  }
}

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
  cursor: pointer;
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
  transition: border-color ${props => props.theme.transition};

  button:first-child {
    line-height: 100%;

    span {
      border-bottom: 1px solid ${props => props.theme.backgroundColor};
      transition: border-color ${props => props.theme.transition};
    }
  }

  button:first-child.filter-applied span {
    border-bottom: 1px solid ${props => props.theme.accentColor};
  }

  button:last-child {
    transition: opacity ${props => props.theme.transition},
      visibility ${props => props.theme.transition};
    opacity: 1;

    &:hover svg polygon {
      fill: ${props => props.theme.accentColor};
    }

    &.hidden {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

const AboutAndThemeChangeWrapper = styled.div`
  ${commonFlexHeaderStyles};
  border-left: 1px solid ${props => props.theme.lineColor};
  transition: border-color ${props => props.theme.transition};
`;
