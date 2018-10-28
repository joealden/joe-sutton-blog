import React from "react";
import Helmet from "react-helmet";

import styled, { ThemeProvider, css } from "../utils/styled-components";
import ThemeInterface, { darkTheme, lightTheme } from "../utils/theme";

import Circle from "../components/icons/Circle";
import Logo from "../components/icons/Logo";
import BackToTop from "../components/icons/BackToTop";

import GlobalStyles from "../components/GlobalStyles";

interface ListedState {
  currentTheme: ThemeInterface;
  showBackToTopButton: boolean;
  infoOpen: boolean;
}

class Listed extends React.Component<{}, ListedState> {
  state = {
    currentTheme: darkTheme,
    /* switch to false when implemented */
    showBackToTopButton: true,
    infoOpen: false
  };

  /* TODO: Add loading screen first */
  /*componentDidMount() {
    const savedThemeString = localStorage.getItem("theme");

    if (savedThemeString === "light") {
      this.setState({ currentTheme: lightTheme });
    }
  } */

  toggleTheme = () => {
    if (this.state.currentTheme === darkTheme) {
      // localStorage.setItem("theme", "light");
      this.setState({ currentTheme: lightTheme });
    } else {
      // localStorage.removeItem("theme");
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

  render() {
    const { currentTheme, showBackToTopButton, infoOpen } = this.state;

    return (
      <ThemeProvider theme={currentTheme}>
        <SiteContainer>
          <Helmet>
            <title>Listed</title>
          </Helmet>
          <Header
            showBackToTopButton={showBackToTopButton}
            toggleTheme={this.toggleTheme}
            infoOpen={infoOpen}
          />
          <List />
          <GlobalStyles />
        </SiteContainer>
      </ThemeProvider>
    );
  }
}

export default Listed;

const SiteContainer = styled.main``;

/* -------------------------- Header -------------------------- */

interface HeaderProps {
  showBackToTopButton: boolean;
  toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
  infoOpen: boolean;
}

const Header: React.SFC<HeaderProps> = ({
  showBackToTopButton,
  toggleTheme,
  infoOpen
}) => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <TransformWrapper
        style={{
          transform: infoOpen
            ? "translateX(var(--column-width))"
            : "translateX(0)"
        }}
      >
        <OpenFilterWrapper>
          <button>Filter</button>
          {showBackToTopButton && (
            <button
              onClick={() =>
                window.scrollTo({
                  behavior: "smooth",
                  left: 0,
                  top: 0
                })
              }
            >
              <BackToTop />
            </button>
          )}
        </OpenFilterWrapper>
        <AboutAndThemeChangeWrapper>
          <button>About</button>
          <button onClick={toggleTheme}>
            <Circle />
          </button>
        </AboutAndThemeChangeWrapper>
      </TransformWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.backgroundColor},
    ${props => props.theme.backgroundColorTransparent}
  );
`;

const LogoWrapperWidth = "60px";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${LogoWrapperWidth};
`;

const TransformWrapper = styled.div`
  --column-width: calc(calc(100vw - ${LogoWrapperWidth}) / 4);

  flex: 1;
  display: grid;
  grid-template-columns: 3fr 1fr;
  transform: translateX(0);
  transition: transform ${props => props.theme.transition};
`;

const commonFlexHeaderStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const OpenFilterWrapper = styled.div`
  ${commonFlexHeaderStyles};
  border-left: 1px solid ${props => props.theme.lineColor};
  border-right: 1px solid ${props => props.theme.lineColor};
  transition: border-color ${props => props.theme.transition};
`;

const AboutAndThemeChangeWrapper = styled.div`
  ${commonFlexHeaderStyles};
`;

/* --------------------------- List --------------------------- */

const List = () => {
  return (
    <ListWrapper>
      <PaddingListItem />
      <ListItem>Akademi</ListItem>
      <ListItem>Rally Interactive</ListItem>
      <ListItem>Leo et Violette</ListItem>
      <ListItem>Bear Grylls</ListItem>
      <ListItem>Akademi</ListItem>
      <ListItem>Rally Interactive</ListItem>
      <ListItem>Leo et Violette</ListItem>
      <ListItem>Bear Grylls</ListItem>
      <ListItem>Akademi</ListItem>
      <ListItem>Rally Interactive</ListItem>
      <ListItem>Leo et Violette</ListItem>
      <ListItem>Bear Grylls</ListItem>
      <ListItem>Akademi</ListItem>
      <ListItem>Rally Interactive</ListItem>
      <ListItem>Leo et Violette</ListItem>
      <ListItem>Bear Grylls</ListItem>
      <PaddingListItem />
    </ListWrapper>
  );
};

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface ListItemProps {
  children: string;
}

const ListItem: React.SFC<ListItemProps> = ({ children }) => (
  <StyledLi>
    <div>
      <span>Info</span>
    </div>
    <div>
      <div>{children}</div>
      <div>Image</div>
    </div>
  </StyledLi>
);

const StyledLi = styled.li`
  display: flex;
  cursor: pointer;

  &:hover {
    & > div:nth-child(2) > div:nth-child(1) {
      color: ${props => props.theme.foregroundColor};
    }

    & > div:nth-child(2) > div:nth-child(2),
    & > div:nth-child(1) span {
      opacity: 1;
    }
  }

  & > div:nth-child(1) {
    width: 60px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    span {
      margin-bottom: 0.7vw;
      opacity: 0;
      transition: opacity ${props => props.theme.transition};
    }
  }
  & > div:nth-child(2) {
    flex: 1;
    display: grid;
    grid-template-columns: 3fr 1fr;

    > div:nth-child(1) {
      border-left: 1px solid ${props => props.theme.lineColor};
      border-right: 1px solid ${props => props.theme.lineColor};

      font-size: 6vw;
      line-height: 100%;
      letter-spacing: -0.24vw;
      padding-left: 30px;
      color: ${props => props.theme.listColor};
      transition: border-color ${props => props.theme.transition},
        color ${props => props.theme.transition};
    }
    > div:nth-child(2) {
      padding-left: 30px;
      opacity: 0;
      transition: opacity ${props => props.theme.transition};
    }
  }
`;

const PaddingListItem: React.SFC = () => (
  <EmptyStyledLi>
    <div />
    <div>
      <div />
      <div />
    </div>
  </EmptyStyledLi>
);

const EmptyStyledLi = styled(StyledLi)`
  height: 8vw;
`;
