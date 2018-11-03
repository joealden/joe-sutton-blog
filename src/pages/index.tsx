import React from "react";
import Helmet from "react-helmet";
import styled, { ThemeProvider } from "../utils/styled-components";
import ThemeInterface, { darkTheme, lightTheme } from "../utils/theme";

import GlobalStyles from "../components/GlobalStyles";
import Filter from "../components/Filter";
import Info from "../components/Info";
import Header from "../components/Header";
import List from "../components/List";

import "../styles/styles.css";

interface ListedState {
  currentTheme: ThemeInterface;
  showBackToTopButton: boolean;
  infoOpen: boolean;
  filterOpen: boolean;
}

class Listed extends React.Component<{}, ListedState> {
  state = {
    currentTheme: darkTheme,
    showBackToTopButton: false,
    infoOpen: false,
    filterOpen: false
  };

  toggleTheme = () => {
    if (this.state.currentTheme === darkTheme) {
      this.setState({ currentTheme: lightTheme });
    } else {
      this.setState({ currentTheme: darkTheme });
    }
  };

  toggleInfo = () => {
    if (this.state.infoOpen) {
      this.setState({ infoOpen: false });
    } else {
      this.setState({ infoOpen: true });
    }
  };

  toggleFilter = () => {
    if (this.state.filterOpen) {
      this.setState({ filterOpen: false });
    } else {
      this.setState({ filterOpen: true });
    }
  };

  shouldBackToTopButtonBeShown = () => {
    const { showBackToTopButton } = this.state;

    if (window.pageYOffset > 200) {
      if (showBackToTopButton === false) {
        this.setState({ showBackToTopButton: true });
      }
    } else {
      if (showBackToTopButton === true) {
        this.setState({ showBackToTopButton: false });
      }
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.shouldBackToTopButtonBeShown);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.shouldBackToTopButtonBeShown);
  }

  render() {
    const {
      currentTheme,
      showBackToTopButton,
      infoOpen,
      filterOpen
    } = this.state;

    return (
      <ThemeProvider theme={currentTheme}>
        <SiteContainer
          onWheel={event => {
            /**
             * TODO:
             * This stops scrolling with the mousewheel, but
             * scrolling also needs to be stopped when the user
             * uses either the arrow buttons or the actual scroll
             * bar.
             *
             * Find solutions to these problem scenarios.
             */
            if (infoOpen || filterOpen) {
              console.log(event);
              event.preventDefault();
            }
          }}
        >
          <Helmet>
            <title>Listed</title>
          </Helmet>
          <Filter filterOpen={filterOpen} />
          <MainContainer
            style={{
              transform: infoOpen
                ? "translateX(var(--column-width))"
                : "translateX(0)"
            }}
          >
            <Info />
            <HeaderAndListContainer>
              <Overlay
                style={{
                  visibility: infoOpen || filterOpen ? "visible" : "hidden",
                  opacity: infoOpen || filterOpen ? 0.5 : 0
                }}
                onClick={() => {
                  if (infoOpen) {
                    this.setState({ infoOpen: false });
                  }

                  if (filterOpen) {
                    this.setState({ filterOpen: false });
                  }
                }}
              />
              <Header
                showBackToTopButton={showBackToTopButton}
                toggleTheme={this.toggleTheme}
                toggleFilter={this.toggleFilter}
              />
              <List toggleInfo={this.toggleInfo} />
            </HeaderAndListContainer>
          </MainContainer>
          <GlobalStyles />
        </SiteContainer>
      </ThemeProvider>
    );
  }
}

export default Listed;

const SiteContainer = styled.main`
  --logo-width: 60px;
  --column-width: calc(calc(100vw - var(--logo-width)) / 4);
`;

const MainContainer = styled.div`
  position: relative;
  transition: transform ${props => props.theme.transition};
`;

const HeaderAndListContainer = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.backgroundColor};
  transition: opacity ${props => props.theme.transition},
    visibility ${props => props.theme.transition};
`;
