# Ionbit UI — Architecture

This document defines the technical architecture for Ionbit UI. It is
the authoritative reference for repository structure, package layout,
styling, motion, testing, build, the registry, and the CLI.

The repository is in its first MVP iteration. The source, registry,
CLI, and documentation app are complete and validated locally. The
`ionbit-ui` CLI package is published to npm; the internal
`@ionbit-ui/*` packages are not published separately — their CSS and
source are shipped via the `ionbit-ui` package.

Decisions are stated with reasoning. Where a choice was rejected, the
reason is recorded so future contributors do not relitigate it without
new information.

---

## 1. Architectural principles

1. **Source ownership first.** Components are designed to be copied
   into a consumer's repository and owned. The npm packages exist to
   share what should not be duplicated (tokens, motion primitives,
   utilities).
2. **CSS-first, Motion-where-required.** Default to CSS transitions for
   state changes. Use Motion only for spring physics, pointer tracking,
   and gesture-driven effects that CSS cannot express.
3. **Accessibility is non-negotiable.** Complex interactive components
   layer on top of Radix Primitives. Ionbit UI owns the reduced-motion
   and motion-a11y story on top.
4. **Tokens as the contract.** Components reference semantic design
   tokens (`bg-surface`, `text-foreground`, `border-border`) via
   Tailwind utilities that resolve to CSS variables. Retheming is
   variable override, not class rewriting.
5. **Smallest sufficient dependency surface.** Every dependency must
   earn its place. No library is added because it is popular.
6. **No premature abstraction.** The registry and CLI are now built,
   but the package layout was designed first so they could be added
   without restructuring.

---

## 2. Repository structure

A Yarn workspaces monorepo. The simplest structure that supports the
component library, a documentation app, shared motion primitives,
shared tokens, the source registry, and the CLI.

```text
ionbit-ui/
├── apps/
│   └── docs/                  # Vite + React documentation app
├── packages/
│   ├── ui/                    # Component library (source-owned + npm published)
│   ├── motion/                # Motion primitives (npm published)
│   ├── tokens/                # Design tokens as CSS (npm published)
│   └── cli/                   # Ionbit UI CLI (npm published)
├── registry/                  # Source registry build scripts
├── registry.json              # Generated source registry (shadcn-compatible)
├── docs/                      # Project documentation (spec, rules, design system)
├── .yarn/
├── .yarnrc.yml
├── package.json
├── tsconfig.base.json
├── .eslintrc / eslint.config
├── .prettierrc
└── README.md
```

### Why a monorepo

- The docs app consumes the internal `@ionbit-ui/ui`,
  `@ionbit-ui/motion`, and `@ionbit-ui/tokens` packages as if they
  were published, so that the documentation site is a faithful
  integration test of the public API.
- Tokens, motion, and UI are independently versionable but co-evolve.
  A monorepo keeps them in sync without cross-repo coordination.
- The registry and CLI read component source from `packages/ui`; a
  monorepo makes this trivial.

### Why this exact shape

- `apps/docs` is separate from `packages/*` so the docs app never gets
  published as a library.
- `packages/tokens` is its own package because tokens are consumed by
  both the docs app and end users, and must be versionable
  independently of components.
- `packages/motion` is its own package because motion primitives are
  reusable independently of the component library (a user can adopt
  `<Magnetic>` without adopting our Button).
- `packages/ui` is the component library. It depends on `tokens` and
  `motion`, plus Radix primitives where needed.
- `registry/` and `tooling/` are placeholder directories. They are
  created now so the structure is stable, but contain only a README
  placeholder. No code is written for them in this phase.

### Rejected alternatives

- **Single package.** Rejected because tokens and motion must be
  independently consumable, and the docs app must not be published.
- **pnpm/Turborepo.** Rejected per the project mandate: Yarn is the
  package manager. We do not need Turborepo's caching for a
  three-package monorepo; Yarn workspaces + a few scripts suffice.
- **Nx.** Rejected as over-engineering for the current scale.

---

## 3. Package manager: Yarn 4

- **Yarn 4** (4.x) via `.yarnrc.yml`.
- **Linker: `node-modules`** (not PnP). PnP is excellent for
  application performance but creates friction for a library that
  consumers will copy source from and that may be consumed by
  toolchains unfamiliar with PnP. `node-modules` maximizes
  compatibility with Vite, Radix, Motion, and consumer projects.
