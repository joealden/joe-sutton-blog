import React from "react";
import styled from "../../utils/styled-components";
import noScroll from "no-scroll";

import {
  Post,
  FilterSortBy,
  InfoType,
  FilterType,
  FilterLineTransition
} from "../../utils/types";

import Header from "./Header";
import Filter from "./Filter";
import About from "./About";
import List from "./List";
import Info from "./Info";

interface SiteProps {
  toggleTheme: () => void;
  posts: Array<Post>;
  categories: Array<string>;
  setSelectedCategory: (selectedCategory: string | null) => void;
  tags: Array<string>;
  addTagToSelectedTags: (tagToAdd: string) => void;
  removeTagFromSelectedTags: (tagToRemove: string) => void;
  clearSelectedTags: () => void;
  openInfo: (post: Post) => void;
  closeInfo: () => void;
  openFilter: () => void;
  closeFilter: () => void;
  setFilterSortBy: (sortBy: FilterSortBy) => void;
  openAbout: () => void;
  closeAbout: () => void;
  info: InfoType;
  filter: FilterType;
  aboutOpen: boolean;
  filterLineTransition: FilterLineTransition;
  setFilterLineTransition: (filterLineTransition: FilterLineTransition) => void;
}

class Site extends React.Component<SiteProps> {
  render() {
    const {
      toggleTheme,
      posts,
      categories,
      setSelectedCategory,
      tags,
      addTagToSelectedTags,
      removeTagFromSelectedTags,
      clearSelectedTags,
      openInfo,
      closeInfo,
      openFilter,
      closeFilter,
      setFilterSortBy,
      openAbout,
      closeAbout,
      info,
      filter,
      aboutOpen,
      filterLineTransition,
      setFilterLineTransition
    } = this.props;

    /* Lock and unlock scrolling when opening sections */

    const openAboutAndLockScroll = () => {
      openAbout();
      noScroll.on();
    };

    const closeAboutAndUnlockScroll = () => {
      closeAbout();
      noScroll.off();
    };

    const openFilterAndLockScroll = () => {
      openFilter();
      noScroll.on();
    };

    const closeFilterAndUnlockScroll = () => {
      closeFilter();
      noScroll.off();
    };

    const openInfoAndLockScroll = (post: Post) => {
      openInfo(post);
      noScroll.on();
    };

    const closeInfoAndUnlockScroll = () => {
      closeInfo();
      noScroll.off();
    };

    /* ----------------------------------------------- */

    return (
      <SiteWrapper>
        <Filter
          isOpen={filter.open}
          close={closeFilterAndUnlockScroll}
          sortBy={filter.sortBy}
          setSortBy={setFilterSortBy}
          categories={categories}
          selectedCategory={filter.selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addTagToSelectedTags={addTagToSelectedTags}
          removeTagFromSelectedTags={removeTagFromSelectedTags}
          tags={tags}
          selectedTags={filter.selectedTags}
        />
        <Header
          sortBy={filter.sortBy}
          setFilterSortBy={setFilterSortBy}
          selectedCategory={filter.selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTags={filter.selectedTags}
          clearSelectedTags={clearSelectedTags}
          toggleTheme={toggleTheme}
          openFilter={openFilterAndLockScroll}
          openAbout={openAboutAndLockScroll}
          infoOpen={info.open}
          filterLineTransition={filterLineTransition}
          setFilterLineTransition={setFilterLineTransition}
        />
        <About isOpen={aboutOpen} close={closeAboutAndUnlockScroll} />
        <List
          posts={posts}
          openInfo={openInfoAndLockScroll}
          infoOpen={info.open}
        />
        <Info
          isOpen={info.open}
          post={info.post}
          close={closeInfoAndUnlockScroll}
          selectedCategory={filter.selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTags={filter.selectedTags}
          addTagToSelectedTags={addTagToSelectedTags}
        />
      </SiteWrapper>
    );
  }
}

export default Site;

const SiteWrapper = styled.div`
  font-size: 18px;

  > * {
    -webkit-tap-highlight-color: transparent;
  }
`;
