import React from "react";
import styled from "../../utils/styled-components";

import SearchIcon from "../icons/Search";

interface TagSearchProps {
  close: () => void;
  tags: Array<string>;
  selectedTags: Array<string>;
  addTagToSelectedTags: (tagToAdd: string) => void;
  removeTagFromSelectedTags: (tagToRemove: string) => void;
}

interface TagSearchState {
  searchValue: string;
}

class TagSearch extends React.Component<TagSearchProps, TagSearchState> {
  state = {
    searchValue: ""
  };

  updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    this.setState({ searchValue: newSearchValue });
  };

  render() {
    const {
      close,
      tags,
      selectedTags,
      addTagToSelectedTags,
      removeTagFromSelectedTags
    } = this.props;

    const { searchValue } = this.state;
    const { updateSearchValue } = this;

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
              />
              <div>
                <SearchIcon />
              </div>
            </div>
          </div>
          <ul>
            {filteredTags.map(tag => (
              <TagListItem key={tag} onClick={() => addTagToSelectedTags(tag)}>
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

  padding: 20px;
`;

const TagListWrapper = styled.div`
  > div {
    > div {
      display: flex;

      input {
        width: 100%;
        padding: 35px 0;
        background-color: ${props => props.theme.accentColor};
        border: none;
        outline: none;
      }

      > div {
        display: flex;
        align-items: center;

        svg {
          width: 18px;
        }
      }
    }

    &:after {
      content: "";
      display: block;
      margin: 0 0 35px 0;
      height: 1px;
      width: 100%;
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

    li {
      padding: 5px 0;
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
