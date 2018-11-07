import React from "react";
import styled from "../utils/styled-components";

import { ListItem, PaddingListItem } from "./ListItem";

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

/* TODO: Replace temp data with real data */
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
  },
  {
    id: "21",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "22",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "23",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "24",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  },
  {
    id: "25",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "26",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "27",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "28",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  },
  {
    id: "29",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "30",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "31",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "32",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  },
  {
    id: "33",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "34",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "35",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "36",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  },
  {
    id: "37",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "38",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "39",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "40",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  },
  {
    id: "41",
    title: "Akademi",
    catagory: "Website",
    link: "https://studioakademi.com/"
  },
  {
    id: "42",
    title: "Rally Interactive",
    catagory: "Brand Identity",
    link: "http://rallyinteractive.com/"
  },
  {
    id: "43",
    title: "Leo et Violette",
    catagory: "Website",
    link: "https://www.leoetviolette.com/"
  },
  {
    id: "44",
    title: "Bear Grylls",
    catagory: "Website",
    link: "http://www.beargrylls.com/"
  }
];
