import React from "react";
import styled from "../utils/styled-components";

import Arrow from "../components/icons/Arrow";

interface ListProps {
  toggleInfo: () => void;
}

const List: React.SFC<ListProps> = ({ toggleInfo }) => {
  return (
    <ListWrapper>
      <PaddingListItem />
      <ListItem
        toggleInfo={toggleInfo}
        title="Akademi"
        catagory="Website"
        link="https://studioakademi.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Rally Interactive"
        catagory="Brand Identity"
        link="http://rallyinteractive.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Leo et Violette"
        catagory="Website"
        link="https://www.leoetviolette.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Bear Grylls"
        catagory="Website"
        link="http://www.beargrylls.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Akademi"
        catagory="Website"
        link="https://studioakademi.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Rally Interactive"
        catagory="Brand Identity"
        link="http://rallyinteractive.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Leo et Violette"
        catagory="Website"
        link="https://www.leoetviolette.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Bear Grylls"
        catagory="Website"
        link="http://www.beargrylls.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Akademi"
        catagory="Website"
        link="https://studioakademi.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Rally Interactive"
        catagory="Brand Identity"
        link="http://rallyinteractive.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Leo et Violette"
        catagory="Website"
        link="https://www.leoetviolette.com/"
      />
      <ListItem
        toggleInfo={toggleInfo}
        title="Bear Grylls"
        catagory="Website"
        link="http://www.beargrylls.com/"
      />
      <PaddingListItem />
    </ListWrapper>
  );
};

export default List;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface ListItemProps {
  title: string;
  catagory: string;
  link: string;
  toggleInfo: () => void;
}

const ListItem: React.SFC<ListItemProps> = ({
  title,
  catagory,
  link,
  toggleInfo
}) => (
  <StyledLi>
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
    /* Think about ally of this */
    outline: none;
  }

  &:hover {
    & > a > div:nth-child(2) > div:nth-child(2),
    & > a > div:nth-child(1) > span,
    & > a > div:nth-child(2) > div:first-child > span:last-child svg polygon,
    & > a > div:nth-child(2) > div:last-child > span {
      opacity: 1;
      visibility: visible;
    }

    & > a > div:nth-child(2) > div:first-child span:first-child {
      color: ${props => props.theme.foregroundColor};
    }

    & > a > div:nth-child(2) > div:first-child > span:last-child svg polygon {
      fill: ${props => props.theme.foregroundColor};
    }
  }
`;

const InfoContainer = styled.div`
  width: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;

  span {
    transition: opacity ${props => props.theme.transition},
      visibility ${props => props.theme.transition},
      color ${props => props.theme.transition};

    visibility: hidden;
    transform: rotate(-90deg);

    margin-bottom: 1.4vw;
    opacity: 0;
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

  border-left: 1px solid ${props => props.theme.lineColor};
  border-right: 1px solid ${props => props.theme.lineColor};
  transition: border-color ${props => props.theme.transition};
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
      visibility ${props => props.theme.transition};
  }
`;

const ImageContainer = styled.div`
  padding-left: 30px;
  overflow: hidden;
`;

const PaddingListItem: React.SFC = () => (
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
  cursor: default;

  a {
    height: 8vw;
  }
`;
