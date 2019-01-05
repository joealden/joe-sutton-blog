import React from "react";
import styled from "../../utils/styled-components";

import { Post, FilterSortBy, InfoType, FilterType } from "../../utils/types";

import Filter from "./Filter";
import MainContainer from "./MainContainer";
import Info from "./Info";
import About from "./About";
import Underlay from "./Underlay";
import Overlay from "./Overlay";
import Header from "./Header";
import List from "./List";

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
}

const Site: React.FunctionComponent<SiteProps> = ({
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
  aboutOpen
}) => {
  const handleOverlayClick = () => {
    if (info.open) {
      closeInfo();
    }
    if (filter.open) {
      closeFilter();
    }
    if (aboutOpen) {
      closeAbout();
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
  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (info.open || filter.open || aboutOpen) {
      event.preventDefault();
    }
  };

  const anySectionIsOpen = info.open || filter.open || aboutOpen;

  return (
    <SiteContainer onWheel={handleWheel}>
      <Filter
        isOpen={filter.open}
        close={closeFilter}
        sortBy={filter.sortBy}
        setSortBy={setFilterSortBy}
        categories={categories}
        selectedCategory={filter.selectedCategory}
        setSelectedCategory={setSelectedCategory}
        tags={tags}
        selectedTags={filter.selectedTags}
      />
      <MainContainer infoOpen={info.open}>
        <Underlay />
        <Info
          closeInfo={closeInfo}
          post={info.post}
          selectedCategory={filter.selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTags={filter.selectedTags}
          addTagToSelectedTags={addTagToSelectedTags}
        />
        <About isOpen={aboutOpen} close={closeAbout} />
        <HeaderAndListContainer
          style={{
            opacity: anySectionIsOpen ? 0.3 : 1
          }}
        >
          <Overlay
            visible={anySectionIsOpen}
            handleClick={handleOverlayClick}
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
            openAbout={openAbout}
          />
          <List
            openInfo={openInfo}
            posts={posts}
            sortBy={filter.sortBy}
            selectedCategory={filter.selectedCategory}
          />
        </HeaderAndListContainer>
      </MainContainer>
    </SiteContainer>
  );
};

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

  transition: opacity ${props => props.theme.transition};
`;
