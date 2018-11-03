import { createGlobalStyle } from "../utils/styled-components";
import { withPrefix } from "gatsby";

const GlobalStyles = createGlobalStyle`
  /* Sort out woff2 and ttf usages for supported browsers*/
  @font-face {
    font-family: "SuisseIntl";
    src: url(${withPrefix("SuisseIntl-Regular.woff")});
  }
  
  * {
    box-sizing: border-box;
    font-family: inherit;
  }

  html {
    font-family: "SuisseIntl";
    font-size: 20px;
    
    /* 2000 number is a placeholder */
    @media screen and (max-width: 2000px) {
      font-size: 18px;
    }
    @media screen and (max-width: 1300px) {
      font-size: 16px;
    }
  }

  body {
    margin: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.foregroundColor};
    transition: background-color ${props => props.theme.transition};
  }

  button {
    border: none;
    background: none;
    color: ${props => props.theme.foregroundColor};
    font-weight: normal;
    padding: 10px;
    cursor: pointer;
    transition: color ${props => props.theme.transition};
    /* Chrome needs explicit setting of this property */
    font-size: inherit;
    /* Think about a11y */
    outline: none;
  }
`;

export default GlobalStyles;
