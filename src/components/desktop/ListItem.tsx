import React from "react";
import Img from "gatsby-image";
import styled from "../../utils/styled-components";

import { Image } from "../../utils/types";

import Arrow from "../icons/Arrow";

type ListItemProps = {
  filterOpen: boolean;
  infoOpen: boolean;
  openInfo: () => void;
  setCurrentlyActiveItem: (id: string) => void;
  className: string;
  title: string;
  catagory: string;
  link: string;
  id: string;
  image: Image;
};

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  filterOpen,
  infoOpen,
  openInfo,
  setCurrentlyActiveItem,
  className,
  title,
  catagory,
  link,
  id,
  image
}) => (
  <StyledLi
    className={className}
    onMouseOver={() => setCurrentlyActiveItem(id)}
  >
    <a href={link} rel="noreferrer noopener" target="_blank">
      <InfoContainer
        className={filterOpen || infoOpen ? "disable-transitions" : ""}
        onClick={event => {
          event.preventDefault();
          openInfo();
        }}
      >
        <span>Info</span>
      </InfoContainer>
      <NameAndCatagoryContainer>
        <NameContainer
          className={filterOpen || infoOpen ? "disable-transitions" : ""}
        >
          <span>{title}</span>
          <span>
            <Arrow />
          </span>
        </NameContainer>
        <CatagoryContainer
          className={filterOpen || infoOpen ? "disable-transitions" : ""}
        >
          <span>{catagory}</span>
        </CatagoryContainer>
      </NameAndCatagoryContainer>
      <ImageContainer>
        <ImageWrapper
          className={filterOpen || infoOpen ? "disable-transitions" : ""}
        >
          <Img alt={title} fluid={image.fluid} />
        </ImageWrapper>
      </ImageContainer>
    </a>
  </StyledLi>
);

const StyledLi = styled.li`
  a {
    display: grid;
    grid-template-columns: 60px 3fr 1fr;
    cursor: pointer;
    color: ${props => props.theme.foregroundColor};
    /* Think about a11y of this */
    outline: none;
  }
`;

const InfoContainer = styled.div`
  width: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;

  visibility: hidden;
  opacity: 0;
  padding-bottom: 0.6vw;

  transition: opacity ${props => props.theme.transition},
    visibility ${props => props.theme.transition};

  span {
    line-height: 70%;
    transition: color ${props => props.theme.transition};
    writing-mode: vertical-lr;
    transform: rotate(180deg);

    padding: 0.6vw;
    user-select: none;
  }

  &:hover {
    span {
      color: ${props => props.theme.accentColor};
    }
  }

  &.disable-transitions {
    transition: none;

    span {
      transition: none;
    }
  }
`;

const NameAndCatagoryContainer = styled.div`
  overflow: hidden;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
`;

const NameContainer = styled.div`
  display: flex;

  span:first-child {
    display: inline-block;
    font-size: 6vw;
    line-height: 110%;
    letter-spacing: -0.24vw;
    margin-top: -0.5vw;
    color: ${props => props.theme.listColor};
    transition: color ${props => props.theme.transition};
  }

  span:last-child {
    display: inline-block;

    svg {
      width: 2vw;
      height: 2vw;
      margin-top: 0.55vw;
      margin-left: 0.3vw;

      polygon {
        opacity: 0;
        visibility: hidden;
        fill: ${props => props.theme.listColor};
        transition: fill ${props => props.theme.transition},
          opacity ${props => props.theme.transition},
          visibility ${props => props.theme.transition};
      }
    }
  }

  &.disable-transitions {
    span:first-child,
    span:last-child svg polygon {
      transition: none;
    }
  }
`;

const CatagoryContainer = styled.div`
  display: flex;
  align-items: flex-end;

  span {
    font-size: inherit;
    line-height: 70%;
    margin-bottom: 1.2vw;
    color: ${props => props.theme.foregroundColor};
    opacity: 0;
    visibility: hidden;
    transition: opacity ${props => props.theme.transition},
      visibility ${props => props.theme.transition},
      color ${props => props.theme.transition};
  }

  &.disable-transitions {
    span {
      transition: none;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ImageWrapper = styled.div`
  padding: 0.55vw 30px 0 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  visibility: hidden;

  transition: opacity ${props => props.theme.transition},
    visibility ${props => props.theme.transition};

  &.disable-transitions {
    transition: none;
  }
`;

export const PaddingListItem: React.FunctionComponent = () => (
  <EmptyStyledLi>
    <a>
      <InfoContainer />
      <NameAndCatagoryContainer />
      <ImageContainer />
    </a>
  </EmptyStyledLi>
);

const EmptyStyledLi = styled(StyledLi)`
  height: 8vw;

  a {
    cursor: default;
    height: 8vw;
  }
`;
