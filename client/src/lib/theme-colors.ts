export const THEME_PRIMARY_STORAGE_KEY = "theme-primary-color"
export const THEME_SECONDARY_STORAGE_KEY = "theme-secondary-color"

export const PRIMARY_COLOR_OPTIONS = [
  "oklch(62% 0.22 264)", // blue
  "oklch(65% 0.24 200)", // cyan
  "oklch(68% 0.22 145)", // green
  "oklch(72% 0.19 85)", // yellow
  "oklch(64% 0.25 25)", // orange
  "oklch(60% 0.26 15)", // red
  "oklch(63% 0.24 320)", // pink
  "oklch(58% 0.22 295)", // purple
] as const

export const SECONDARY_COLOR_OPTIONS = [
  "oklch(96% 0.003 264)", // light gray
  "oklch(92% 0.005 264)", // muted gray
  "oklch(88% 0.008 264)", // medium gray
  "oklch(84% 0.01 264)", // darker muted
  "oklch(90% 0.02 240)", // cool gray
  "oklch(90% 0.02 160)", // soft green gray
  "oklch(90% 0.02 80)", // warm gray
  "oklch(86% 0.015 20)", // beige gray
] as const

export function applyThemeColors(options: {
  primary?: string | null
  secondary?: string | null
}) {
  const root = document.documentElement

  if (options.primary) {
    root.style.setProperty("--primary", options.primary)
  }

  if (options.secondary) {
    root.style.setProperty("--secondary", options.secondary)
  }
}

export function initThemeColorsFromStorage() {
  applyThemeColors({
    primary: localStorage.getItem(THEME_PRIMARY_STORAGE_KEY),
    secondary: localStorage.getItem(THEME_SECONDARY_STORAGE_KEY),
  })
}
