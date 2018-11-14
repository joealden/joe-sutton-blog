import { createGlobalStyle } from "../utils/styled-components";

/* All non-dynamic styles have been moved from here to styles.css */

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.foregroundColor};
    transition: background-color ${props => props.theme.transition};
  }

  button {
    color: ${props => props.theme.foregroundColor};
    transition: color ${props => props.theme.transition};

    &:hover {
      color: ${props => props.theme.accentColor};
    }
  }
`;

export default GlobalStyles;
