export default interface ThemeInterface {
  backgroundColor: string;
  backgroundColorTransparent: string;
  foregroundColor: string;
  listColor: string;
  lineColor: string;
  accentColor: string;
  transition: string;
}

const baseTheme = {
  accentColor: "#19F2BE",
  transition: "0.3s ease"
};

export const darkTheme: ThemeInterface = {
  ...baseTheme,
  backgroundColor: "#111111",
  backgroundColorTransparent: "rgba(17, 17, 17, 0)",
  foregroundColor: "#FFFFFF",
  listColor: "#535353",
  lineColor: "#2B2B2B"
};

export const lightTheme: ThemeInterface = {
  ...baseTheme,
  backgroundColor: "#F8F8F8",
  backgroundColorTransparent: "rgba(248, 248, 248, 0)",
  foregroundColor: "#060606",
  listColor: "#C3C3C3",
  lineColor: "#D6D6D6"
};
