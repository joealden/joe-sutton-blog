import React from "react";
import styled from "../utils/styled-components";

import { Post } from "../pages/index";

import Filter from "./Filter";
import MainContainer from "./MainContainer";
import Info from "./Info";
import About from "./About";
import Underlay from "./Underlay";
import Overlay from "./Overlay";
import Header from "./Header";
import ListContainer from "./ListContainer";

/**
 * Two random states needed so
 * that memoization triggers correctly.
 */
export enum FilterSortBy {
  NewestFirst,
  OldestFirst,
  AToZ,
  ZToA,
  Random1,
  Random2
}

interface SiteProps {
  toggleTheme: () => void;
  posts: Array<Post>;
}

interface SiteState {
  info: {
    open: boolean;
    post: Post;
  };
  filter: {
    open: boolean;
    sortBy: FilterSortBy;
  };
  aboutOpen: boolean;
}

class Site extends React.Component<SiteProps, SiteState> {
  state = {
    info: {
      open: false,
      post: this.props.posts[0]
    },
    filter: {
      open: false,
      sortBy: FilterSortBy.NewestFirst
    },
    aboutOpen: false
  };

  /* ----------------- Info ----------------- */

  openInfo = (post: Post) =>
    this.setState({
      info: {
        open: true,
        post
      }
    });

  closeInfo = () =>
    this.setState(prevState => ({
      info: {
        ...prevState.info,
        open: false
      }
    }));

  /* ---------------- Filter ---------------- */

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

  /* ----------------- About ---------------- */

  openAbout = () => this.setState({ aboutOpen: true });
  closeAbout = () => this.setState({ aboutOpen: false });

  /* ------------ Other Handlers ------------ */

  handleOverlayClick = () => {
    const { info, filter, aboutOpen } = this.state;

    if (info.open) {
      this.closeInfo();
    }
    if (filter.open) {
      this.closeFilter();
    }
    if (aboutOpen) {
      this.closeAbout();
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
    const { info, filter, aboutOpen } = this.state;

    if (info.open || filter.open || aboutOpen) {
      event.preventDefault();
    }
  };

  render() {
    const {
      openInfo,
      closeInfo,
      openFilter,
      openAbout,
      closeAbout,
      handleWheel,
      handleOverlayClick
    } = this;

    const { toggleTheme, posts } = this.props;
    const { info, filter, aboutOpen } = this.state;

    return (
      <SiteContainer onWheel={handleWheel}>
        <Filter open={filter.open} />
        <MainContainer infoOpen={info.open}>
          <Underlay />
          <Info closeInfo={closeInfo} post={info.post} />
          <About isOpen={aboutOpen} close={closeAbout} />
          <HeaderAndListContainer>
            <Overlay
              visible={info.open || filter.open || aboutOpen}
              handleClick={handleOverlayClick}
            />
            <Header
              toggleTheme={toggleTheme}
              openFilter={openFilter}
              openAbout={openAbout}
            />
            <ListContainer
              openInfo={openInfo}
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
  grid-column-start: 1;
  grid-column-end: 4;
`;
