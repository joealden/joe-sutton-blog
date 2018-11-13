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
          <InfoTitle>{post.title}</InfoTitle>
          <InfoLink href={post.link} rel="noreferrer noopener" target="_blank">
            <Img fluid={post.image.fluid} />
          </InfoLink>
          <InfoItemContainer>
            <InfoItem>
              <div>Added on</div>
              <div>{post.createdAt}</div>
            </InfoItem>
            <InfoItem>
              <div>Category</div>
              <div>{post.category}</div>
            </InfoItem>
            <InfoItem>
              {/**
               * Handle number of tags (ask jsutts
               * if every post will have a least one).
               */}
              <div>Tags</div>
              <div>
                <span>Placeholder</span>
              </div>
            </InfoItem>
          </InfoItemContainer>
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

const InfoTitle = styled.div`
  margin-bottom: 25px;

  @media screen and (min-width: 2000px) {
    margin-bottom: 30px;
  }
`;

const InfoLink = styled.a`
  color: ${props => props.theme.foregroundColor};
  text-decoration: none;
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
