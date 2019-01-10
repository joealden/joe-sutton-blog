import React from "react";
import styled from "../../utils/styled-components";
import Img from "gatsby-image";

import { Post } from "../../utils/types";

import InfoCategory from "./InfoCategory";
import InfoTags from "./InfoTags";

type InfoProps = {
  closeInfo: () => void;
  post: Post;
  selectedCategory: string | null;
  setSelectedCategory: (selectedCategory: string | null) => void;
  selectedTags: Array<string>;
  addTagToSelectedTags: (tagToAdd: string) => void;
};

const Info: React.FunctionComponent<InfoProps> = ({
  closeInfo,
  post,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  addTagToSelectedTags
}) => {
  const createdAt = new Date(post.createdAt);
  const date = createdAt.getDate();
  const month = createdAt.getMonth();
  const year = createdAt.getFullYear();
  const dateString = `${date}/${month}/${year}`;

  return (
    <InfoContainer>
      <InnerContainer>
        <CloseButtonContainer>
          <button onClick={closeInfo}>Close</button>
        </CloseButtonContainer>
        <DetailsContainer>
          <div>
            <InfoTitle>{post.title}</InfoTitle>
            <InfoLink
              href={post.link}
              rel="noreferrer noopener"
              target="_blank"
            >
              <Img key={post.id} alt={post.title} fluid={post.image.fluid} />
            </InfoLink>
            <InfoItemContainer>
              <InfoItem>
                <div>Added on</div>
                <div>{dateString}</div>
              </InfoItem>
              <InfoItem>
                <div>Category</div>
                <InfoCategory
                  postCategory={post.category}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </InfoItem>
              <InfoItem>
                <div>Tags</div>
                <InfoTags
                  postTags={post.tags}
                  selectedTags={selectedTags}
                  addTagToSelectedTags={addTagToSelectedTags}
                />
              </InfoItem>
            </InfoItemContainer>
          </div>
        </DetailsContainer>
      </InnerContainer>
    </InfoContainer>
  );
};

export default Info;

const InfoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: var(--column-width);

  transform: translateX(calc(var(--column-width) * -1));
  background-color: ${props => props.theme.backgroundColor};
  border-right: 1px solid ${props => props.theme.lineColor};
  transition: background-color ${props => props.theme.transition},
    border ${props => props.theme.transition};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 60px;
  min-height: 60px;
  padding: 0 20px;

  button {
    transition: color ${props => props.theme.transition};

    &:hover {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const DetailsContainer = styled.div`
  padding: 0 30px;

  /* Figure out a better way to align this */
  margin-top: calc(12.91vw - calc(20px * 1.5));
  @media screen and (max-width: 2000px) {
    margin-top: calc(12.91vw - calc(18px * 1.5));
  }
  @media screen and (max-width: 1300px) {
    margin-top: calc(12.91vw - calc(16px * 1.5));
  }

  div {
    width: 100%;
  }
`;

const InfoTitle = styled.div`
  font-size: calc(20px * 1.5);
  margin-bottom: 25px;

  @media screen and (max-width: 2000px) {
    margin-bottom: 30px;
    font-size: calc(18px * 1.5);
  }
  @media screen and (max-width: 1300px) {
    font-size: calc(16px * 1.5);
  }
`;

const InfoLink = styled.a`
  color: ${props => props.theme.foregroundColor};

  div {
    position: relative;

    &:hover {
      &:after {
        opacity: 1;
        visibility: visible;
      }
    }

    &:after {
      content: "Visit";
      display: flex;
      color: white;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      visibility: hidden;
      transition: opacity ${props => props.theme.transition},
        visibility ${props => props.theme.transition};
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const InfoItemContainer = styled.div`
  margin-top: 25px;

  @media screen and (min-width: 2000px) {
    margin-top: 30px;
  }
`;

const InfoItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;

    @media screen and (min-width: 2000px) {
      margin-bottom: 25px;
    }
  }

  div:first-child {
    margin-bottom: 2px;
    color: #838383;
  }
`;
