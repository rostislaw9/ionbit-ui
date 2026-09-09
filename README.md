# Ionbit UI

A React UI component system with a distinctive digital visual language
and an integrated motion/interaction system.

> Build interfaces that feel alive without having to design every
> interaction from scratch.

## What this is

Ionbit UI is **not**:

- a collection of copied Magic UI components;
- a collection of flashy landing-page effects;
- generic "neon cyberpunk" UI;
- animation for animation's sake.

It **is**:

- a set of accessible React primitives;
- a coherent motion system with shared timing, easing, intensity, and
  reduced-motion tokens;
- a restrained, dark, technical visual identity built on hierarchy,
  typography, surface depth, and controlled accent light;
- source-owned — you own the components you install, inspired by the
  shadcn/ui source-ownership model.

## Packages

| Package     | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| `ionbit-ui` | CLI + CSS — source-owned components, motion primitives, tokens |

## Components

**UI (42):** Accordion, Alert, AlertDialog, Avatar, Badge, Breadcrumb,
Button, ButtonGroup, Card, Checkbox, Collapsible, Combobox, Command,
ContextMenu, Dialog, DropdownMenu, Empty, HoverCard, Input, InputGroup,
Label, ModeSwitcher, NativeSelect, Pagination, Popover, Progress,
RadioGroup, ScrollArea, Select, Separator, Sheet, Skeleton, Slider,
Spinner, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup,
Tooltip.

**Motion (5):** Glow, Pulse, Spotlight, Magnetic, Reveal.

## Quick start

### Source-owned installation (CLI)

Install components as source files into your project — you own the code:

```bash
npx ionbit-ui@latest init
npx ionbit-ui@latest add button
npx ionbit-ui@latest add accordion
npx ionbit-ui@latest list
```

This copies the component source into `src/components/ui/`, resolves registry
dependencies, and tells you which npm packages to install.

## Motion primitives

```tsx
import { Spotlight, Glow, Magnetic, Pulse, Reveal } from "@/components/motion";

// Spotlight — cursor-following radial light on hover
<Spotlight>
  <Card>...</Card>
</Spotlight>

// Glow — accent-colored box-shadow / text-shadow halo
<Glow variant="text">
  <h1>Ionbit UI</h1>
</Glow>

// Magnetic — element subtly translates toward the cursor
<Magnetic>
  <Button>Click me</Button>
</Magnetic>
```

All motion primitives respect `prefers-reduced-motion` automatically.

## Design tokens

Ionbit UI uses a semantic token system mapped to Tailwind v4 utilities:

```text
--background    --surface    --surface-elevated    --surface-hover
--foreground    --foreground-muted    --foreground-subtle
--border        --border-strong       --border-accent
--accent        --accent-hover        --accent-muted
--success       --warning             --error        --info
--radius-sm/md/lg/xl    --shadow-xs/sm/md/lg/glow
--duration-fast/normal/slow    --ease-standard/emphasized/exit
```

Override any token in your `:root` or `.dark` / `.light` selectors to retheme.
Both dark and light themes are shipped — add the `ModeSwitcher` component
for a toggle with a radial View Transition reveal animation:

```bash
npx ionbit-ui@latest add mode-switcher
```

## Requirements

- React 18 or 19
- Tailwind CSS v4
- Node.js >= 20 (for development and CLI)

## Repository

```text
apps/docs/        Vite + React documentation app
packages/tokens/  Design tokens as CSS (shipped via ionbit-ui)
packages/motion/  Motion primitives (shipped via ionbit-ui)
packages/ui/      Component library (shipped via ionbit-ui)
packages/cli/     Ionbit UI CLI + CSS (ionbit-ui)
registry/         Source registry build scripts
docs/             Project spec, architecture, design system docs
```

## Development

```bash
yarn install
yarn build          # build all packages
yarn dev            # start the docs app (http://localhost:5173)
yarn test           # run vitest
yarn typecheck      # tsc --noEmit across all packages
yarn lint           # eslint across the monorepo
yarn format         # prettier write
yarn registry:build # build the source registry
```

See `CONTRIBUTING.md` for the full development workflow.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Product Spec](docs/PRODUCT_SPEC.md)
- [Competitive Research](docs/COMPETITIVE_RESEARCH.md)
- [Agent Rules](docs/AGENTS.md)

## Acknowledgments

Ionbit UI stands on the shoulders of several excellent projects:

- [shadcn/ui](https://ui.shadcn.com) — the source-ownership model and
  component composition patterns that inspired this project.
- [Radix UI](https://www.radix-ui.com) — the headless, accessible
  primitives that power most of the overlay and form components.
- [Base UI](https://base-ui.com) — the unstyled React components from
  the MUI team that power `Combobox`.
- [Sonner](https://sonner.emilkowal.ski) by
  [Emil Kowalski](https://twitter.com/emilkowalski) — the toast engine
  that `Toast` is built on.
- [cmdk](https://cmdk.paco.me) — the command menu primitive behind
  `Command`.
- [Tailwind CSS](https://tailwindcss.com) — the utility-first styling
  layer, via Tailwind v4.

## License

[MIT](LICENSE)
