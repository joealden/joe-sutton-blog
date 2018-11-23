import React from "react";
import MediaQuery from "react-responsive";
import { ThemeProvider } from "../utils/styled-components";
import ThemeInterface, { darkTheme, lightTheme } from "../utils/theme";

import { Post } from "../pages/index";

import GlobalStyles from "./GlobalStyles";

const DesktopSite = React.lazy(() => import("./desktop/Site"));
const MobileSite = React.lazy(() => import("./mobile/Site"));

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
          <React.Suspense fallback={<div>Loading...</div>}>
            <MediaQuery maxWidth={1023}>
              <MobileSite toggleTheme={this.toggleTheme} posts={posts} />
            </MediaQuery>
            <MediaQuery minWidth={1024}>
              <DesktopSite toggleTheme={this.toggleTheme} posts={posts} />) }
            </MediaQuery>
          </React.Suspense>
          <GlobalStyles />
        </>
      </ThemeProvider>
    );
  }
}

export default Listed;
