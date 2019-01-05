import React from "react";
import styled from "../../utils/styled-components";

import { FilterSortBy } from "../../utils/types";

import SortByList from "../SortByList";
import CategoryList from "../CategoryList";
import SearchIcon from "../icons/Search";
import TagSearch from "./TagSearch";

interface FilterProps {
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
}

interface FilterState {
  tagSearchOpen: boolean;
}

class Filter extends React.Component<FilterProps, FilterState> {
  state = {
    tagSearchOpen: false
  };

  openTagSearch = () => this.setState({ tagSearchOpen: true });
  closeTagSearch = () => this.setState({ tagSearchOpen: false });

  render() {
    const {
      isOpen,
      close,
      sortBy,
      setSortBy,
      categories,
      selectedCategory,
      setSelectedCategory,
      tags,
      selectedTags,
      addTagToSelectedTags,
      removeTagFromSelectedTags
    } = this.props;

    const { tagSearchOpen } = this.state;
    const { openTagSearch, closeTagSearch } = this;

    return (
      <>
        <FilterWrapper
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(-100%)"
          }}
        >
          <FilterContents>
            <div>
              <div
                onClick={openTagSearch}
                style={{
                  paddingBottom: selectedTags.length === 0 ? "35px" : "25px"
                }}
              >
                <h3>Search Tags...</h3>
                <div>
                  <SearchIcon />
                </div>
              </div>
              <div>
                <ul
                  style={{
                    paddingBottom: selectedTags.length === 0 ? "0" : "25px"
                  }}
                >
                  {selectedTags.map(tag => (
                    <TagListItem
                      key={tag}
                      onClick={() => addTagToSelectedTags(tag)}
                    >
                      <span>{tag}</span>
                      <span
                        onClick={() => removeTagFromSelectedTags(tag)}
                        style={{
                          visibility: selectedTags.includes(tag)
                            ? "visible"
                            : "hidden"
                        }}
                      >
                        x
                      </span>
                    </TagListItem>
                  ))}
                </ul>
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
            <button onClick={close}>Back to Results</button>
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
  padding: 20px;
  height: calc(100% - 60px);
  max-height: calc(100% - 60px);
  overflow: auto;

  > div {
    h3 {
      text-transform: uppercase;
      font-weight: normal;
      margin: 0;
    }

    &:not(:last-child):after {
      content: "";
      display: block;
      margin: 0 0 35px 0;
      height: 1px;
      width: 100%;
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
    > div:first-child {
      display: flex;
      justify-content: space-between;

      padding: 35px 0;

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
          padding: 5px 0;
        }
      }
    }
  }
`;

const TagListItem = styled.li`
  display: flex;
  justify-content: space-between;

  span:first-child {
    display: flex;
    align-items: center;
  }

  span:last-child {
    padding: 5px 10px;
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
