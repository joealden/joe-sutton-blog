import React from "react";
import styled from "../../utils/styled-components";

import {
  Post,
  FilterSortBy,
  InfoType,
  FilterType,
  FilterLineTransition
} from "../../utils/types";

import Filter from "./Filter";
import MainContainer from "./MainContainer";
import Info from "./Info";
import About from "./About";
import Underlay from "./Underlay";
import Header from "./Header";
import List from "./List";

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
  aboutOpen,
  filterLineTransition,
  setFilterLineTransition
}) => {
  const anySectionIsOpen = info.open || filter.open || aboutOpen;

  return (
    <SiteContainer>
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
        addTagToSelectedTags={addTagToSelectedTags}
        removeTagFromSelectedTags={removeTagFromSelectedTags}
        clearSelectedTags={clearSelectedTags}
      />
      <MainContainer infoOpen={info.open}>
        <Underlay />
        <Info
          close={closeInfo}
          isOpen={info.open}
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
          <Header
            anySectionOpen={anySectionIsOpen}
            sortBy={filter.sortBy}
            selectedCategory={filter.selectedCategory}
            selectedTags={filter.selectedTags}
            toggleTheme={toggleTheme}
            openFilter={openFilter}
            openAbout={openAbout}
            filterLineTransition={filterLineTransition}
            setFilterLineTransition={setFilterLineTransition}
          />
          <List
            openInfo={openInfo}
            posts={posts}
            sortBy={filter.sortBy}
            selectedCategory={filter.selectedCategory}
            selectedTags={filter.selectedTags}
            infoOpen={info.open}
            filterOpen={filter.open}
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
