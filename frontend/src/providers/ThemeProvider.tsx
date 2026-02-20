import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    const colors = theme.colors;

    root.style.setProperty("--color-surface-base", colors.surfaceBase);
    root.style.setProperty("--color-surface-0", colors.surface0);
    root.style.setProperty("--color-surface-1", colors.surface1);
    root.style.setProperty("--color-surface-2", colors.surface2);
    root.style.setProperty("--color-surface-3", colors.surface3);
    root.style.setProperty("--color-border", colors.border);
    root.style.setProperty("--color-border-strong", colors.borderStrong);
    root.style.setProperty("--color-text-primary", colors.textPrimary);
    root.style.setProperty("--color-text-secondary", colors.textSecondary);
    root.style.setProperty("--color-text-tertiary", colors.textTertiary);
    root.style.setProperty("--color-terracotta", colors.terracotta);
    root.style.setProperty("--color-success", colors.success);
    root.style.setProperty("--color-danger", colors.danger);
    root.style.setProperty("--color-sage", colors.sage);
    root.style.setProperty("--color-slate", colors.slate);
    root.style.setProperty("--color-ochre", colors.ochre);
  }, [theme]);

  return children;
}
