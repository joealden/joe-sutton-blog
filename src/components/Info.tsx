import React from "react";
import styled from "../utils/styled-components";
import Img from "gatsby-image";

import { Post } from "../pages/index";

interface InfoProps {
  closeInfo: () => void;
  post: Post;
}

const Info: React.SFC<InfoProps> = ({ closeInfo, post }) => {
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
              <Img fluid={post.image.fluid} />
            </InfoLink>
            <InfoItemContainer>
              <InfoItem>
                <div>Added on</div>
                <div>{dateString}</div>
              </InfoItem>
              <InfoItem>
                <div>Category</div>
                <Category onClick={() => alert("Placeholder")}>
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
                      <>
                        <Tag onClick={() => alert("Placeholder")}>
                          {currentTag}
                        </Tag>
                        {punctuation}
                      </>
                    ];
                  }, [])}
                </div>
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
  position: fixed;
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
  padding: 0 20px;

  button {
    transition: color ${props => props.theme.transition};

    &:hover {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;

  div {
    width: 100%;
  }
`;

const InfoTitle = styled.div`
  font-size: 30px;
  margin-bottom: 25px;

  @media screen and (min-width: 2000px) {
    margin-bottom: 30px;
  }
`;

const InfoLink = styled.a`
  color: ${props => props.theme.foregroundColor};
  text-decoration: none;

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
      color: ${props => props.theme.accentColor};
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
      background-color: ${props => props.theme.backgroundColorTranslucent};
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

const Tag = styled.span`
  cursor: pointer;
  transition: color ${props => props.theme.transition};

  &:hover {
    color: ${props => props.theme.accentColor};
  }
`;

const Category = styled.span`
  cursor: pointer;
  transition: color ${props => props.theme.transition};

  &:hover {
    color: ${props => props.theme.accentColor};
  }
`;
