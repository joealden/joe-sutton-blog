export type Theme = {
  transition: string;
  backgroundColor: string;
  foregroundColor: string;
  listColor: string;
  lineColor: string;
  accentColor: string;
};

const baseTheme = {
  transition: "0.3s ease"
};

export const darkTheme: Theme = {
  ...baseTheme,
  backgroundColor: "#111111",
  foregroundColor: "#FFFFFF",
  listColor: "#535353",
  lineColor: "#2B2B2B",
  accentColor: "#19F2BE"
};

export const lightTheme: Theme = {
  ...baseTheme,
  backgroundColor: "#F8F8F8",
  foregroundColor: "#060606",
  listColor: "#C3C3C3",
  lineColor: "#D6D6D6",
  accentColor: "#34B1FF"
};
