import React from "react";
import styled from "../../utils/styled-components";
import Img from "gatsby-image";

import { Post, FilterLineTransition, FilterSortBy } from "../../utils/types";

import { createDateString } from "../../utils/createDateString";

import FilterButton from "../FilterButton";
import Arrow from "../icons/Arrow";

type InfoProps = {
  isOpen: boolean;
  post: Post;
  close: () => void;
  selectedCategory: string | null;
  setSelectedCategory: (selectedCategory: string | null) => void;
  selectedTags: Array<string>;
  addTagToSelectedTags: (tagToAdd: string) => void;

  filterLineTransition: FilterLineTransition;
  setFilterLineTransition: (lineTransition: FilterLineTransition) => void;
  sortBy: FilterSortBy;
};

class Info extends React.Component<InfoProps> {
  infoWrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  onCloseButtonClick = () => {
    const { close } = this.props;
    const { infoWrapperRef } = this;

    close();

    setTimeout(() => {
      if (infoWrapperRef.current !== null) {
        infoWrapperRef.current.scrollTo({
          top: 0,
          left: 0
        });
      }
    }, 300);
  };

  onCategoryClick = () => {
    const { post, selectedCategory, setSelectedCategory } = this.props;

    if (post.category !== selectedCategory) {
      setSelectedCategory(post.category);
    }
  };

  onTagClick = (tag: string) => {
    const { selectedTags, addTagToSelectedTags } = this.props;

    if (!selectedTags.includes(tag)) {
      addTagToSelectedTags(tag);
    }
  };

  render() {
    const {
      isOpen,
      post,
      selectedCategory,
      selectedTags,
      filterLineTransition,
      setFilterLineTransition,
      sortBy
    } = this.props;

    const { onCloseButtonClick, onCategoryClick, onTagClick } = this;

    const dateString = createDateString(post.createdAt);

    return (
      <InfoWrapper
        ref={this.infoWrapperRef}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)"
        }}
      >
        <div>
          <FilterButton
            onClick={onCloseButtonClick}
            buttonText="Back"
            lineTransition={filterLineTransition}
            setLineTransition={setFilterLineTransition}
            sortBy={sortBy}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
          />
        </div>
        <div>
          <InfoLink href={post.link} rel="noreferrer noopener" target="_blank">
            <div>
              <h2>
                <span>{post.title}</span>
                <span>
                  <Arrow />
                </span>
              </h2>
              <div>
                <span>Visit</span>
              </div>
            </div>
            <Img key={post.id} alt={post.title} fluid={post.image.fluid} />
          </InfoLink>
          <InfoItemContainer>
            <InfoItem>
              <div>Added on</div>
              <div>{dateString}</div>
            </InfoItem>
            <InfoItem>
              <div>Category</div>
              <Category
                onClick={onCategoryClick}
                className={
                  post.category === selectedCategory ? "selected-category" : ""
                }
              >
                {post.category}
              </Category>
            </InfoItem>
            <InfoItem>
              <div>Tags</div>
              <div>
                {post.tags.reduce((acc, currentTag, i) => {
                  const isLastTag = i === post.tags.length - 1;
                  const punctuation = isLastTag ? "." : ", ";

                  return [
                    ...acc,
                    <React.Fragment key={currentTag}>
                      <Tag
                        onClick={() => onTagClick(currentTag)}
                        className={
                          selectedTags.includes(currentTag)
                            ? "selected-tag"
                            : ""
                        }
                      >
                        {currentTag}
                      </Tag>
                      {punctuation}
                    </React.Fragment>
                  ];
                }, [])}
              </div>
            </InfoItem>
          </InfoItemContainer>
        </div>
      </InfoWrapper>
    );
  }
}

export default Info;

const InfoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${props => props.theme.backgroundColor};
  z-index: 10000;
  transition: transform ${props => props.theme.transition};

  display: flex;
  flex-direction: column;
  overflow-y: auto;

  > div:first-child {
    height: 60px;
    width: 100%;
    position: sticky;
    top: 0;
    background-color: ${props => props.theme.backgroundColor};
    z-index: 1000000000;

    button {
      padding: 18px 20px;
    }
  }

  > div:last-child {
    margin-top: 70px;
    margin-bottom: 20px;
  }
`;

const InfoLink = styled.a`
  color: ${props => props.theme.foregroundColor};
  outline: none;

  > div:first-child {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 12px;

    h2 {
      margin: 0;
      display: flex;

      span:first-child {
        display: inline-block;
        font-size: 7vw;
        letter-spacing: -0.24vw;
      }

      span:last-child {
        display: inline-block;

        svg {
          width: 3.1vw;
          height: 3.1vw;
          margin-top: 2.5vw;
          margin-left: 0.5vw;

          polygon {
            fill: ${props => props.theme.foregroundColor};
            transition: fill ${props => props.theme.transition};
          }
        }
      }
    }

    > div {
      display: flex;
      align-items: flex-end;
      margin-bottom: 0.7vw;

      span {
        color: ${props => props.theme.accentColor};
      }
    }
  }
`;

/* ------------------------------------------------------------ */

const InfoItemContainer = styled.div`
  margin-top: 25px;
  padding: 0 20px;
`;

const InfoItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  div:first-child {
    margin-bottom: 2px;
    color: #838383;
  }
`;

const Category = styled.span`
  cursor: pointer;
  transition: color ${props => props.theme.transition};

  &.selected-category {
    color: ${props => props.theme.accentColor};
  }
`;

const Tag = styled.span`
  cursor: pointer;
  transition: color ${props => props.theme.transition};

  &.selected-tag {
    color: ${props => props.theme.accentColor};
  }
`;
