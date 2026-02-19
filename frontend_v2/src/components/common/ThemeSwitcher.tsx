import { useThemeStore, themes, type ThemeName } from "@/stores/themeStore";

const themeLabels: Record<ThemeName, string> = {
  evening: "Evening",
  ocean: "Ocean",
  forest: "Forest",
};

export function ThemeSwitcher() {
  const { themeName, setTheme } = useThemeStore();

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {(Object.keys(themes) as ThemeName[]).map((name) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid",
            borderColor:
              themeName === name
                ? "var(--color-terracotta)"
                : "var(--color-border-strong)",
            background:
              themeName === name
                ? "var(--color-surface-3)"
                : "var(--color-surface-2)",
            color: "var(--color-text-primary)",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            transition: "all 0.2s ease",
          }}
        >
          {themeLabels[name]}
        </button>
      ))}
    </div>
  );
}
