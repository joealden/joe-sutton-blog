export default interface ThemeInterface {
  primaryColor: string;
  secondaryColor: string;
  ternaryColor: string;
}

const baseTheme = {
  ternaryColor: "#19F2BE"
};

export const darkTheme: ThemeInterface = {
  ...baseTheme,
  primaryColor: "#111111",
  secondaryColor: "#FFFFFF"
};

export const lightTheme: ThemeInterface = {
  ...baseTheme,
  primaryColor: "#F8F8F8",
  secondaryColor: "#060606"
};
