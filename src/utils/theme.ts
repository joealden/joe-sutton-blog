export default interface ThemeInterface {
  primaryColor: string;
  secondaryColor: string;
  ternaryColor: string;
  borderColor: string;
}

const baseTheme = {
  ternaryColor: "#19F2BE"
};

export const darkTheme: ThemeInterface = {
  ...baseTheme,
  primaryColor: "#111111",
  secondaryColor: "#FFFFFF",
  borderColor: "#2B2B2B"
};

export const lightTheme: ThemeInterface = {
  ...baseTheme,
  primaryColor: "#F8F8F8",
  secondaryColor: "#060606",
  borderColor: "#D6D6D6"
};

export const fadedDarkTheme: ThemeInterface = {
  ...baseTheme,
  primaryColor: "#111111",
  secondaryColor: "#777777",
  borderColor: "#2B2B2B"
};

export const fadedLightTheme: ThemeInterface = {
  ...baseTheme,
  primaryColor: "#F8F8F8",
  secondaryColor: "#ADADAD",
  borderColor: "#D6D6D6"
};
