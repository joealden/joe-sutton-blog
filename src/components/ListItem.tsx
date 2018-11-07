import React from "react";
import styled from "../utils/styled-components";

import Arrow from "../components/icons/Arrow";

interface ListItemProps {
  toggleInfo: () => void;
  setCurrentlyActiveItem: (id: string) => void;
  className: string;
  title: string;
  catagory: string;
  link: string;
  id: string;
}

export const ListItem: React.SFC<ListItemProps> = ({
  toggleInfo,
  setCurrentlyActiveItem,
  className,
  title,
  catagory,
  link,
  id
}) => (
  <StyledLi
    className={className}
    onMouseOver={() => setCurrentlyActiveItem(id)}
  >
    <a href={link} rel="noreferrer noopener" target="_blank">
      <InfoContainer>
        <span
          onClick={event => {
            event.preventDefault();
            toggleInfo();
          }}
        >
          Info
        </span>
      </InfoContainer>
      <NameAndCatagoryContainer>
        <NameContainer>
          <span>{title}</span>
          <span>
            <Arrow />
          </span>
        </NameContainer>
        <CatagoryContainer>
          <span>{catagory}</span>
        </CatagoryContainer>
      </NameAndCatagoryContainer>
      <ImageContainer />
    </a>
  </StyledLi>
);

const StyledLi = styled.li`
  a {
    display: grid;
    grid-template-columns: 60px 3fr 1fr;
    cursor: pointer;
    text-decoration: none;
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
  margin-bottom: 0.6vw;

  transition: opacity ${props => props.theme.transition},
    visibility ${props => props.theme.transition};

  span {
    line-height: 70%;
    transition: color ${props => props.theme.transition};
    writing-mode: vertical-lr;
    transform: rotate(180deg);

    padding: 0.6vw;
    user-select: none;

    &:hover {
      color: ${props => props.theme.accentColor};
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
    color: ${props => props.theme.listColor};
    transition: color ${props => props.theme.transition};
  }

  span:last-child {
    display: inline-block;

    svg {
      width: 2vw;
      height: 2vw;
      margin-top: 1vw;
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
`;

const ImageContainer = styled.div`
  padding-left: 30px;
  overflow: hidden;
`;

export const PaddingListItem: React.SFC = () => (
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
