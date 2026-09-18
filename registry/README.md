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

| Name            | Type          | Dependencies                         |
| --------------- | ------------- | ------------------------------------ |
| `accordion`     | `registry:ui` | @base-ui/react, lucide               |
| `alert`         | `registry:ui` | cva                                  |
| `alert-dialog`  | `registry:ui` | @radix-ui/react-alert-dialog         |
| `avatar`        | `registry:ui` | @base-ui/react                       |
| `badge`         | `registry:ui` | @radix-ui/react-slot, cva            |
| `breadcrumb`    | `registry:ui` | @radix-ui/react-slot, lucide         |
| `button`        | `registry:ui` | @base-ui/react, cva, lucide          |
| `button-group`  | `registry:ui` | @base-ui/react                       |
| `card`          | `registry:ui` | —                                    |
| `checkbox`      | `registry:ui` | @base-ui/react, lucide               |
| `collapsible`   | `registry:ui` | @base-ui/react                       |
| `combobox`      | `registry:ui` | @base-ui/react, lucide               |
| `command`       | `registry:ui` | @radix-ui/react-dialog, lucide, cmdk |
| `context-menu`  | `registry:ui` | @base-ui/react                       |
| `dialog`        | `registry:ui` | @radix-ui/react-dialog               |
| `dropdown-menu` | `registry:ui` | @base-ui/react, lucide               |
| `empty`         | `registry:ui` | —                                    |
| `field`         | `registry:ui` | cva                                  |
| `hover-card`    | `registry:ui` | @radix-ui/react-hover-card           |
| `input`         | `registry:ui` | —                                    |
| `input-group`   | `registry:ui` | cva                                  |
| `label`         | `registry:ui` | @radix-ui/react-label                |
| `mode-switcher` | `registry:ui` | lucide                               |
| `native-select` | `registry:ui` | lucide                               |
| `pagination`    | `registry:ui` | lucide                               |
| `popover`       | `registry:ui` | @radix-ui/react-popover              |
| `progress`      | `registry:ui` | @base-ui/react                       |
| `radio-group`   | `registry:ui` | @base-ui/react, lucide               |
| `scroll-area`   | `registry:ui` | @radix-ui/react-scroll-area          |
| `select`        | `registry:ui` | @radix-ui/react-select, lucide       |
| `separator`     | `registry:ui` | @base-ui/react                       |
| `sheet`         | `registry:ui` | @radix-ui/react-dialog, lucide       |
| `skeleton`      | `registry:ui` | —                                    |
| `slider`        | `registry:ui` | @radix-ui/react-slider               |
| `spinner`       | `registry:ui` | lucide, cva                          |
| `switch`        | `registry:ui` | @base-ui/react                       |
| `table`         | `registry:ui` | —                                    |
| `tabs`          | `registry:ui` | @radix-ui/react-tabs                 |
| `textarea`      | `registry:ui` | —                                    |
| `toast`         | `registry:ui` | @base-ui/react, lucide               |
| `toggle`        | `registry:ui` | @base-ui/react, cva                  |
| `toggle-group`  | `registry:ui` | @base-ui/react, cva                  |
| `tooltip`       | `registry:ui` | @base-ui/react                       |

### Motion Primitives

| Name        | Type          | Dependencies |
| ----------- | ------------- | ------------ |
| `glow`      | `registry:ui` | —            |
| `magnetic`  | `registry:ui` | motion       |
| `pulse`     | `registry:ui` | —            |
| `reveal`    | `registry:ui` | —            |
| `ripple`    | `registry:ui` | —            |
| `spotlight` | `registry:ui` | —            |
| `tilt`      | `registry:ui` | motion       |

## Building

```bash
yarn registry:build
```

This reads `registry.json`, embeds file contents, and writes individual
item JSONs to `registry/items/`.
