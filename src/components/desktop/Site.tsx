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
      />
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
`;
