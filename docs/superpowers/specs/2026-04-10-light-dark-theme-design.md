# Light/Dark Theme Design Spec

## Goal

Add light/dark theme support to todr.me with system preference auto-detection and a manual toggle button. The light theme should feel like an "inverted terminal" — same monospace/hacker identity, flipped to dark green on light background.

## Architecture

### CSS Custom Properties

Replace all Sass color variables with CSS custom properties. Dark theme values are the defaults on `:root`. Light theme overrides via `[data-theme="light"]` on `<html>`.

### Color Mapping

| Variable | Dark (default) | Light |
|----------|---------------|-------|
| `--terminal-bg` | `#000000` | `#f5f5f0` |
| `--terminal-green` | `#00ff41` | `#006622` |
| `--terminal-green-bright` | `#39ff14` | `#005522` |
| `--terminal-green-dim` | `#00cc33` | `#337744` |
| `--terminal-green-glow` | `rgba(0, 255, 65, 0.8)` | `rgba(0, 102, 34, 0.15)` |
| `--terminal-shadow` | `rgba(0, 255, 65, 0.3)` | `rgba(0, 102, 34, 0.1)` |

### Effect Adaptation (Light Mode)

| Effect | Dark | Light |
|--------|------|-------|
| Scan lines | Green, opacity 0.03 | Dark green, opacity 0.02 |
| Screen flicker | Enabled | Disabled |
| Text glow (headings, links) | Strong neon glow | Very subtle shadow |
| Link underline animation | Neon green slide-in | Dark green slide-in |

### Theme Detection & Persistence

Inline `<script>` in `<head>` (before any CSS renders) to prevent flash of wrong theme:

1. Check `localStorage.getItem('theme')` — if set, apply it
2. Otherwise, check `window.matchMedia('(prefers-color-scheme: light)')` — apply result
3. Set `document.documentElement.dataset.theme` to `'light'` or `'dark'`

Listen for `prefers-color-scheme` changes so OS-level switches (e.g. night mode) are respected — but only when the user hasn't explicitly overridden via the toggle.

### Toggle Button

- Location: header bar, right side (after nav links, before or among social icons)
- Icon: sun (☀) when in dark mode (click to go light), moon (☾) when in light mode (click to go dark)
- On click: toggle `data-theme` attribute, save choice to `localStorage`
- Accessible: `aria-label="Switch to light/dark theme"`, `button` element

### Syntax Highlighting

The site uses Shiki with `github-dark` theme. Add `github-light` as the light theme via Astro's dual-theme Shiki config. Shiki generates both sets of styles and uses CSS variables — the correct one activates based on the theme attribute.

## Files to Modify

| File | Change |
|------|--------|
| `src/styles/_sass/_variables.scss` | Replace Sass color vars with CSS custom property definitions (`:root` and `[data-theme="light"]`) |
| `src/styles/_sass/_base.scss` | Replace `$terminal-*` references with `var(--terminal-*)`. Add light-mode scan line / effect overrides |
| `src/styles/_sass/_header.scss` | Replace color references with CSS vars |
| `src/styles/_sass/_footer.scss` | Replace color references with CSS vars |
| `src/styles/_sass/_home.scss` | Replace color references with CSS vars |
| `src/styles/_sass/_post.scss` | Replace color references with CSS vars |
| `src/styles/_sass/_code.scss` | Replace hardcoded colors with CSS vars, integrate Shiki dual theme |
| `src/styles/_sass/_default.scss` | Replace any color references with CSS vars |
| `src/styles/_sass/_social-icons.scss` | Social icon colors stay hardcoded (brand colors), but any terminal-green refs become vars |
| `src/layouts/BaseLayout.astro` | Add inline theme-detection script in `<head>` |
| `src/components/Header.astro` | Add theme toggle button |
| `src/pages/projects.astro` | Replace scoped terminal color references with CSS vars |
| `astro.config.mjs` | Configure Shiki dual theme (`github-dark` / `github-light`) |

## Files NOT Modified

- `src/data/projects.ts` — data only, no colors
- `src/data/settings.ts` — data only
- `src/content/blog/*` — markdown content, no styling

## Out of Scope

- Per-page theme overrides
- Theme transition animations (instant switch is fine)
- Multiple color scheme options beyond light/dark
