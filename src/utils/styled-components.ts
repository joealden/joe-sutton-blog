import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import ThemeInterface from "./theme";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  ThemeProvider,
  ThemeConsumer
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export {
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  ThemeProvider,
  ThemeConsumer
};

export default styled;
