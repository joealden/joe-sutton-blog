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

  /* TODO: Sort out types */
  bottomWrapperRef: any = React.createRef();
  infoRef: any = React.createRef();
  listAndRightbarContainerRef: any = React.createRef();

  handleResize = () => {
    const info = this.infoRef.current;
    const listAndRightBar = this.listAndRightbarContainerRef.current;

    if (info.style.transform === "translateX(0px)") {
      listAndRightBar.style.transition = "none";
      listAndRightBar.style.transform = `translateX(${info.offsetWidth}px)`;
      setImmediate(() => {
        listAndRightBar.style.transition = "transform 0.3s ease";
      });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  openFilter = () => {
    const mainContainer = this.bottomWrapperRef.current;

    if (mainContainer.style.transform === "translateY(0px)") {
      mainContainer.style.transform = "translateY(-460px)";
    } else {
      mainContainer.style.transform = "translateY(0px)";
    }
  };

  openInfo = () => {
    const info = this.infoRef.current;
    const listAndRightBar = this.listAndRightbarContainerRef.current;

    if (info.style.transform === "translateX(0px)") {
      info.style.transform = "translateX(calc(-100% - 1px))";
      listAndRightBar.style.transform = "translateX(0px)";
    } else {
      info.style.transform = "translateX(0px)";
      listAndRightBar.style.transform = `translateX(${info.offsetWidth}px)`;
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
          <MainContainer>
            <Filter>Filter</Filter>
            <BottomWrapper ref={this.bottomWrapperRef}>
              <LeftBar>
                <p>Listed</p>
                <div onClick={this.openInfo}>
                  <span>Info</span>
                </div>
              </LeftBar>
              <Info ref={this.infoRef}>Info</Info>
              <ListAndRightBarContainer ref={this.listAndRightbarContainerRef}>
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
              </ListAndRightBarContainer>
            </BottomWrapper>
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
  grid-template-rows: ${FilterHeight};
  grid-template-areas: "filter filter filter filter filter";
`;

const Filter = styled.div`
  grid-area: filter;
  background-color: ${props => props.theme.ternaryColor};
  color: #060606;

  padding: 30px;
`;

const BottomWrapper = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: 60px repeat(4, 1fr);
  grid-template-rows: 100vh;
  grid-template-areas: "leftbar list list list rightbar";

  background-color: ${props => props.theme.primaryColor};
  transform: translateY(-${FilterHeight});
  transition: transform 0.3s ease, background-color 0.3s ease;
`;

const LeftBar = styled.div`
  grid-area: leftbar;
  border-right: 1px solid ${props => props.theme.borderColor};
  transition: border-color 0.3s ease, color 0.3s ease,
    background-color 0.3s ease;

  padding: 20px 0;

  display: flex;
  flex-direction: column;
  z-index: 100;
  background-color: ${props => props.theme.primaryColor};

  p {
    margin: 0 auto;
    font-size: 18px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  /**
   * This is not a button because of weird chrome behaviour
   * that means that buttons don't take the writing-mode
   * property correctly.
   */
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    margin-top: 50px;
    padding: 15px 0;
    font-size: 18px;
    cursor: pointer;
    background: none;
    border: none;
    font-weight: normal;
    color: ${props => props.theme.secondaryColor};
    transition: color 0.3s ease;
  }
`;

const Info = styled.div`
  grid-area: 2 / 3 / 1 / 2;
  background-color: ${props => props.theme.primaryColor};
  z-index: 10;

  /* 1px is also subtracted so that the borders don't clash */
  transform: translateX(calc(-100% - 1px));

  transition: transform 0.3s ease, border-color 0.3s ease,
    background-color 0.3s ease;
  border-right: 1px solid ${props => props.theme.borderColor};
  padding: 20px;
`;

const ListAndRightBarContainer = styled.div`
  grid-area: list;
  display: grid;
  width: calc(100vw - 60px);
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 100vh;
  grid-template-areas: "list list list rightbar";
  transition: transform 0.3s ease;
`;

const List = styled.div`
  grid-area: list;
  transition: color 0.3s ease;
  padding: 16px 30px;

  button {
    outline: none;
  }
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
