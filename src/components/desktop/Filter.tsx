import React from "react";
import styled from "../../utils/styled-components";

import { FilterSortBy } from "../../utils/types";

import SortByList from "../SortByList";
import CategoryList from "../CategoryList";

import SearchIcon from "../icons/Search";
import CrossIcon from "../icons/Cross";

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
  searchValue: string;
  inputFocused: boolean;
};

class Filter extends React.Component<FilterProps, FilterState> {
  state = {
    searchValue: "",
    inputFocused: false
  };

  updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    this.setState({ searchValue: newSearchValue });
  };

  focusInput = () => this.setState({ inputFocused: true });
  blurInput = () => this.setState({ inputFocused: false });

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
      removeTagFromSelectedTags,
      clearSelectedTags
    } = this.props;

    const { searchValue, inputFocused } = this.state;
    const { updateSearchValue, focusInput, blurInput } = this;

    const filteredTags = tags.filter(tag => {
      const lowercaseTag = tag.toLowerCase();
      const lowercaseSearchValue = searchValue.toLowerCase();

      /**
       * Matches the start of words, for example:
       *
       * 'ha'/'ne' matches 'Neue Haas'.
       * 'est' does not match "Testing".
       */
      return (
        lowercaseTag.startsWith(lowercaseSearchValue) ||
        lowercaseTag.includes(` ${lowercaseSearchValue}`)
      );
    });

    return (
      <>
        <FilterContainer
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(-100%)"
          }}
        >
          <InnerFilter>
            <SortBy>
              <SortByList sortBy={sortBy} setSortBy={setSortBy} />
            </SortBy>
            <Categories>
              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </Categories>
            <SearchTags>
              <div>
                <div>
                  <input
                    value={searchValue}
                    onChange={updateSearchValue}
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder={inputFocused ? "" : "Search Tags"}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                  <div>
                    <SearchIcon />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <ul>
                    {selectedTags.map(tag => (
                      <SelectedTagsListItem key={tag}>
                        <div>{tag}</div>
                        <div onClick={() => removeTagFromSelectedTags(tag)}>
                          <CrossIcon />
                        </div>
                      </SelectedTagsListItem>
                    ))}
                  </ul>
                  {selectedTags.length === 0 ? null : (
                    <div>
                      <button onClick={clearSelectedTags}>Clear all</button>
                    </div>
                  )}
                </div>
                <div>
                  {filteredTags.length === 0 ? (
                    <span>No tags match your search.</span>
                  ) : (
                    <div>
                      <ul>
                        {filteredTags.map(tag => (
                          <FilteredTagsListItem key={tag}>
                            <span onClick={() => addTagToSelectedTags(tag)}>
                              {tag}
                            </span>
                            <div
                              onClick={() => removeTagFromSelectedTags(tag)}
                              style={{
                                display: selectedTags.includes(tag)
                                  ? ""
                                  : "none"
                              }}
                            >
                              <CrossIcon />
                            </div>
                          </FilteredTagsListItem>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </SearchTags>
            <FilterTitle>
              <h2>Filter</h2>
            </FilterTitle>
          </InnerFilter>
          <CloseButtonContainer>
            <button onClick={close}>Close</button>
          </CloseButtonContainer>
        </FilterContainer>
        <FilterCover />
      </>
    );
  }
}

export default Filter;

const FilterContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  background-color: ${props => props.theme.accentColor};
  color: #060606;
  transition: transform ${props => props.theme.transition};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 85px 0 25px 0;
`;

const InnerFilter = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr 1fr;
  grid-template-areas: "logo sort-by categories search-tags filter-title";

  > div {
    margin: 0 30px;
  }

  h3 {
    text-transform: uppercase;
    margin: 0 0 15px 0;

    &:after {
      content: "";
      display: block;
      margin-top: 15px;
      height: 1px;
      width: 100%;
      background-color: #060606;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      span {
        padding: 1px 0;
        transition: opacity ${props => props.theme.transition};
        user-select: none;
      }

      &:hover {
        span {
          opacity: 0.5;
        }
      }
    }
  }
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;

  button {
    color: #060606;
    transition: opacity ${props => props.theme.transition};

    &:hover {
      opacity: 0.5;
      color: #060606;
    }
  }
`;

const SortBy = styled.div`
  grid-area: sort-by;
`;

const Categories = styled.div`
  grid-area: categories;
`;

const SearchTags = styled.div`
  grid-area: search-tags;
  display: flex;
  flex-direction: column;

  > div:first-child {
    > div {
      display: flex;

      input {
        width: 100%;
        background-color: ${props => props.theme.accentColor};
        border: none;
        outline: none;
        /* NOTE: Was 15px, but for some reason was 1px off */
        padding-bottom: 14px;

        &::placeholder {
          color: #060606;
          text-transform: uppercase;
          opacity: 1;
        }
      }

      > div {
        display: flex;
        align-items: center;
        /* NOTE: Was 15px, but for some reason was 1px off */
        padding-bottom: 14px;

        svg {
          width: 18px;
        }
      }
    }

    &:after {
      content: "";
      display: block;
      height: 1px;
      width: 100%;
      background-color: #060606;
    }
  }

  > div:last-child {
    position: relative;
    flex: 1;

    > div:first-child {
      ul {
        margin-top: 15px;
      }

      > div {
        margin-top: 15px;
        display: flex;
        justify-content: flex-end;

        button {
          padding: 0;
          color: #060606;
        }
      }
    }

    > div:last-child {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${props => props.theme.accentColor};
      z-index: 100000;

      > span {
        display: block;
        margin-top: 15px;
      }

      > div {
        height: 100%;

        &:after {
          content: "";
          display: block;
          height: 1px;
          width: 100%;
          background-color: #060606;
        }

        ul {
          max-height: 100%;
          overflow: auto;

          li:first-child {
            margin-top: 15px;
          }

          li:last-child {
            margin-bottom: 15px;
          }

          /* Scrollbar CSS for Firefox */
          scrollbar-width: thin;
          scrollbar-color: #060606 ${props => props.theme.accentColor};

          /* Scrollbar CSS for Chrome and Safari */
          &::-webkit-scrollbar {
            width: 1px;
            background-color: ${props => props.theme.accentColor};
          }

          &::-webkit-scrollbar-thumb {
            background-color: #060606;
          }

          &::-webkit-scrollbar-track {
            margin: 15px 0;
          }
        }
      }
    }
  }
`;

const SelectedTagsListItem = styled.li`
  span:first-child {
    flex: 1;
  }

  div:last-child {
    svg {
      width: 12px;
    }
  }
`;

const FilteredTagsListItem = styled.li`
  span:first-child {
    flex: 1;
  }

  div:last-child {
    padding: 0 15px;

    svg {
      width: 12px;
    }
  }
`;

const FilterTitle = styled.div`
  grid-area: filter-title;
  writing-mode: vertical-rl;

  h2 {
    font-size: 5vw;
    margin: 0 60px 0 0;
    line-height: 80%;
    user-select: none;
  }
`;

/**
 * This is needed so that on macOS where they have overscrolling
 * in Chrome and Safari, the over scroll background color is the
 * same color as the current themes background color when the
 * filter is closed. If this didn't exist, the user would see
 * the bottom of the filter when they overscrolled at the top of
 * the page. This was not wanted.
 */
const FilterCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  /* Work out what this actually needs to be */
  height: 500px;

  z-index: 10001;
  background-color: ${props => props.theme.backgroundColor};
  transition: background-color ${props => props.theme.transition};
  transform: translateY(-100%);
`;
