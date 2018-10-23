export default interface ThemeInterface {
  backgroundColor: string;
  foregroundColor: string;
  listColor: string;
  lineColor: string;
  accentColor: string;
}

const baseTheme = {
  accentColor: "#19F2BE"
};

export const darkTheme: ThemeInterface = {
  ...baseTheme,
  backgroundColor: "#111111",
  foregroundColor: "#FFFFFF",
  listColor: "#535353",
  lineColor: "#2B2B2B"
};

export const lightTheme: ThemeInterface = {
  ...baseTheme,
  backgroundColor: "#F8F8F8",
  foregroundColor: "#060606",
  listColor: "#C3C3C3",
  lineColor: "#D6D6D6"
};
