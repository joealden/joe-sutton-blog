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
    />
    <Header
      sortBy={filter.sortBy}
      setFilterSortBy={setFilterSortBy}
      selectedCategory={filter.selectedCategory}
      setSelectedCategory={setSelectedCategory}
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
    />
  </SiteWrapper>
);

export default Site;

const SiteWrapper = styled.div`
  font-size: 18px;

  > * {
    -webkit-tap-highlight-color: transparent;
  }
`;
