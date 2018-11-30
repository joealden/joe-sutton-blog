import React from "react";
import memoize from "memoize-one";
import MediaQuery from "react-responsive";

import { Post, FilterSortBy, InfoType, FilterType } from "../utils/types";

import MobileSite from "./mobile/Site";
import DesktopSite from "./desktop/Site";
import GlobalStyles from "./GlobalStyles";

import sortPosts from "../utils/sortPosts";
import filterPosts from "../utils/filterPosts";

const memoizedSortPosts = memoize(sortPosts);
const memoizedFilterPosts = memoize(filterPosts);

interface SiteProps {
  toggleTheme: () => void;
  posts: Array<Post>;
  categories: Array<string>;
  tags: Array<string>;
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
      sortBy: FilterSortBy.NewestFirst,
      selectedCategory: null,
      selectedTags: []
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

  setFilterSortBy = (sortBy: FilterSortBy) =>
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        sortBy
      }
    }));

  setSelectedCategory = (selectedCategory: string) =>
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        selectedCategory
      }
    }));

  setSelectedTags = (selectedTags: Array<string>) =>
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        selectedTags
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
      setSelectedCategory,
      setSelectedTags,
      openAbout,
      closeAbout
    } = this;

    const { toggleTheme, posts, categories, tags } = this.props;
    const { info, filter, aboutOpen } = this.state;

    const filteredPosts = memoizedFilterPosts(
      posts,
      filter.selectedCategory,
      filter.selectedTags
    );

    const sortedPosts = memoizedSortPosts(filteredPosts, filter.sortBy);

    return (
      <>
        <MediaQuery maxWidth={1023}>
          <MobileSite
            toggleTheme={toggleTheme}
            posts={sortedPosts}
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            tags={tags}
            setSelectedTags={setSelectedTags}
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
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            tags={tags}
            setSelectedTags={setSelectedTags}
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
        <GlobalStyles />
      </>
    );
  }
}

export default Site;
