import { createGlobalStyle } from "../utils/styled-components";
import { withPrefix } from "gatsby";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: SuisseIntl;
    src: url(${withPrefix("SuisseIntl-Regular.woff")});
  }

  * {
    box-sizing: border-box;
    font-family: SuisseIntl;
  }
  
  body {
    font-family: SuisseIntl;
    margin: 0;
    overflow: hidden;
    background-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.secondaryColor};
    transition: background-color 0.3s ease;
  }
`;

export default GlobalStyles;
