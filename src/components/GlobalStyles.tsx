import { createGlobalStyle } from "../utils/styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${props => props.theme.primaryColor};
    transition: background-color 0.3s ease;
  }
`;

export default GlobalStyles;
