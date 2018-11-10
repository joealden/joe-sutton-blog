import React from "react";
import { ThemeProvider } from "../utils/styled-components";
import ThemeInterface, { darkTheme, lightTheme } from "../utils/theme";

import { Post } from "../pages/index";

import Site from "./Site";
import GlobalStyles from "./GlobalStyles";

interface ListedProps {
  posts: Array<Post>;
}

interface ListedState {
  currentTheme: ThemeInterface;
}

class Listed extends React.Component<ListedProps, ListedState> {
  state = {
    currentTheme: darkTheme
  };

  toggleTheme = () => {
    if (this.state.currentTheme === darkTheme) {
      this.setState({ currentTheme: lightTheme });
    } else {
      this.setState({ currentTheme: darkTheme });
    }
  };

  render() {
    const { posts } = this.props;
    const { currentTheme } = this.state;

    return (
      <ThemeProvider theme={currentTheme}>
        <>
          <Site toggleTheme={this.toggleTheme} posts={posts} />
          <GlobalStyles />
        </>
      </ThemeProvider>
    );
  }
}

export default Listed;
