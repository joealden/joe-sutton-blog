import React from "react";
import styled, { css, keyframes } from "../../utils/styled-components";

import { FilterSortBy } from "../../utils/types";

import Circle from "../icons/Circle";
import Logo from "../icons/Logo";
import BackToTop from "../icons/BackToTop";

enum FilterLineTransition {
  Initial,
  Enter,
  Leave,
  /* Two different state so that reload is actually triggered */
  Reload1,
  Reload2
}

const calculateLineTransitionClass = (
  filterLineTransition: FilterLineTransition
) => {
  switch (filterLineTransition) {
    case FilterLineTransition.Initial:
      return "";
    case FilterLineTransition.Enter:
      return "filter-line-enter";
    case FilterLineTransition.Leave:
      return "filter-line-leave";
    case FilterLineTransition.Reload1:
      return "filter-line-reload-1";
    case FilterLineTransition.Reload2:
      return "filter-line-reload-2";
  }
};

interface HeaderProps {
  sortBy: FilterSortBy;
  setFilterSortBy: (sortBy: FilterSortBy) => void;
  selectedCategory: string | null;
  setSelectedCategory: (selectedCategory: string | null) => void;
  selectedTags: Array<string>;
  setSelectedTags: (selectedTags: Array<string>) => void;
  toggleTheme: () => void;
  openFilter: () => void;
  openAbout: () => void;
}

interface HeaderState {
  showBackToTopButton: boolean;
  filterLineTransition: FilterLineTransition;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {
    showBackToTopButton: false,
    filterLineTransition: FilterLineTransition.Initial
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

  /* TODO: Remove console.logs when line actually implemented */
  setLineTransitionState = (prevProps: HeaderProps) => {
    const newProps = this.props;
    const { state } = this;

    if (
      (state.filterLineTransition === FilterLineTransition.Initial ||
        state.filterLineTransition === FilterLineTransition.Leave) &&
      (newProps.sortBy !== FilterSortBy.NewestFirst ||
        newProps.selectedCategory !== null ||
        newProps.selectedTags.length !== 0)
    ) {
      this.setState({ filterLineTransition: FilterLineTransition.Enter });
      console.log("Line enter");
    } else if (
      state.filterLineTransition === FilterLineTransition.Enter ||
      state.filterLineTransition === FilterLineTransition.Reload1 ||
      state.filterLineTransition === FilterLineTransition.Reload2
    ) {
      if (
        newProps.sortBy === FilterSortBy.NewestFirst &&
        newProps.selectedCategory === null &&
        newProps.selectedTags.length === 0
      ) {
        this.setState({ filterLineTransition: FilterLineTransition.Leave });
        console.log("Line leave");
      } else if (
        prevProps.sortBy !== newProps.sortBy ||
        prevProps.selectedCategory !== newProps.selectedCategory ||
        prevProps.selectedTags !== newProps.selectedTags
      ) {
        if (state.filterLineTransition === FilterLineTransition.Reload1) {
          this.setState({ filterLineTransition: FilterLineTransition.Reload2 });
        } else {
          this.setState({ filterLineTransition: FilterLineTransition.Reload1 });
        }

        console.log("Line reload");
      }
    } else {
      console.log("not state change occured");
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

  componentDidUpdate(prevProps: HeaderProps) {
    this.setLineTransitionState(prevProps);
  }

  logoClick = () => {
    const {
      setSelectedCategory,
      setFilterSortBy,
      setSelectedTags
    } = this.props;

    setSelectedCategory(null);
    setFilterSortBy(FilterSortBy.NewestFirst);
    setSelectedTags([]);
  };

  render() {
    const {
      toggleTheme,
      openFilter,
      openAbout,
      sortBy,
      selectedCategory,
      selectedTags
    } = this.props;

    const { showBackToTopButton, filterLineTransition } = this.state;
    const { logoClick } = this;

    return (
      <HeaderWrapper>
        <LogoWrapper onClick={logoClick}>
          <Logo />
        </LogoWrapper>
        <FilterAndBackToTopWrapper>
          <button
            onClick={openFilter}
            className={calculateLineTransitionClass(filterLineTransition)}
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

/** --------------------------------------- /
 * NOTE:
 * This is horrible hacking code, please
 * replace with JavaScript animations pronto
 */

const filterLineAnimation1 = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`;

const filterLineAnimation2 = keyframes`
  from {
    width: 100%;
    margin-left: 0;
  }

  to {
    width: 0;
    margin-left: 100%;
  }
`;

const filterLineAnimation3 = keyframes`
  0% {
    width: 100%;
    margin-left: 0;
  }

  50% {
    width: 0;
    margin-left: 100%;
  }

  51% {
    margin-left: 0;
  }

  100% {
    width: 100%;
    margin-left: 0;
  }
`;

/* 'from' and 'to' used to trigger animation to reload */
const filterLineAnimation4 = keyframes`
  from {
    width: 100%;
    margin-left: 0;
  }

  50% {
    width: 0;
    margin-left: 100%;
  }

  51% {
    margin-left: 0;
  }

  to {
    width: 100%;
    margin-left: 0;
  }
`;

/* -------------------------------------- */

const FilterAndBackToTopWrapper = styled.div`
  ${commonFlexHeaderStyles};
  border-left: 1px solid ${props => props.theme.lineColor};
  transition: border-color ${props => props.theme.transition};

  button:first-child {
    /* NOTE: This offsets the bottom border height */
    margin-top: 1px;

    span:after {
      content: "";
      display: block;
      width: 0;
      height: 1px;
      background-color: ${props => props.theme.accentColor};
    }

    &.filter-line-enter span:after {
      animation: ${filterLineAnimation1} 0.3s ease forwards;
    }

    &.filter-line-leave span:after {
      animation: ${filterLineAnimation2} 0.3s ease forwards;
    }

    &.filter-line-reload-1 span:after {
      animation: ${filterLineAnimation3} 0.6s ease forwards;
    }

    &.filter-line-reload-2 span:after {
      animation: ${filterLineAnimation4} 0.6s ease forwards;
    }
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
