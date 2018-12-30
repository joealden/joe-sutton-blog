import React from "react";
import styled from "../../utils/styled-components";

import { Post, FilterSortBy, InfoType, FilterType } from "../../utils/types";

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
  setSelectedTags: (selectedTags: Array<string>) => void;
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
  setSelectedTags,
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
}) => (
  <SiteWrapper>
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
    <Header
      sortBy={filter.sortBy}
      setFilterSortBy={setFilterSortBy}
      selectedCategory={filter.selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedTags={filter.selectedTags}
      setSelectedTags={setSelectedTags}
      toggleTheme={toggleTheme}
      openFilter={openFilter}
      openAbout={openAbout}
      infoOpen={info.open}
    />
    <About isOpen={aboutOpen} close={closeAbout} />
    <List posts={posts} openInfo={openInfo} infoOpen={info.open} />
    <Info
      isOpen={info.open}
      post={info.post}
      close={closeInfo}
      selectedCategory={filter.selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedTags={filter.selectedTags}
      setSelectedTags={setSelectedTags}
    />
    <TestingFixedWrapper>
      <button>test</button>
    </TestingFixedWrapper>
  </SiteWrapper>
);

export default Site;

const SiteWrapper = styled.div`
  font-size: 18px;

  > * {
    -webkit-tap-highlight-color: transparent;
  }
`;

const TestingFixedWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  min-height: 40px;
  background: #fbfafc;

  button {
    border-radius: 0;
    background-color: black;
    color: red;
    width: 100%;
  }
`;
