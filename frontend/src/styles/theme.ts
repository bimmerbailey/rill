export const theme = {
  colors: {
    surfaceBase: "#141211",
    surface0: "#1c1917",
    surface1: "#231f1c",
    surface2: "#2c2724",
    surface3: "#3a3430",
    border: "rgba(255,235,210,0.06)",
    borderStrong: "rgba(255,235,210,0.12)",
    textPrimary: "rgba(245,238,230,0.87)",
    textSecondary: "rgba(245,238,230,0.5)",
    textTertiary: "rgba(245,238,230,0.32)",
    terracotta: "#c9805e",
    success: "#7fb069",
    danger: "#e57373",
    sage: "#8fa08f",
    slate: "#7f8aa3",
    ochre: "#c9a15c",
  },
  typography: {
    heading: "'Libre Baskerville', Georgia, serif",
    body: "'DM Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
  },
} as const;

export type Theme = typeof theme;
