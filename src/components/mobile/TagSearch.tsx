import React from "react";
import styled from "../../utils/styled-components";

import SearchIcon from "../icons/Search";
import CrossIcon from "../icons/Cross";

import { filterTags } from "../../utils/filterTags";

type TagSearchProps = {
  close: () => void;
  tags: Array<string>;
  selectedTags: Array<string>;
  addTagToSelectedTags: (tagToAdd: string) => void;
  removeTagFromSelectedTags: (tagToRemove: string) => void;
};

type TagSearchState = {
  searchValue: string;
  inputFocused: boolean;
};

class TagSearch extends React.Component<TagSearchProps, TagSearchState> {
  state: Readonly<TagSearchState> = {
    searchValue: "",
    inputFocused: false
  };

  updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    this.setState({ searchValue: newSearchValue });
  };

  clearSearchValue = () => this.setState({ searchValue: "" });

  focusInput = () => this.setState({ inputFocused: true });
  blurInput = () => this.setState({ inputFocused: false });

  render() {
    const {
      close,
      tags,
      selectedTags,
      addTagToSelectedTags,
      removeTagFromSelectedTags
    } = this.props;

    const { searchValue, inputFocused } = this.state;
    const { updateSearchValue, clearSearchValue, focusInput, blurInput } = this;

    const filteredTags = filterTags(tags, searchValue);

    return (
      <TagSearchWrapper>
        <TagListWrapper>
          <div>
            <div>
              <input
                value={searchValue}
                onChange={updateSearchValue}
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder={inputFocused ? "" : "Search Tags..."}
                onFocus={focusInput}
                onBlur={blurInput}
                /**
                 * TODO:
                 * Make it so that when the search icon div is pressed,
                 * it also causes the input box to be focused. This will
                 * require a ref to the input box to call the `.focus()`
                 * method.
                 */
              />
              <div>
                {searchValue === "" ? (
                  <div>
                    <SearchIcon />
                  </div>
                ) : (
                  <button onClick={clearSearchValue}>
                    <CrossIcon />
                  </button>
                )}
              </div>
            </div>
          </div>
          {filteredTags.length === 0 ? (
            <span>No tags match your search.</span>
          ) : (
            <ul>
              {filteredTags.map(tag => (
                <TagListItem key={tag}>
                  <div onClick={() => addTagToSelectedTags(tag)}>{tag}</div>
                  <div
                    onClick={() => removeTagFromSelectedTags(tag)}
                    style={{
                      display: selectedTags.includes(tag) ? "flex" : "none"
                    }}
                  >
                    <CrossIcon />
                  </div>
                </TagListItem>
              ))}
            </ul>
          )}
        </TagListWrapper>
        <CloseTagSearchWrapper>
          <button onClick={close}>Back to Filter</button>
        </CloseTagSearchWrapper>
      </TagSearchWrapper>
    );
  }
}

export default TagSearch;

const TagSearchWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.accentColor};
  z-index: 100000;
`;

const TagListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);

  > div {
    > div {
      display: flex;
      justify-content: space-between;

      input {
        flex: 1;
        min-width: 0;
        padding: 55px 0 35px 20px;
        background-color: ${props => props.theme.accentColor};
        border: none;
        outline: none;

        &::placeholder {
          color: #060606;
          text-transform: uppercase;
          opacity: 1;
        }
      }

      > div {
        display: flex;
        align-items: center;
        margin-top: 20px;

        svg {
          width: 18px;
        }

        > div,
        > button {
          padding: 20px;
          display: flex;
          align-items: center;
        }
      }
    }

    &:after {
      content: "";
      display: block;
      margin: 0 20px 35px 20px;
      height: 1px;
      width: calc(100% - 40px);
      background-color: #060606;
    }
  }

  span {
    color: #060606;
    display: flex;
    justify-content: center;
  }

  ul {
    flex: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    color: #060606;
    overflow: auto;
    margin-bottom: 20px;
  }
`;

const TagListItem = styled.li`
  display: flex;
  justify-content: space-between;
  user-select: none;

  div:first-child {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 5px 20px;
  }

  div:last-child {
    padding: 0 20px;
    display: flex;
    align-items: center;

    svg {
      width: 12px;
    }
  }
`;

const CloseTagSearchWrapper = styled.div`
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
