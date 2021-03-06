import React from "react";
import styled from "../../utils/styled-components";

import { FilterSortBy } from "../../utils/types";

import SortByList from "../SortByList";
import CategoryList from "../CategoryList";

import SearchIcon from "../icons/Search";
import CrossIcon from "../icons/Cross";

import TagSearch from "./TagSearch";

type FilterProps = {
  isOpen: boolean;
  close: () => void;
  sortBy: FilterSortBy;
  setSortBy: (sortBy: FilterSortBy) => void;
  categories: Array<string>;
  selectedCategory: string | null;
  setSelectedCategory: (selectedCategory: string | null) => void;
  tags: Array<string>;
  selectedTags: Array<string>;
  addTagToSelectedTags: (tagToAdd: string) => void;
  removeTagFromSelectedTags: (tagToRemove: string) => void;
  clearSelectedTags: () => void;
};

type FilterState = {
  tagSearchOpen: boolean;
};

class Filter extends React.Component<FilterProps, FilterState> {
  state: Readonly<FilterState> = {
    tagSearchOpen: false
  };

  filterContentsRef: React.RefObject<HTMLDivElement> = React.createRef();

  openTagSearch = () => {
    const { filterContentsRef } = this;

    this.setState({ tagSearchOpen: true });

    if (filterContentsRef.current !== null) {
      filterContentsRef.current.scrollTo({
        top: 0,
        left: 0
      });
    }
  };

  closeTagSearch = () => this.setState({ tagSearchOpen: false });

  closeFilter = () => {
    const { close } = this.props;
    const { filterContentsRef } = this;

    close();
    setTimeout(() => {
      if (filterContentsRef.current !== null) {
        filterContentsRef.current.scrollTo({
          top: 0,
          left: 0
        });
      }
    }, 300);
  };

  render() {
    const {
      isOpen,
      sortBy,
      setSortBy,
      categories,
      selectedCategory,
      setSelectedCategory,
      tags,
      selectedTags,
      addTagToSelectedTags,
      removeTagFromSelectedTags,
      clearSelectedTags
    } = this.props;

    const { tagSearchOpen } = this.state;
    const { openTagSearch, closeTagSearch, closeFilter } = this;

    return (
      <>
        <FilterWrapper
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(-100%)"
          }}
        >
          <FilterContents ref={this.filterContentsRef}>
            <div>
              <div
                onClick={openTagSearch}
                style={{
                  paddingBottom: selectedTags.length === 0 ? "35px" : "20px"
                }}
              >
                <h3>Tags</h3>
                <div>
                  <SearchIcon />
                </div>
              </div>
              <div>
                {selectedTags.length !== 0 ? (
                  <>
                    <ul>
                      {selectedTags.map(tag => (
                        <TagListItem key={tag}>
                          <div>{tag}</div>
                          <div onClick={() => removeTagFromSelectedTags(tag)}>
                            <CrossIcon />
                          </div>
                        </TagListItem>
                      ))}
                    </ul>
                    <ClearAllButtonWrapper>
                      <button onClick={clearSelectedTags}>Clear All</button>
                    </ClearAllButtonWrapper>
                  </>
                ) : null}
              </div>
            </div>
            <div>
              <SortByList sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <div>
              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </FilterContents>
          <BackToResultsWrapper>
            <button onClick={closeFilter}>Back to Results</button>
          </BackToResultsWrapper>
        </FilterWrapper>
        {tagSearchOpen ? (
          <TagSearch
            close={closeTagSearch}
            tags={tags}
            selectedTags={selectedTags}
            addTagToSelectedTags={addTagToSelectedTags}
            removeTagFromSelectedTags={removeTagFromSelectedTags}
          />
        ) : null}
      </>
    );
  }
}

export default Filter;

const FilterWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${props => props.theme.accentColor};
  transition: transform ${props => props.theme.transition};
  z-index: 10000;
`;

const FilterContents = styled.div`
  color: #060606;
  height: calc(100% - 60px);
  max-height: calc(100% - 60px);
  overflow: auto;

  > div {
    h3 {
      text-transform: uppercase;
      margin: 0;
    }

    &:not(:last-child):after {
      content: "";
      display: block;
      margin: 0 20px 35px 20px;
      height: 1px;
      width: calc(100% - 40px);
      background-color: #060606;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        user-select: none;
      }

      li:first-child {
        padding-top: 25px;
      }

      li:last-child {
        padding-bottom: 35px;
      }
    }
  }

  > div:first-child {
    /* padding: 20px 20px 0 20px; */

    > div:first-child {
      display: flex;
      justify-content: space-between;

      padding: 55px 20px 35px 20px;

      > div {
        display: flex;
        align-items: center;

        svg {
          width: 18px;
        }
      }
    }

    > div:last-child {
      ul {
        li {
          padding: 0;
        }

        li:last-child {
          padding-bottom: 20px;
        }
      }
    }
  }

  > div:nth-child(2),
  > div:last-child {
    h3 {
      padding: 0 20px;
    }

    li {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`;

const TagListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  div:first-child {
    flex: 1;
    padding-left: 20px;
  }

  div:last-child {
    padding: 5px 20px;

    svg {
      width: 12px;
    }
  }
`;

const ClearAllButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin: 10px 0;
    padding: 15px 20px;
    color: #060606;
  }
`;

const BackToResultsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;

  button {
    border-radius: 0;
    background-color: #101010;
    color: ${props => props.theme.accentColor};
    width: 100%;
    height: 60px;
  }
`;
