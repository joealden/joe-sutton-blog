import React from "react";
import Helmet from "react-helmet";

import styled, { ThemeProvider } from "../utils/styled-components";
import ThemeInterface, { darkTheme, lightTheme } from "../utils/theme";

import Circle from "../components/Circle";
import GlobalStyles from "../components/GlobalStyles";

interface ListedState {
  currentTheme: ThemeInterface;
}

class Listed extends React.Component<{}, ListedState> {
  state = {
    currentTheme: darkTheme
  };

  /* TODO: Sort out type */
  mainContainerRef: any = React.createRef();

  openFilter = () => {
    const mainContainer = this.mainContainerRef.current;

    if (mainContainer.style.transform === "translateY(0px)") {
      mainContainer.style.transform = "translateY(-460px)";
    } else {
      mainContainer.style.transform = "translateY(0px)";
    }
  };

  toggleTheme = () => {
    if (this.state.currentTheme === darkTheme) {
      this.setState({ currentTheme: lightTheme });
      localStorage.setItem("currentTheme", "light");
    } else {
      this.setState({ currentTheme: darkTheme });
      localStorage.setItem("currentTheme", "dark");
    }
  };

  render() {
    const { currentTheme } = this.state;

    return (
      <ThemeProvider theme={currentTheme}>
        <>
          <Helmet>
            <title>Listed</title>
          </Helmet>
          <MainContainer ref={this.mainContainerRef}>
            <Filter>Filter</Filter>
            <LeftBar>
              <p>Listed</p>
            </LeftBar>
            <List>
              <OpenFilterButton onClick={this.openFilter}>
                Filter
              </OpenFilterButton>
            </List>
            <RightBar>
              <ToggleThemeButton onClick={this.toggleTheme}>
                <Circle />
              </ToggleThemeButton>
            </RightBar>
          </MainContainer>
          <GlobalStyles />
        </>
      </ThemeProvider>
    );
  }
}

const FilterHeight = "460px";

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 60px repeat(4, 1fr);
  grid-template-rows: ${FilterHeight} 100vh;
  grid-template-areas: "filter filter filter filter filter" "leftbar list list list rightbar";

  transform: translateY(-${FilterHeight});
  transition: transform 0.3s ease;
`;

const Filter = styled.div`
  grid-area: filter;
  background-color: ${props => props.theme.ternaryColor};
  color: #060606;

  padding: 30px;
`;

const LeftBar = styled.div`
  grid-area: leftbar;
  border-right: 1px solid ${props => props.theme.borderColor};
  transition: border-color 0.3s ease, color 0.3s ease;

  padding: 20px 0;

  display: flex;
  flex-direction: column;

  p {
    margin: 0 auto;
    font-size: 18px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
`;

const List = styled.div`
  grid-area: list;
  transition: color 0.3s ease;

  padding: 16px 30px;
`;

const OpenFilterButton = styled.button`
  border: none;
  background: none;
  color: ${props => props.theme.secondaryColor};
  font-weight: normal;
  padding: 0;
  cursor: pointer;
  transition: color 0.3s ease;
`;

const RightBar = styled.div`
  grid-area: rightbar;
  border-left: 1px solid ${props => props.theme.borderColor};
  transition: border-color 0.3s ease, color 0.3s ease;

  padding: 16px 30px;
`;

const ToggleThemeButton = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  /* Maybe instead just alter for a11y reasons */
  outline: none;
`;

export default Listed;