- **No zero-installs.** `node_modules` is gitignored. The lockfile
  (`yarn.lock`) is committed.
- Yarn is invoked as `yarn` (the project pins a Yarn release via
  `package.json` `packageManager` and `.yarn/releases/`).

### Workspace configuration

`package.json` (root):

```json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "packageManager": "yarn@4.5.0"
}
```

`.yarnrc.yml`:

```yaml
nodeLinker: node-modules
enableGlobalCache: true
```

---

## 4. Package details

### 4.1 `@ionbit-ui/tokens`

**Purpose:** The single source of truth for design tokens, shipped as
CSS.

**Contents:**

- `src/tailwind.css` — entry point that imports the three layers below.
- `src/tokens.css` — `@theme` block mapping Tailwind utility names to
  CSS variables, plus `:root` variable definitions. The default theme
  is dark; a `.dark` class on `<html>` activates dark-mode variants in
  utilities (e.g. shimmer's brightened highlight).
- `src/base.css` — minimal base layer (reset-adjacent defaults: focus
  ring base, reduced-motion media query hook, font smoothing).
- `src/utilities.css` — CSS utilities (`no-scrollbar`, `scroll-fade`,
  `shimmer`) using Tailwind v4 `@utility` and `@property` at-rules.

**Public API:** Consumers import the CSS via
`@import "ionbit-ui/tailwind.css"` in their global CSS file. The
`ionbit-ui` npm package ships `tailwind.css`, `tokens.css`, `base.css`,
and `utilities.css` as static assets.

**Build:** A tiny script that copies/concatenates CSS into `dist/`.
No JS is emitted. `package.json` exports map:

```json
{
  "exports": {
    "./css": "./dist/tailwind.css",
    "./tokens": "./dist/tokens.css",
    "./base": "./dist/base.css",
    "./utilities": "./dist/utilities.css"
  }
}
```

**Why CSS-only:** Tokens are design contracts, not logic. Shipping
them as CSS means non-Tailwind consumers can still use them, and
Tailwind consumers get the `@theme` integration for free. No JS
runtime, no bundle cost.

### 4.2 `@ionbit-ui/motion`

**Purpose:** Reusable motion primitives (`Glow`, `Spotlight`,
`Magnetic`, `Pulse`, `Reveal`) plus shared motion tokens (timing,
easing, intensity) and reduced-motion utilities.

**Contents:**

- `src/index.ts` — public exports.
- `src/primitives/` — one file per primitive.
- `src/tokens.ts` — JS-side motion tokens (durations, easings) for
  use with Motion APIs.
- `src/hooks/` — `useReducedMotion`, `usePointerPosition`, etc.

**Dependencies:** `motion` (motion/react), `react`. Nothing else.

**Build:** Vite library mode → ESM + CJS + types. Tree-shakable.

**Why a separate package:** Motion primitives are useful independently
of the component library. A user should be able to copy
`<Magnetic>` into their project without adopting our Button. Bundling
motion into `ui` would force Motion as a dependency of every component
user.

### 4.3 `@ionbit-ui/ui`

**Purpose:** The component library. Source-owned components that
consumers copy into their repo, plus a published build for users who
prefer the npm package.

**Contents:**

- `src/components/<name>/` — one folder per component, containing
  `index.ts` (re-exports), the component `.tsx`, and a
  `<name>.variants.ts` where applicable.
- `src/lib/utils.ts` — the `cn()` helper (clsx + tailwind-merge).
- `src/lib/utils.ts` — small shared utilities.
- `src/index.ts` — public barrel.

**Documentation convention:** Each component and every named
subcomponent must begin with a `/** */` JSDoc-style block. The block
should note Radix/shadcn inspiration where applicable, describe the
component's purpose, and include an **Accessibility** section.

**Dependencies:**

- Runtime: `class-variance-authority`, `clsx`, `tailwind-merge`,
  `@radix-ui/react-*` (per component, e.g. `@radix-ui/react-slot` for
  Button, `@radix-ui/react-dialog` for Dialog), `motion` (for motion
  primitives). The CLI resolves and reports these automatically.
- Peer: `react`, `react-dom`.

**Build:** Vite library mode → ESM + CJS + types. Each component is
exported as a subpath so tree-shaking works even when consumed via npm:
`import { Button } from "@/components/ui/button"`.

**Source ownership note:** The CLI copies a component's `.tsx` and
`.variants.ts` into the consumer's `components/ui/` directory. The
consumer's `cn` helper is copied to `lib/utils.ts`. Motion primitives
are copied to `components/motion/`. CSS (tokens, base, utilities) is
shipped via the `ionbit-ui` npm package and imported with
`@import "ionbit-ui/tailwind.css"`. This is inspired by shadcn's
source-ownership model.

### 4.4 `apps/docs`

**Purpose:** The documentation site and interactive playground. Also
the primary integration test for the public packages.

**Stack:** Vite + React + Tailwind v4. No Next.js — the project must
work in plain Vite (per AGENTS §6). Documentation content is MDX
or co-located markdown; routing is `react-router`.

**Why Vite, not Next.js:** The component library must work in plain
React + Vite. Building the docs in Vite proves this continuously. A
Next.js docs app would hide SSR/edge-case incompatibilities.

---

## 5. Tailwind strategy

This is one of the most important architectural decisions. The goal:
**a user copies one component file and one CSS import, and it works —
without reproducing a hidden Tailwind config.**

### 5.1 Tailwind v4, CSS-first configuration

We use Tailwind v4 with the `@theme` directive. There is no
`tailwind.config.js` in the published packages. The tokens package
owns the theme.

### 5.2 Token layering

The tokens CSS (shipped via `ionbit-ui/tailwind.css`) is structured as:

```css
/* 1. Raw variable values, themeable by the consumer */
:root {
  --background: oklch(...);
  --foreground: oklch(...);
  --surface: oklch(...);
  --border: oklch(...);
  --accent: oklch(...);
  /* ... */
}

.dark {
  --background: oklch(...);
  /* ... */
}

/* 2. Tailwind theme mapping: utilities resolve to the variables above */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-accent: var(--accent);
  /* spacing, radius, font, shadow, motion-duration, motion-ease ... */
}
```

This gives us:

- `bg-background`, `text-foreground`, `border-border`, `bg-surface`,
  `text-accent`, etc. as first-class Tailwind utilities.
- Retheming = overriding `--background`, `--accent`, etc. in the
  consumer's CSS. No Tailwind config edit required.
- Dark mode = adding `.dark` to a root element. Light mode = adding
  `.light`. The docs app defines `@custom-variant dark` in its
  `index.css` so `@variant dark` in utilities resolves via the `.dark`
  class instead of `prefers-color-scheme`. Consumers must add the same
  directive to their global CSS if they use class-based dark mode. The
  tokens package ships both `.dark` and `.light` variable sets.
- Non-Tailwind consumers can still `var(--accent)` directly.

### 5.3 Component source uses only semantic tokens

Components never use raw colors (`bg-zinc-900`, `text-white`). They
always use semantic utilities (`bg-surface`, `text-foreground`,
`border-border`). This guarantees:

- A copied component works in any theme that defines the semantic
  variables.
- The consumer does not need to know our internal palette.
- Light/dark is automatic via variable override.

### 5.4 The `cn()` helper

`packages/ui/src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This is the standard shadcn pattern. It lets consumers pass a
`className` prop that overrides variant defaults predictably
(`twMerge` resolves conflicts, last wins).

### 5.5 What the consumer needs to use a copied component

1. Install Tailwind v4 in their project.
2. `npm install ionbit-ui` and add `@import "ionbit-ui/tailwind.css"`
   to their global CSS file (after `@import "tailwindcss"`).
3. Copy the component source via the CLI (`npx ionbit-ui add <name>`)
   or manually.
4. Install the component's npm dependencies (Radix primitive, cva,
   clsx, tailwind-merge) — the CLI resolves and reports these
   automatically.

**No hidden Tailwind config.** The only required config is the single
CSS import. This is the key property that makes source ownership
usable.

### 5.6 Avoiding brittle generated CSS

- We do not rely on Tailwind's `content` scanning of our package
  source by the consumer. The component source uses standard utility
  classes that the consumer's own Tailwind build will pick up from
  their `content` config (which includes the copied component files in
  their repo).
- We avoid dynamic class name construction (`"bg-" + variant`) which
  breaks Tailwind's static extraction. All classes are literal strings
  in `cva` definitions.

---

## 6. CSS architecture

### 6.1 Layer order

```css
@layer theme, base, components, utilities;
```

- `theme` — Tailwind's generated theme (from `@theme`).
- `base` — reset and element defaults (from `ionbit-ui/base.css`).
- `components` — component class definitions (rare; we prefer utility
  composition via `cva` over component classes).
- `utilities` — Tailwind utilities (always win over `components`).

### 6.2 Where component styles live

Components are styled via `cva` variant definitions composed of Tailwind
utilities, applied through `className`. We do **not** ship a
`@layer components` block per component. This keeps the CSS output
minimal and the source ownership model clean: the consumer sees
utility classes in the `.tsx` they copied, not opaque component
classes.

### 6.3 Focus and reduced-motion base

`ionbit-ui/base.css` defines:

- `:focus-visible` baseline (we layer component-specific focus on top).
- `@media (prefers-reduced-motion: reduce)` global rule that disables
  transitions and animations by default, with an opt-in escape hatch
  via a `.motion-safe` utility class for animations that are safe to
  keep.

This means: **by default, reduced-motion users get no animation
everywhere.** Components and motion primitives must opt in to keeping
only functional, non-motion state changes. This is stricter than most
libraries and matches AGENTS §8.

---

## 7. Motion architecture

### 7.1 Division of labor: CSS vs Motion

| Effect type                                  | Owner                      | Reason                                                                                       |
| -------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------- |
| Hover color/border/background transition     | CSS (`transition-*`)       | Compositor-friendly, no JS, works without Motion installed                                   |
| Focus-visible ring transition                | CSS                        | Same                                                                                         |
| Active/press scale                           | CSS (`active:scale-[.98]`) | Trivial, no JS needed                                                                        |
| State open/close (dialog, popover)           | CSS via `data-state`       | Radix exposes `data-state`; CSS transitions on opacity/transform are sufficient              |
| Magnetic (pointer-following translate)       | Motion                     | Requires spring physics + pointer tracking                                                   |
| Spotlight (pointer-position radial gradient) | CSS + light JS             | CSS custom property updated via `rAF`-throttled pointer handler; no animation library needed |
| Glow (focus/hover halo)                      | CSS                        | `box-shadow` transitions; no JS                                                              |
| Pulse (status/activity)                      | CSS keyframes              | Infinite animation only when explicitly enabled; disabled under reduced motion               |
| Reveal (in-view entrance)                    | Motion or CSS              | CSS `@keyframes` + `animation-timeline: view()` where supported, Motion fallback otherwise   |

**Rule: one owner per animated property.** If Motion animates
`transform`, no Tailwind `hover:scale-*` class touches `transform` on
the same element. This avoids the silent inline-style/class conflict
documented by Aceternity.

### 7.2 Motion tokens

Motion primitives export:

```ts
export const motionTokens = {
  duration: {
    fast: 140, // ms — hover, focus, button feedback
    normal: 220, // ms — dialog, dropdown, card
    slow: 420, // ms — page-level, major state change
  },
  easing: {
    standard: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    emphasized: "cubic-bezier(0.3, 0.0, 0.0, 1)",
    exit: "cubic-bezier(0.4, 0.0, 1, 1)",
  },
  spring: {
    magnetic: { stiffness: 200, damping: 15, mass: 0.3 },
    gentle: { stiffness: 120, damping: 20, mass: 0.4 },
  },
  intensity: {
    glow: 0.6,
    spotlight: 0.4,
    magnetic: 0.25, // max translate as fraction of element size
  },
} as const;
```

These tokens are the contract. Components and primitives reference
them; they do not hardcode durations or easings.

### 7.3 Primitive API shape

Each motion primitive is a wrapper component that:

- accepts `children`;
- accepts an `intensity` prop (0–1) that scales the effect;
- accepts `disabled` to turn the effect off entirely;
- automatically disables/reduces itself when
  `prefers-reduced-motion: reduce` is active (via `useReducedMotion`);
- is layout-agnostic — it does not impose width/height/padding on the
  child.

Example (illustrative, not final):

```tsx
<Magnetic intensity={0.3}>
  <Button>Confirm</Button>
</Magnetic>

<Card spotlight>...</Card>
```

### 7.4 Reduced-motion behavior per primitive

| Primitive | Reduced-motion behavior                                   |
| --------- | --------------------------------------------------------- |
| Glow      | Disabled. Focus/hover still indicated by color/contrast.  |
| Spotlight | Disabled. Surface remains usable.                         |
| Magnetic  | Disabled. Element does not move. Click target unchanged.  |
| Pulse     | Disabled. Status indicated by color/shape only.           |
| Reveal    | Replaced by instant appearance (opacity 1, no transform). |

### 7.5 Performance rules

- Pointer handlers are throttled via `requestAnimationFrame`; no
  per-pixel React state updates.
- No permanent animation loop for idle components. Pulse uses a CSS
  keyframe (compositor-only). Spotlight updates a CSS variable on a
  throttled pointer event.
- Animate `transform` and `opacity` only. Never animate `width`,
  `height`, `top`, `margin`.
- Motion's `LazyMotion` + `m` components are used in the docs app to
  keep the bundle small. Motion primitives are source-owned — consumers
  copy only the primitives they need.

---

## 8. Utilities

### 8.1 `cn()`

`clsx` + `tailwind-merge`. The single class-merging utility used by
every component. Lives in `packages/ui/src/lib/utils.ts` and is also
re-exported from the UI barrel for internal use; consumers get it
copied to `lib/utils.ts` by the CLI.

### 8.2 `cva`

`class-variance-authority` for variant definitions. Type-safe,
declarative, the industry standard for Tailwind component variants.

### 8.3 Why these and not alternatives

- **`tailwind-variants`** was considered. It bundles cva + clsx +
  tailwind-merge semantics into one package. Rejected because it is
  less widely adopted and the separation of concerns in `cva` +
  `cn()` is clearer and more familiar to shadcn-experienced
  contributors.
- **`clsx` alone** is insufficient because it does not resolve Tailwind
  class conflicts (`px-2 px-4` would both remain).

---

## 9. Testing strategy

### 9.1 Tools

- **Vitest** — unit and component tests. Vite-native, fast,
  Jest-compatible API, first-class ESM and TypeScript.
- **Testing Library (`@testing-library/react`)** — component behavior
  tests. Queries by role/label, not implementation detail.
- **`@testing-library/user-event`** — realistic keyboard/pointer
  interaction simulation for a11y and behavior tests.
- **`@testing-library/jest-dom`** — DOM assertion matchers.
- **Playwright** — deferred. Will be added when the docs site and
  registry/CLI exist, for E2E of the `add` workflow and critical
  documentation flows. Not needed for the foundation.

### 9.2 What we test

- **Utilities:** `cn()`, motion token resolution, reduced-motion
  hooks. Pure functions → unit tests.
- **Components:** behavior and a11y, not snapshots. Each interactive
  component test covers: renders with correct ARIA, keyboard
  navigation, focus management, disabled state, reduced-motion
  behavior. We do **not** snapshot DOM for every variant.
- **Motion primitives:** that they render children unchanged when
  `disabled` or under reduced-motion; that pointer handlers are
  throttled; that they do not animate forbidden properties.

### 9.3 What we do not test

- Snapshot coverage of every variant combination (brittle, low value).
- Visual regression at this phase (no Percy/Chromatic yet — deferred
  until the design is stable).

### 9.4 Accessibility testing

- Manual + automated: `axe-playwright` later; for now, Testing Library
  role-based queries + keyboard-driven tests enforce a11y by
  construction.
- Every component test file includes at least one keyboard-interaction
  test and one reduced-motion test where applicable.

### 9.5 Test file location

Co-located: `packages/ui/src/components/button/button.test.tsx`. This
keeps tests next to source and travels with the component when copied
into a consumer's repo (the consumer can delete them or keep them).

---

## 10. Build system

### 10.1 Package builds (`packages/*`)

- **Vite library mode** for `ui` and `motion`. Outputs ESM + CJS +
  TypeScript declarations (via `vite-plugin-dts`).
- **CSS copy** for `tokens`. No JS build.
- Each package has its own `package.json` with `exports` mapped to
  `dist/`.

### 10.2 Docs app build

- Standard Vite build. No library output.

### 10.3 Root scripts

```bash
yarn build       # build all packages
yarn dev         # start docs app
yarn lint        # eslint across the monorepo
yarn format      # prettier write
yarn format:check
yarn test        # vitest run
yarn test:watch
yarn typecheck   # tsc --noEmit across packages
```

### 10.4 TypeScript

- Single `tsconfig.base.json` with strict settings
  (`strict: true`, `noUncheckedIndexedAccess`, `noImplicitOverride`,
  `exactOptionalPropertyTypes`).
- Each package extends the base with its own `tsconfig.json`.
- `tsc --noEmit` is part of CI/local verification.

---

## 11. ESLint and Prettier

- **ESLint 9** flat config (`eslint.config.ts` or `.js`).
- **Prettier 3** with a shared config.
- Shared root config; packages extend it.
- `yarn lint` and `yarn format:check` must pass before a task is
  considered complete.

---

## 12. npm publishing

### 12.1 Packages to publish

- `ionbit-ui` (CLI + CSS)

### 12.2 Packages NOT published

- `apps/docs` (private)

### 12.3 Publishing mechanics

- Each publishable package has `publishConfig` set to `dist/`.
- Changesets will be adopted for versioning when the first release
  approaches. Not configured now to avoid premature tooling.
- The `@ionbit-ui/*` packages (tokens, motion, ui) are internal to the
  monorepo and are not published separately. Their CSS and source are
  shipped via the `ionbit-ui` npm package.
- No `@ionbit-ui` npm scope is needed.

### 12.4 Peer dependencies

`react` and `react-dom` are peer dependencies in `ui` and `motion`.
Component-specific dependencies (Radix, cva, clsx, tailwind-merge,
motion) are installed by the CLI when a component is added.

---

## 13. Source registry

### 13.1 Goal

A `registry.json` describing each component, its source files, its npm
dependencies, and its registry dependencies (other Ionbit UI
components/utilities it relies on). Compatible in spirit with the
shadcn registry schema so consumers familiar with shadcn find the DX
natural.

### 13.2 Current state

The registry is built. `registry.json` contains 49 items (cn, tokens,
42 components, 5 motion primitives). It is generated from
`packages/ui/src/components/*` and `packages/motion/src/primitives/*`
by `registry/build.mjs` (`yarn registry:build`).

### 13.3 Layout

- Each component lives in its own folder with a stable name
  (`button/`, `card/`, etc.). The registry references these folders.
- The `cn` helper and motion primitives are separated into importable
  units that the registry declares as dependencies.
- `registry/` contains the build script and per-item source mappings.

---

## 14. CLI

### 14.1 Goal

```bash
npx ionbit-ui init
npx ionbit-ui add button
npx ionbit-ui add card
npx ionbit-ui list
```

The CLI:

1. reads the registry;
2. resolves the component's npm and registry dependencies;
3. fetches source files;
4. transforms imports to match the consumer's alias config;
5. writes files into the consumer's `components/ui/`;
6. updates `package.json` dependencies.

### 14.2 Current state

The CLI is built and lives in `packages/cli/`. It supports `init`,
`add <component>`, and `list`, with transitive dependency resolution.
It is not yet published to npm; until then it can be run from the
repository.

---

## 15. Accessibility architecture

### 15.1 Headless base

Complex interactive components (Dialog, Popover, Tooltip, Select,
Tabs, Dropdown Menu, Checkbox, Switch, Slider) wrap Radix Primitives.
We do not reimplement focus trapping, ARIA roles, or keyboard
navigation.

### 15.2 What Ionbit UI owns

- **Focus-visible treatment:** a consistent, token-driven focus ring
  across all components, layered on top of Radix's focus management.
- **Reduced-motion:** the global base CSS disables animations under
  `prefers-reduced-motion: reduce`; motion primitives self-disable.
- **Disabled and loading states:** consistent visual + ARIA treatment
  defined at the design-system level, not per component.
- **Semantic color:** state is never communicated by motion/glow alone
  — there is always a contrast/color/shape signal (per DESIGN_SYSTEM
  §15).

### 15.3 Keyboard navigation

Every interactive component must be operable with the keyboard. Tests
enforce this via `user-event` keyboard sequences.

---

## 16. Documentation application

### 16.1 Stack

Vite + React + Tailwind v4 + react-router. MDX for content where
useful, but the foundation is plain React pages so we are not blocked
on MDX tooling.

### 16.2 What it demonstrates

- The design tokens (a tokens showcase page).
- Each component with live preview, code panel, API table, composition
  tree, accessibility notes, and on-this-page navigation. Playground
  controls are a follow-up.
- Each utility with class reference table, usage code, installation
  instructions, and section-based documentation (demos, prose, code
  blocks).
- The motion primitives with interactive demos.
- Installation instructions (CLI-based).

### 16.3 Navigation and anchoring

Section headings on both component and utility detail pages are
anchored. Each heading is wrapped in a link to `#<section-id>`, with a
muted `#` symbol appearing on hover. Three scroll paths share a single
`scrollToSection` utility:

1. **On this page sidebar** — scroll-spy tracks the active section and
   clicks scroll to it.
2. **Heading links** — clicking a section title updates the URL hash
   and scrolls to the section.
3. **URL hash navigation** — navigating to `/docs/components/tooltip#usage`
   loads the page and scrolls to the target section (with retry logic
   for lazy-loaded registry content).

The scroll-spy uses a moving trigger line that interpolates from near
the sticky header (at the top of the page) to near the bottom of the
viewport (at the bottom of the page). `scrollToSection` solves the same
equation in reverse so that clicking a link scrolls to the exact
position where the scroll-spy would highlight that section. Shared
constants (`TRIGGER_TOP`, `TRIGGER_BOTTOM_OFFSET`, `BOTTOM_MARGIN`) are
extracted to `scroll-constants.ts`.

The "On this page" sidebar supports nested subsections. Sections can
declare an optional `subsections` array, rendered indented under the
parent. Subsections share a single continuous accent rail with parent
sections. `flattenSectionIds` is used to include subsection IDs in
scroll-spy and scroll-to-anchor tracking.

Both paths apply the `section-flash` attention animation.

All content pages (Installation, Tokens, Component detail, Util detail)
have a "Copy Page" button that copies the full documentation as
markdown for pasting into AI agent context. The shared clipboard logic
is extracted into the `useCopyPage` hook. Detail pages use dynamic
generators (`componentToMarkdown`, `utilToMarkdown`) since their
content depends on registry data. Installation and Tokens pages use
static `.md` files (`src/content/installation.md`,
`src/content/tokens.md`) imported via Vite's `?raw` suffix.

### 16.4 Code splitting and registry loading

The docs app uses a two-tier registry pattern to keep chunks small:

1. **`componentManifest`** (`registry/components/manifest.ts`) — a
   lightweight array with only `name`, `label`, `category`,
   `description`, and `exampleCount`. Used by `Sidebar`,
   `ComponentsPage`, and `HomePage` so they don't pull in demo
   components or `?raw`/`?highlighted` source strings.
2. **Full registry files** (`registry/components/*.tsx`) — contain the
   complete `ComponentMeta` with examples, props, accessibility notes,
   and demo imports. `ComponentDetailPage` lazy-loads only the
   requested component's file via `import.meta.glob`, not the entire
   registry.
3. **Utility registry files** (`registry/utils/*.tsx`) — contain
   `UtilMeta` with class tables, demos, and section-based
   documentation. `UtilDetailPage` lazy-loads these the same way.

Build-time syntax highlighting is handled by `vite-plugin-shiki.ts`,
which scans the registry directories at build time and produces
highlighted HTML via Shiki with dual themes (GitHub Dark Default and
GitHub Light Default). Shiki emits dark colors as inline defaults and
light variants as `--shiki-light` CSS variables; the docs app's
`index.css` swaps to the light variables when the `.light` class is
active. Highlighted output is exposed through virtual modules:
`virtual:highlighted-inline`, `virtual:highlighted-sources-map`, and
`virtual:highlighted-source/<name>`.

Vendor chunks: `vendor-react`, `vendor-radix`, `vendor-base-ui`,
`vendor-motion`, `vendor-lucide`, `vendor-cmdk`, `vendor-sonner` are
split in `vite.config.ts` for cacheability.

### 16.5 Why it matters

The docs app is the primary integration test of the public packages
and the most visible proof of the visual identity. It must be built
with the same tokens and components as a consumer would use.

---

## 17. Dependency summary

### 17.1 Adopted

| Dependency                                         | Where                  | Why                                       |
| -------------------------------------------------- | ---------------------- | ----------------------------------------- |
| `react`, `react-dom`                               | peer in `ui`, `motion` | Framework                                 |
| `typescript`                                       | dev                    | Language                                  |
| `vite`                                             | dev                    | Build + docs app                          |
| `tailwindcss` v4                                   | dev / peer             | Styling engine                            |
| `eslint` v9 + plugins                              | dev                    | Linting                                   |
| `prettier`                                         | dev                    | Formatting                                |
| `vitest`                                           | dev                    | Tests                                     |
| `@testing-library/react`, `user-event`, `jest-dom` | dev                    | Component tests                           |
| `class-variance-authority`                         | `ui`                   | Variant definitions                       |
| `clsx`                                             | `ui`                   | Conditional classes                       |
| `tailwind-merge`                                   | `ui`                   | Tailwind class conflict resolution        |
| `motion` (motion/react)                            | `motion`               | Spring physics, pointer/gesture animation |
| `@radix-ui/react-*`                                | `ui` (per component)   | Headless accessible primitives            |
| `vite-plugin-dts`                                  | dev                    | Type emission for packages                |
| `react-router-dom`                                 | `docs`                 | Docs routing                              |

### 17.2 Evaluated and rejected (for now)

| Dependency                             | Decision              | Reason                                                                                                                                         |
| -------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `@base-ui/react`                       | Adopted per-component | Store-based model is a better fit for Combobox, Checkbox, and Switch. Migration is incremental; Radix remains for components not yet migrated. |
| `react-aria` / `react-aria-components` | Rejected as primary   | Heavier, more granular API, less idiomatic with cva/cn workflow. Revisit for date/calendar post-MVP.                                           |
| `tailwind-variants`                    | Rejected              | `cva` + `cn()` is clearer and more widely understood.                                                                                          |
| `playwright`                           | Deferred              | Needed for registry/CLI E2E, not for the foundation.                                                                                           |
| `changesets`                           | Deferred              | Add at first release prep.                                                                                                                     |
| `sonner`                               | Adopted (Toast only)  | Toast re-exports Sonner and maps Ionbit UI tokens to Sonner's CSS variables. Credit: Emil Kowalski.                                            |
| `lucide-react`                         | Not a hard dependency | Icons are consumer-chosen. Docs app may use it for demos, but it is not a runtime dependency of `ui`.                                          |

---

## 18. Verification

The foundation is considered complete only when all of the following
pass:

- `yarn install` succeeds.
- `yarn build` builds all packages.
- `yarn typecheck` passes with strict TypeScript.
- `yarn lint` passes.
- `yarn format:check` passes.
- `yarn test` passes.
- `yarn dev` starts the docs app and Tailwind classes render
  correctly.
- The docs app renders the visual prototype (Button, Card, one motion
  interaction) using the real internal packages.

The exact commands and results are recorded in the final report.

---

## 19. Decisions that may need revisiting

1. **Radix vs Base UI as the headless layer.** Radix is the default for
   ecosystem fit; Base UI is adopted per-component where its store-based
   model is a better fit (currently `Combobox`, `Checkbox`, and `Switch`).
   The `basedOn` registry field tracks which framework each component
   uses, and the docs render the correct dependency install commands and
   badge per component. ReUI's dual-version approach remains a precedent
   if broader dual-headless support is needed later.
2. **Yarn linker (node-modules vs PnP).** node-modules is chosen for
   compatibility. If the docs app grows large, we can revisit PnP for
   dev performance.
3. **Single package vs scoped packages.** The `ionbit-ui` npm package
   ships the CLI and CSS. Internal `@ionbit-ui/*` packages are not
   published. If scoped packages are needed later, the architecture
   does not depend on the current single-package model.
4. **Motion vs CSS for Reveal.** CSS `animation-timeline: view()` is
   promising but not universally supported. We may ship a CSS-first
   Reveal with a Motion fallback, or a Motion-only Reveal, depending
   on browser support at implementation time.
