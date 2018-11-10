import { createGlobalStyle } from "../utils/styled-components";

/* All non-dynamic styles have been moved from here to styles.css */

const GlobalStyles = createGlobalStyle`
  html {    
    /* 2000 number is a placeholder */
    @media screen and (max-width: 2000px) {
      font-size: 18px;
    }
    @media screen and (max-width: 1300px) {
      font-size: 16px;
    }
  }

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
