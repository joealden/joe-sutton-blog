import { createGlobalStyle } from "../utils/styled-components";

const GlobalStyles = createGlobalStyle`
  /**
   * TODO:
   * Play around with custom scrollbars for
   * both Firefox and Webkit based browsers.
   *
   * | * {
   * |   scrollbar-width: none;
   * |   scrollbar-color: ${props => props.theme.accentColor} #838383;
   * |   transition: scrollbar-color ${props => props.theme.transition};
  * | }
  */

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
