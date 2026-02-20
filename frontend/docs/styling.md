# Styling Guidelines

## Global Style Files

Global styles live in `frontend_v2/src/styles/` and are imported from `frontend_v2/src/styles/global.css`:

- `frontend_v2/src/styles/fonts.css` (Google Fonts: DM Sans, Libre Baskerville, JetBrains Mono)
- `frontend_v2/src/styles/normalize.css` (CSS reset)
- `frontend_v2/src/styles/base.css` (base element styles, focus, scrollbar)
- `frontend_v2/src/styles/global.css` (CSS variables + Tailwind theme tokens)
- `frontend_v2/src/styles/theme.ts` (TypeScript theme tokens for JS usage)

## Theme Colors

Dark theme palette "Soft Canvas — Evening" (CSS variables):

| Variable               | Value                  | Usage                |
| ---------------------- | ---------------------- | -------------------- |
| --color-surface-base   | #141211                | Deep background      |
| --color-surface-0      | #1c1917                | Canvas background    |
| --color-surface-1      | #231f1c                | Primary background   |
| --color-surface-2      | #2c2724                | Secondary background |
| --color-surface-3      | #3a3430                | Tertiary background  |
| --color-border         | rgba(255,235,210,0.06) | Borders              |
| --color-border-strong  | rgba(255,235,210,0.12) | Strong borders       |
| --color-text-primary   | rgba(245,238,230,0.87) | Primary text         |
| --color-text-secondary | rgba(245,238,230,0.5)  | Secondary text       |
| --color-text-tertiary  | rgba(245,238,230,0.32) | Tertiary text        |
| --color-terracotta     | #c9805e                | Accent color         |
| --color-success        | #7fb069                | Success states       |
| --color-danger         | #e57373                | Error states         |
| --color-sage           | #8fa08f                | Accent (sage)        |
| --color-slate          | #7f8aa3                | Accent (slate)       |
| --color-ochre          | #c9a15c                | Accent (ochre)       |

## Typography

- Headings: `var(--font-heading)` (Libre Baskerville)
- Body: `var(--font-body)` (DM Sans)
- Mono: `var(--font-mono)` (JetBrains Mono)

Prefer CSS variables for colors and fonts instead of hardcoded hex/rgba.

## styled-components

Used for component styling. See existing components for patterns.
