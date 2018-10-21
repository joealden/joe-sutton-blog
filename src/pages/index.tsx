import React from "react";

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
          <ToggleThemeButton onClick={this.toggleTheme}>
            <Circle />
          </ToggleThemeButton>
          <GlobalStyles />
        </>
      </ThemeProvider>
    );
  }
}

const ToggleThemeButton = styled.button`
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  /* Maybe instead just alter for a11y reasons */
  outline: none;
`;

export default Listed;
