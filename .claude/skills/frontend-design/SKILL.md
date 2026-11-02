---
name: frontend-design
description: Redesign a Vue 3 app's UI into a modern SaaS interface with a left vertical sidebar, consistent spacing and a polished look. Use when asked to modernize, restyle or restructure app navigation/layout.
---

# Frontend Design: Modern SaaS Redesign

Restructure a Vue 3 application's shell into a modern SaaS layout: a vertical navigation sidebar on the left instead of a top nav bar, a consistent spacing system, and a polished, professional look. The workflow is audit, apply, verify.

## Guardrails

This is a **behavior-preserving** redesign. Change only the template structure of the app shell and CSS.

- Do NOT change routes, route paths, API calls, i18n keys, composables, stores or filter logic.
- Keep every existing `router-link`, label, event handler, modal and widget. Move them, do not remove or rewrite them.
- Honor the host project's CLAUDE.md. In this repo that means:
  - Delegate any `.vue` creation or significant modification to the `vue-expert` agent.
  - Use Playwright MCP tools (`mcp__playwright__*`) for browser checks against `http://localhost:3000`.
  - No emojis in the UI.
  - The repo is public: no credentials, internal hostnames or private registry URLs.
- Reuse the app's existing palette. This repo uses slate/gray (`#0f172a`, `#64748b`, `#e2e8f0`) with green/blue/yellow/red status colors.
- Do not commit unless the user asks.

## Step 1: Audit

Read before editing, then post a short audit summary.

1. Router file (`main.js` or `router/index.js`): list every route path and component.
2. Root component (`App.vue`): the header/nav markup, nav links and labels, header widgets (language switcher, profile menu), global filter bars, modals, and where `<router-view />` renders.
3. Global CSS (often in `App.vue` or `style.css`): existing variables, colors, breakpoints, and shared classes such as `.card`, `.stat-card`, `.badge`, `.page-header`, tables.
4. Note which views define their own layout styles that could conflict with a new shell.

The audit summary should list: routes, widgets to relocate, existing colors, shared classes, and any risks.

## Step 2: Design tokens

Add CSS custom properties on `:root` in the global stylesheet and use them everywhere new or touched.

```css
:root {
  /* Spacing: 4px base scale */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px;  --space-7: 48px; --space-8: 64px;

  /* Shape and depth */
  --radius-sm: 6px; --radius-md: 8px; --radius-lg: 12px;
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08);

  /* Color: map to the app's existing palette */
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-accent: #2563eb;

  /* Layout */
  --sidebar-width: 240px;
  --sidebar-width-collapsed: 64px;
}
```

If the app has no palette, default to slate neutrals with one accent color. Replace hard-coded padding, margins, gaps and radii in shared classes with tokens.

## Step 3: Shell layout

Replace the top nav with a two-column CSS Grid shell.

```
+-----------+--------------------------------------+
| Sidebar   |  Top bar (global filters / actions)  |
| brand     +--------------------------------------+
| nav links |  <main> page content (scrolls)       |
| ...       |                                      |
| widgets   |                                      |
+-----------+--------------------------------------+
```

- `.app` becomes `display: grid; grid-template-columns: var(--sidebar-width) 1fr; min-height: 100vh;`.
- `<aside class="sidebar">`: sticky, full height, brand at the top, a vertical list of the existing `router-link`s, and secondary widgets (language switcher, profile menu) pinned to the bottom with `margin-top: auto`.
- Nav links: block-level rows with `padding: var(--space-2) var(--space-3)`, `border-radius: var(--radius-md)`, a clear hover state, and an active state driven by `.router-link-active` or the existing `:class` binding (tinted background plus accent text or a left indicator).
- Content column: a slim top bar hosting the existing global filter component, then `<main>` with consistent padding (`var(--space-5)` to `var(--space-6)`) and a sensible `max-width`.
- Remove the old `.top-nav`, `.nav-container` and `.nav-tabs` styles once nothing references them.

## Step 4: Content polish

- One card style: `background: var(--color-surface)`, `1px solid var(--color-border)`, `var(--radius-lg)`, `var(--shadow-sm)`, padding from tokens.
- Consistent gaps in stat grids and page sections (`var(--space-4)` to `var(--space-5)`).
- Page headers: clear title and muted subtitle with a fixed bottom margin.
- Tables: comfortable row height, muted uppercase header cells, subtle row dividers and hover.
- Type scale: one font stack, readable sizes, restrained weights.
- Visible keyboard focus rings on links, buttons and inputs.
- Smooth but short transitions (about 150ms) on hover and active states.
- Selects: add the global `select-chevron` class (defined in `App.vue`, backed by `--select-chevron`) instead of the native arrow, which hugs the right border. Set `background-color` (never the `background` shorthand, which wipes the chevron) and at least `2rem` of right padding.

## Step 5: Responsive behavior

- Below roughly 900px, collapse the grid to one column and turn the sidebar into an off-canvas drawer.
- Add a menu button in the top bar that toggles a single `ref` (for example `sidebarOpen`) in the root component, with a backdrop that closes it. Close the drawer on route change.
- Optional: a collapsed icon-only sidebar at `--sidebar-width-collapsed` on medium widths, only if the app already has icons. Do not introduce emojis as icons.

## Step 6: Verify

1. Start the servers (the project's `start` skill, or `cd server && uv run python main.py` and `cd client && npm run dev`).
2. With Playwright MCP, for each route from the audit:
   - Navigate and confirm the page renders with no console errors.
   - Confirm the sidebar highlights the active route.
3. Exercise relocated widgets: language switcher, profile menu, tasks and profile modals, and the global filters (confirm data still updates).
4. Take screenshots at desktop width (about 1440px) and narrow width (about 390px) and check the drawer opens and closes.
5. Run `git diff --stat` and confirm only the root component, global CSS and any view-level layout styles changed. There must be no edits to `api.js`, composables, locale files or `server/`.

## Step 7: Report

Summarize the files changed, what was relocated, and any risks or regressions found. If a view's own styles clashed with the new shell, list them rather than silently rewriting unrelated views.
