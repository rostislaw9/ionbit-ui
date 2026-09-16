# Radix UI → Base UI Migration Tracker

Last updated: 2026-09-15

## Status

- **Migrated to Base UI:** 14 components
- **Still on Radix:** 15 components
- **No Base UI equivalent:** 4 components

## Migrated to Base UI

| Component    | Package                       | Notes                                        |
| ------------ | ----------------------------- | -------------------------------------------- |
| avatar       | `@base-ui/react/avatar`       |                                              |
| checkbox     | `@base-ui/react/checkbox`     |                                              |
| collapsible  | `@base-ui/react/collapsible`  |                                              |
| combobox     | `@base-ui/react/combobox`     |                                              |
| context-menu | `@base-ui/react/context-menu` | Migrated from `@radix-ui/react-context-menu` |
| progress     | `@base-ui/react/progress`     |                                              |
| radio-group  | `@base-ui/react/radio-group`  |                                              |
| separator    | `@base-ui/react/separator`    |                                              |
| switch       | `@base-ui/react/switch`       |                                              |
| toast        | `@base-ui/react/toast`        | Migrated from Sonner                         |
| toggle       | `@base-ui/react/toggle`       | Migrated from `@radix-ui/react-toggle`       |
| toggle-group | `@base-ui/react/toggle-group` | Migrated from `@radix-ui/react-toggle-group` |
| tooltip      | `@base-ui/react/tooltip`      |                                              |

## Still on Radix — Base UI equivalent available

| Component    | Radix package                  | Base UI package               | Priority | Notes                          |
| ------------ | ------------------------------ | ----------------------------- | -------- | ------------------------------ |
| accordion    | `@radix-ui/react-accordion`    | `@base-ui/react/accordion`    | Medium   | Self-contained, low risk       |
| alert-dialog | `@radix-ui/react-alert-dialog` | `@base-ui/react/alert-dialog` | Medium   | Used widely                    |
| button       | `@radix-ui/react-slot`         | `@base-ui/react/button`       | Low      | Only uses `Slot` for `asChild` |
| dialog       | `@radix-ui/react-dialog`       | `@base-ui/react/dialog`       | Medium   | Used widely                    |
| popover      | `@radix-ui/react-popover`      | `@base-ui/react/popover`      | Medium   | Used by other components       |
| scroll-area  | `@radix-ui/react-scroll-area`  | `@base-ui/react/scroll-area`  | Low      | Works fine on Radix            |
| select       | `@radix-ui/react-select`       | `@base-ui/react/select`       | High     | Higher complexity              |
| slider       | `@radix-ui/react-slider`       | `@base-ui/react/slider`       | Medium   | Medium complexity              |
| tabs         | `@radix-ui/react-tabs`         | `@base-ui/react/tabs`         | Medium   | Self-contained                 |

## Still on Radix — uses `@radix-ui/react-slot` only

These components only use `@radix-ui/react-slot` for the `asChild` pattern.
Base UI uses a `render` prop instead, so migrating these requires an API
change (or a compatibility wrapper). Low priority unless we decide to
deprecate `asChild` globally.

| Component    | Notes                            |
| ------------ | -------------------------------- |
| badge        | `Slot` for polymorphic rendering |
| breadcrumb   | `Slot` for polymorphic rendering |
| button-group | `Slot` for polymorphic rendering |

## Still on Radix — no direct Base UI equivalent

| Component     | Radix package                   | Base UI alternative     | Notes                                                                                                          |
| ------------- | ------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| dropdown-menu | `@radix-ui/react-dropdown-menu` | `@base-ui/react/menu`   | Base UI has no separate `dropdown-menu` — use `Menu` with a trigger. Shares menu primitives with context-menu. |
| hover-card    | `@radix-ui/react-hover-card`    | None                    | No Base UI equivalent. Would need a custom implementation or keep on Radix.                                    |
| label         | `@radix-ui/react-label`         | None                    | No Base UI equivalent. Could use native `<label>`. Low value to migrate.                                       |
| sheet         | `@radix-ui/react-dialog`        | `@base-ui/react/drawer` | Base UI has `drawer` (slide-in) instead of `dialog` (overlay). Different API — needs larger refactor.          |

## Suggested migration order

1. **dropdown-menu** — reuses `@base-ui/react/menu` primitives (same patterns as context-menu migration)
2. **accordion** — self-contained, low risk
3. **tabs** — self-contained, low risk
4. **slider** — medium complexity
5. **dialog / alert-dialog** — used widely, higher impact
6. **select** — higher complexity
7. **popover** — used by other components
8. **scroll-area** — low priority, works fine on Radix
9. **button** — only uses `Slot`, needs `asChild` → `render` prop decision
10. **badge / breadcrumb / button-group** — only uses `Slot`, blocked on `asChild` decision
11. **sheet** — needs `dialog` → `drawer` refactor
12. **hover-card** — no Base UI equivalent, keep on Radix
13. **label** — no Base UI equivalent, keep on Radix or use native `<label>`

## Notes

- Base UI uses a `render` prop instead of Radix's `asChild` prop for
  polymorphic rendering. Components that only use `@radix-ui/react-slot`
  (badge, breadcrumb, button, button-group) need an API decision before
  migration.
- Base UI's `menu` primitives are shared between context-menu, dropdown-menu,
  and menubar. Migrating context-menu first (done) established the patterns.
- Base UI's `drawer` is a slide-in panel, not a direct replacement for
  Radix's `dialog`-based sheet. The sheet component needs a larger refactor.
