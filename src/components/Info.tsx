import React from "react";
import styled from "../utils/styled-components";
import Img from "gatsby-image";

import { Post } from "../pages/index";

interface InfoProps {
  closeInfo: () => void;
  post: Post;
}

const Info: React.SFC<InfoProps> = ({ closeInfo, post }) => (
  <InfoContainer>
    <InnerContainer>
      <CloseButtonContainer>
        <button onClick={closeInfo}>Close</button>
      </CloseButtonContainer>
      <DetailsContainer>
        <div>
          <a href={post.link} rel="noreferrer noopener" target="_blank">
            <div>{post.title}</div>
            <Img fluid={post.image.fluid} />
          </a>
          <div>
            <div>
              <div>Added On</div>
              <div>{post.createdAt}</div>
            </div>
            <div>
              <div>Category</div>
              <div>{post.categories[0]}</div>
            </div>
            <div>
              {/**
               * Handle number of tags (ask jsutts
               * if every post will have a least one).
               */}
              <div>Tags</div>
              <div>
                {post.tags.map(tag => (
                  <>
                    <span>{tag}</span>,
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DetailsContainer>
    </InnerContainer>
  </InfoContainer>
);

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
