import { createGlobalStyle } from "../utils/styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    overflow: hidden;
    background-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.secondaryColor};
    transition: background-color 0.3s ease;
  }
`;

export default GlobalStyles;
