import React from "react";
import styled from "../utils/styled-components";

import { Post } from "../pages/index";

import Filter from "./Filter";
import MainContainer from "./MainContainer";
import Info from "./Info";
import Underlay from "./Underlay";
import Overlay from "./Overlay";
import Header from "./Header";
import ListContainer from "./ListContainer";

export enum FilterSortBy {
  NewestFirst,
  OldestFirst,
  AToZ,
  ZToA,
  /**
   * Two random states needed so that
   * memoization triggers correctly
   */
  Random1,
  Random2
}

interface SiteProps {
  toggleTheme: () => void;
  posts: Array<Post>;
}

interface SiteState {
  infoOpen: boolean;
  filter: {
    open: boolean;
    sortBy: FilterSortBy;
  };
}

class Site extends React.Component<SiteProps, SiteState> {
  state = {
    infoOpen: false,
    filter: {
      open: false,
      sortBy: FilterSortBy.NewestFirst
    }
  };

  openInfo = () => this.setState({ infoOpen: true });
  closeInfo = () => this.setState({ infoOpen: false });

  toggleInfo = () => {
    if (this.state.infoOpen) {
      this.closeInfo();
    } else {
      this.openInfo();
    }
  };

  openFilter = () =>
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        open: true
      }
    }));

  closeFilter = () =>
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        open: false
      }
    }));

  toggleFilter = () => {
    if (this.state.filter.open) {
      this.closeFilter();
    } else {
      this.openFilter();
    }
  };

  handleOverlayClick = () => {
    const { infoOpen, filter } = this.state;

    if (infoOpen) {
      this.closeInfo();
    }

    if (filter.open) {
      this.closeFilter();
    }
  };

  /**
   * TODO:
   * This stops scrolling with the mousewheel, but
   * scrolling also needs to be stopped when the user
   * uses either the arrow buttons or the actual scroll
   * bar.
   *
   * Find solutions to these problem scenarios.
   */

  handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    const { infoOpen, filter } = this.state;

    if (infoOpen || filter.open) {
      event.preventDefault();
    }
  };

  render() {
    const { toggleTheme, posts } = this.props;
    const { infoOpen, filter } = this.state;
    const { handleWheel, toggleInfo, toggleFilter, handleOverlayClick } = this;

    return (
      <SiteContainer onWheel={handleWheel}>
        <Filter filterOpen={filter.open} />
        <MainContainer infoOpen={infoOpen}>
          <Info toggleInfo={toggleInfo} />
          <HeaderAndListContainer>
            <Underlay />
            <Overlay
              infoOpen={infoOpen}
              filterOpen={filter.open}
              handleClick={handleOverlayClick}
            />
            <Header toggleTheme={toggleTheme} toggleFilter={toggleFilter} />
            <ListContainer
              toggleInfo={toggleInfo}
              posts={posts}
              sortBy={filter.sortBy}
            />
          </HeaderAndListContainer>
        </MainContainer>
      </SiteContainer>
    );
  }
}

export default Site;

const SiteContainer = styled.main`
  --logo-width: 60px;
  --column-width: calc(calc(100vw - var(--logo-width)) / 4);
`;

const HeaderAndListContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;
