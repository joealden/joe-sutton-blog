export default interface ThemeInterface {
  backgroundColor: string;
  backgroundColorTranslucent: string;
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
  backgroundColorTranslucent: "rgba(17, 17, 17, 0.8)",
  foregroundColor: "#FFFFFF",
  listColor: "#535353",
  lineColor: "#2B2B2B"
};

export const lightTheme: ThemeInterface = {
  ...baseTheme,
  backgroundColor: "#F8F8F8",
  backgroundColorTranslucent: "rgba(248, 248, 248, 0.8)",
  foregroundColor: "#060606",
  listColor: "#C3C3C3",
  lineColor: "#D6D6D6"
};
