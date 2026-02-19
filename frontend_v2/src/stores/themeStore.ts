import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName = "evening" | "ocean" | "forest";

export interface ThemeColors {
  surfaceBase: string;
  surface0: string;
  surface1: string;
  surface2: string;
  surface3: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  terracotta: string;
  success: string;
  danger: string;
  sage: string;
  slate: string;
  ochre: string;
}

export interface Theme {
  name: ThemeName;
  colors: ThemeColors;
}

export const themes: Record<ThemeName, Theme> = {
  evening: {
    name: "evening",
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
  },
  ocean: {
    name: "ocean",
    colors: {
      surfaceBase: "#0a1628",
      surface0: "#0f1d2e",
      surface1: "#142538",
      surface2: "#1a3048",
      surface3: "#25405e",
      border: "rgba(135,206,250,0.08)",
      borderStrong: "rgba(135,206,250,0.15)",
      textPrimary: "rgba(224,242,255,0.9)",
      textSecondary: "rgba(224,242,255,0.55)",
      textTertiary: "rgba(224,242,255,0.35)",
      terracotta: "#4fc3f7",
      success: "#81c784",
      danger: "#e57373",
      sage: "#a5d6a7",
      slate: "#90caf9",
      ochre: "#ffb74d",
    },
  },
  forest: {
    name: "forest",
    colors: {
      surfaceBase: "#0d140d",
      surface0: "#131c13",
      surface1: "#1a241a",
      surface2: "#232e23",
      surface3: "#2e3b2e",
      border: "rgba(200,230,201,0.06)",
      borderStrong: "rgba(200,230,201,0.12)",
      textPrimary: "rgba(232,245,233,0.9)",
      textSecondary: "rgba(232,245,233,0.55)",
      textTertiary: "rgba(232,245,233,0.35)",
      terracotta: "#81c784",
      success: "#a5d6a7",
      danger: "#ef9a9a",
      sage: "#c8e6c9",
      slate: "#aed581",
      ochre: "#dce775",
    },
  },
};

interface ThemeState {
  themeName: ThemeName;
  theme: Theme;
  setTheme: (name: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeName: "evening",
      theme: themes.evening,
      setTheme: (name: ThemeName) =>
        set({
          themeName: name,
          theme: themes[name],
        }),
    }),
    {
      name: "rill-theme",
    },
  ),
);
