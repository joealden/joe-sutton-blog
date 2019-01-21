import React from "react";
import { ThemeProvider } from "../utils/styled-components";
import { ThemeInterface, darkTheme, lightTheme } from "../utils/theme";

import { Post } from "../utils/types";

import Site from "./Site";

type ListedProps = {
  posts: Array<Post>;
  categories: Array<string>;
  tags: Array<string>;
};

type ListedState = {
  currentTheme: ThemeInterface;
};

class Listed extends React.Component<ListedProps, ListedState> {
  state: Readonly<ListedState> = {
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
    const { posts, categories, tags } = this.props;
    const { currentTheme } = this.state;
    const { toggleTheme } = this;

    return (
      <ThemeProvider theme={currentTheme}>
        <Site
          toggleTheme={toggleTheme}
          posts={posts}
          categories={categories}
          tags={tags}
        />
      </ThemeProvider>
    );
  }
}

export default Listed;
