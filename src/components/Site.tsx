import React from "react";
import memoize from "memoize-one";
import MediaQuery from "react-responsive";

import { Post, FilterSortBy, InfoType, FilterType } from "../utils/types";

import MobileSite from "./mobile/Site";
import DesktopSite from "./desktop/Site";
import GlobalStyles from "./GlobalStyles";

import sortPosts from "../utils/sortPosts";

const memoizedSortPosts = memoize(sortPosts);

interface SiteProps {
  toggleTheme: () => void;
  posts: Array<Post>;
}

interface SiteState {
  info: InfoType;
  filter: FilterType;
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

  /* ----------------- Infwo ----------------- */

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

  setFilterSortBy = (sortBy: FilterSortBy) =>
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        sortBy
      }
    }));

  /* ----------------- About ---------------- */

  openAbout = () => this.setState({ aboutOpen: true });
  closeAbout = () => this.setState({ aboutOpen: false });

  /* ---------------------------------------- */

  render() {
    const {
      openInfo,
      closeInfo,
      openFilter,
      closeFilter,
      setFilterSortBy,
      openAbout,
      closeAbout
    } = this;

    const { toggleTheme, posts } = this.props;
    const { info, filter, aboutOpen } = this.state;

    const sortedPosts: Array<Post> = memoizedSortPosts(posts, filter.sortBy);

    return (
      <>
        <MediaQuery maxWidth={1023}>
          <MobileSite
            toggleTheme={toggleTheme}
            posts={sortedPosts}
            openInfo={openInfo}
            closeInfo={closeInfo}
            openFilter={openFilter}
            closeFilter={closeFilter}
            setFilterSortBy={setFilterSortBy}
            openAbout={openAbout}
            closeAbout={closeAbout}
            info={info}
            filter={filter}
            aboutOpen={aboutOpen}
          />
        </MediaQuery>
        <MediaQuery minWidth={1024}>
          <DesktopSite
            toggleTheme={toggleTheme}
            posts={sortedPosts}
            openInfo={openInfo}
            closeInfo={closeInfo}
            openFilter={openFilter}
            closeFilter={closeFilter}
            setFilterSortBy={setFilterSortBy}
            openAbout={openAbout}
            closeAbout={closeAbout}
            info={info}
            filter={filter}
            aboutOpen={aboutOpen}
          />
          ) }
        </MediaQuery>
        <GlobalStyles />
      </>
    );
  }
}

export default Site;
