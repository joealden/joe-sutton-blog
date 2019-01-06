import React from "react";
import styled from "../../utils/styled-components";

import SearchIcon from "../icons/Search";
import CrossIcon from "../icons/Cross";

interface TagSearchProps {
  close: () => void;
  tags: Array<string>;
  selectedTags: Array<string>;
  addTagToSelectedTags: (tagToAdd: string) => void;
  removeTagFromSelectedTags: (tagToRemove: string) => void;
}

interface TagSearchState {
  searchValue: string;
  inputFocused: boolean;
}

class TagSearch extends React.Component<TagSearchProps, TagSearchState> {
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
      close,
      tags,
      selectedTags,
      addTagToSelectedTags,
      removeTagFromSelectedTags
    } = this.props;

    const { searchValue, inputFocused } = this.state;
    const { updateSearchValue, focusInput, blurInput } = this;

    const filteredTags = tags.filter(tag => {
      const lowercaseTag = tag.toLowerCase();
      const lowercaseSearchValue = searchValue.toLowerCase();
      return lowercaseTag.includes(lowercaseSearchValue);
    });

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
                <SearchIcon />
              </div>
            </div>
          </div>
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
  > div {
    > div {
      display: flex;

      input {
        width: 100%;
        padding: 55px 0 35px 20px;
        background-color: ${props => props.theme.accentColor};
        border: none;
        outline: none;

        &::placeholder {
          color: #060606;
          text-transform: uppercase;
        }
      }

      > div {
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-right: 20px;

        svg {
          width: 18px;
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

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    color: #060606;
    overflow: auto;
    max-height: calc(100vh - 240px);
  }
`;

const TagListItem = styled.li`
  display: flex;
  justify-content: space-between;

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
