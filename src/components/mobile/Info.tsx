import React from "react";
import styled from "../../utils/styled-components";
import Img from "gatsby-image";

import { Post } from "../../utils/types";

import Arrow from "../icons/Arrow";

interface InfoProps {
  isOpen: boolean;
  post: Post;
  close: () => void;
}

/**
 * TODO:
 * Deduplicate the following between the desktop and mobile components:
 * - The date string calcuation (extract out into a function).
 * - All of the stuff inside the `InfoItemContainer` component.
 */

const Info: React.FunctionComponent<InfoProps> = ({ isOpen, close, post }) => {
  const createdAt = new Date(post.createdAt);
  const date = createdAt.getDate();
  const month = createdAt.getMonth();
  const year = createdAt.getFullYear();
  const dateString = `${date}/${month}/${year}`;

  return (
    <InfoWrapper
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(100%)"
      }}
    >
      <div>
        <button onClick={close}>Back</button>
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
          <Img alt={post.title} fluid={post.image.fluid} />
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
                  <React.Fragment key={currentTag}>
                    <Tag onClick={() => alert("Placeholder")}>{currentTag}</Tag>
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
};

export default Info;

const InfoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.backgroundColor};
  z-index: 10000;
  transition: transform ${props => props.theme.transition};

  display: flex;
  flex-direction: column;

  > div:first-child {
    button {
      padding: 20px;
    }
  }

  > div:last-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const InfoLink = styled.a`
  color: ${props => props.theme.foregroundColor};

  > div:first-child {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 12px;

    h2 {
      margin: 0;
      font-weight: normal;
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

  > div:last-child {
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

/* ------------------------------------------------------------ */
