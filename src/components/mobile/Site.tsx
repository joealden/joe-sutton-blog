import React from "react";
import styled from "../../utils/styled-components";

import { Post } from "../../pages/index";

import Header from "./Header";
import List from "./List";

interface SiteProps {
  toggleTheme: () => void;
  posts: Array<Post>;
}

const Site: React.FunctionComponent<SiteProps> = ({ toggleTheme, posts }) => (
  <SiteWrapper>
    <Header toggleTheme={toggleTheme} />
    <List posts={posts} />
  </SiteWrapper>
);

export default Site;

const SiteWrapper = styled.div`
  font-size: 18px;

  > * {
    -webkit-tap-highlight-color: transparent;
  }
`;
