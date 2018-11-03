import React from "react";
import styled from "../utils/styled-components";

import Arrow from "../components/icons/Arrow";

interface ListProps {
  toggleInfo: () => void;
}

interface ListState {
  activeItemId: string;
}

class List extends React.Component<ListProps, ListState> {
  state = {
    /* Dependent on real data and current filtering */
    activeItemId: "1"
  };

  setCurrentlyActiveItem = (id: string) => this.setState({ activeItemId: id });

  render() {
    const { toggleInfo } = this.props;
    const { activeItemId } = this.state;

    return (
      <ListWrapper>
        <PaddingListItem />
        {tempData.map(item => {
          const { id } = item;
          const className = activeItemId === id ? "active-item" : "";

          return (
            <ListItem
              toggleInfo={toggleInfo}
              setCurrentlyActiveItem={this.setCurrentlyActiveItem}
              className={className}
              key={id}
              {...item}
            />
          );
        })}
        <PaddingListItem />
      </ListWrapper>
    );
  }
}

export default List;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li.active-item {
    & > a > div:nth-child(2) > div:nth-child(2),
    & > a > div:nth-child(1),
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

interface ListItemProps {
  toggleInfo: () => void;
  setCurrentlyActiveItem: (id: string) => void;
  className: string;
  title: string;
  catagory: string;
  link: string;
  id: string;
}

const ListItem: React.SFC<ListItemProps> = ({
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
      visibility ${props => props.theme.transition},
      color ${props => props.theme.transition};
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

  a {
    cursor: default;
    height: 8vw;
  }
`;

const tempData = [
  {
    id: "1",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "2",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "3",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "4",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  },
  {
    id: "5",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "6",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "7",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "8",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  },
  {
    id: "9",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "10",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "11",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "12",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  },
  {
    id: "13",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "14",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "15",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "16",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  },
  {
    id: "17",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "18",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "19",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "20",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  }
];
