import React from "react";
import styled from "../../utils/styled-components";
import disableScrolling from "../../utils/disableScrolling";

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

enum SectionOpen {
  None,
  Info,
  About
}

type SiteProps = {
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
};

type SiteState = {
  menuOpen: boolean;
};

class Site extends React.Component<SiteProps, SiteState> {
  state = {
    menuOpen: false
  };

  historyPopStateHandler = (event: PopStateEvent) => {
    if (event.state === SectionOpen.None) {
      if (this.props.info.open) {
        this.props.closeInfo();
      } else if (this.props.aboutOpen) {
        this.props.closeAbout();
      }
    } else if (event.state === SectionOpen.Info) {
      this.props.openInfo(this.props.info.post);
    } else if (event.state === SectionOpen.About) {
      this.props.openAbout();
    }
  };

  componentDidMount() {
    history.replaceState(SectionOpen.None, "");
    window.addEventListener("popstate", this.historyPopStateHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.historyPopStateHandler);
  }

  toggleMenu = () => {
    const { menuOpen } = this.state;

    if (menuOpen) {
      this.setState({ menuOpen: false });
    } else {
      this.setState({ menuOpen: true });
    }
  };

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
      openFilter,
      closeFilter,
      setFilterSortBy,
      openAbout,
      info,
      filter,
      aboutOpen,
      filterLineTransition,
      setFilterLineTransition
    } = this.props;

    const { menuOpen } = this.state;
    const { toggleMenu } = this;

    return (
      <SiteWrapper>
        <Filter
          isOpen={filter.open}
          close={closeFilter}
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
          openFilter={openFilter}
          openAbout={() => {
            openAbout();
            history.pushState(SectionOpen.About, "");
          }}
          infoOpen={info.open}
          filterLineTransition={filterLineTransition}
          setFilterLineTransition={setFilterLineTransition}
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
        />
        <About isOpen={aboutOpen} close={() => history.back()} />
        <List
          posts={posts}
          openInfo={(post: Post) => {
            openInfo(post);
            history.pushState(SectionOpen.Info, "");
          }}
          infoOpen={info.open}
          filterOpen={filter.open}
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          sortBy={filter.sortBy}
          selectedCategory={filter.selectedCategory}
          selectedTags={filter.selectedTags}
        />
        <Info
          isOpen={info.open}
          post={info.post}
          close={() => history.back()}
          selectedCategory={filter.selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTags={filter.selectedTags}
          addTagToSelectedTags={addTagToSelectedTags}
          filterLineTransition={filterLineTransition}
          setFilterLineTransition={setFilterLineTransition}
          sortBy={filter.sortBy}
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
