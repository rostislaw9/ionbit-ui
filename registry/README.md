# registry/

The Ionbit UI source registry, compatible with the [shadcn registry schema](https://ui.shadcn.com/schema/registry.json).

## Structure

```text
registry.json          # Root registry — lists all items with metadata
registry/
  build.mjs            # Script that generates individual item JSONs
  items/               # Generated item JSONs with embedded file content
    button.json
    input.json
    ...
```

## Usage with shadcn CLI

```bash
npx shadcn@latest add https://github.com/rostislaw9/ionbit-ui/registry.json
```

Or add the registry to your `components.json`:

```json
{
  "registries": {
    "ionbit-ui": "https://github.com/rostislaw9/ionbit-ui/registry.json"
  }
}
```

Then install components:

```bash
npx shadcn@latest add ionbit-ui/button
npx shadcn@latest add ionbit-ui/card
npx shadcn@latest add ionbit-ui/accordion
```

## Items

### Foundation

| Name     | Type            | Description                           |
| -------- | --------------- | ------------------------------------- |
| `cn`     | `registry:lib`  | clsx + tailwind-merge utility         |
| `tokens` | `registry:base` | Design tokens (OKLCH colors, shadows) |

### UI Components

| Name            | Type          | Dependencies                      |
| --------------- | ------------- | --------------------------------- |
| `button`        | `registry:ui` | @radix-ui/react-slot, cva, lucide |
| `input`         | `registry:ui` | —                                 |
| `textarea`      | `registry:ui` | —                                 |
| `card`          | `registry:ui` | —                                 |
| `tooltip`       | `registry:ui` | @radix-ui/react-tooltip           |
| `popover`       | `registry:ui` | @radix-ui/react-popover           |
| `tabs`          | `registry:ui` | @radix-ui/react-tabs              |
| `switch`        | `registry:ui` | @radix-ui/react-switch            |
| `slider`        | `registry:ui` | @radix-ui/react-slider            |
| `checkbox`      | `registry:ui` | @radix-ui/react-checkbox, lucide  |
| `progress`      | `registry:ui` | @radix-ui/react-progress          |
| `skeleton`      | `registry:ui` | —                                 |
| `dialog`        | `registry:ui` | @radix-ui/react-dialog            |
| `dropdown-menu` | `registry:ui` | @radix-ui/react-dropdown-menu     |
| `select`        | `registry:ui` | @radix-ui/react-select, lucide    |
| `accordion`     | `registry:ui` | @radix-ui/react-accordion, lucide |
| `toast`         | `registry:ui` | @base-ui/react, lucide-react      |

### Motion Primitives

| Name        | Type          | Description                        |
| ----------- | ------------- | ---------------------------------- |
| `spotlight` | `registry:ui` | Pointer-following radial highlight |
| `glow`      | `registry:ui` | Animated glow effect               |
| `magnetic`  | `registry:ui` | Magnetic pull toward cursor        |
| `pulse`     | `registry:ui` | Subtle pulsing animation           |
| `reveal`    | `registry:ui` | Scroll-triggered reveal            |

## Building

```bash
yarn registry:build
```

This reads `registry.json`, embeds file contents, and writes individual
item JSONs to `registry/items/`.
