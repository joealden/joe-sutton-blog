import React from "react";
import Downshift from "downshift";
import styled from "../../utils/styled-components";

import { FilterSortBy } from "../../utils/types";

import SortByList from "../SortByList";
import CategoryList from "../CategoryList";

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
}

interface FilterState {
  searchFocused: boolean;
}

class Filter extends React.Component<FilterProps, FilterState> {
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
      selectedTags
    } = this.props;

    return (
      <FilterWrapper
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(-100%)"
        }}
      >
        <FilterContents>
          <div>
            <Downshift
              onChange={selection => alert(`You selected ${selection.value}`)}
              itemToString={item => (item ? item : "")}
            >
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem
              }) => (
                <div>
                  <input {...getInputProps()} />
                  <ul
                    {...getMenuProps({
                      style: {
                        marginBottom: isOpen ? "30px" : "0"
                      }
                    })}
                  >
                    {isOpen
                      ? tags
                          .filter(
                            item => !inputValue || item.includes(inputValue)
                          )
                          .map((tag, index) => (
                            <ListItem
                              {...getItemProps({
                                key: tag,
                                index,
                                item: tag,
                                style: {
                                  opacity: highlightedIndex === index ? 0.5 : 1
                                }
                              })}
                            >
                              {tag}
                            </ListItem>
                          ))
                      : null}
                  </ul>
                </div>
              )}
            </Downshift>
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
        <BackToResultsButton onClick={close}>
          Back to Results
        </BackToResultsButton>
      </FilterWrapper>
    );
  }
}

export default Filter;

const FilterWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;

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
    input {
      padding: 35px 0;
      width: 100%;
      background-color: ${props => props.theme.accentColor};
      border: none;
      color: #060606;
      opacity: 1;

      &::placeholder {
        color: #060606;
        opacity: 1;
        text-transform: uppercase;
      }
    }

    ul {
      max-height: 50vh;
      overflow: auto;

      li:first-child {
        padding-top: 0;
      }

      li:last-child {
        padding-bottom: 25px;
      }
    }
  }
`;

const ListItem = styled.div`
  background-color: ${props => props.theme.accentColor};
  padding: 8px 0;
`;

const BackToResultsButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  width: 100%;
  background-color: #101010;
  border-radius: 0;
  z-index: 1;
  color: ${props => props.theme.accentColor};
`;
