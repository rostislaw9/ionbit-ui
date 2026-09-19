# Design Tokens

> The visual contract. Components reference these semantic tokens via Tailwind utilities. Retheme by overriding the variables in your CSS — no Tailwind config edit required.

## Colors

### Surfaces

| Token                | Value                     |
| -------------------- | ------------------------- |
| `--background`       | `var(--background)`       |
| `--surface`          | `var(--surface)`          |
| `--surface-elevated` | `var(--surface-elevated)` |
| `--surface-hover`    | `var(--surface-hover)`    |

### Foreground

| Token                 | Value                      |
| --------------------- | -------------------------- |
| `--foreground`        | `var(--foreground)`        |
| `--foreground-muted`  | `var(--foreground-muted)`  |
| `--foreground-subtle` | `var(--foreground-subtle)` |

### Accent

| Token                 | Value                      |
| --------------------- | -------------------------- |
| `--accent`            | `var(--accent)`            |
| `--accent-hover`      | `var(--accent-hover)`      |
| `--accent-muted`      | `var(--accent-muted)`      |
| `--accent-subtle`     | `var(--accent-subtle)`     |
| `--accent-foreground` | `var(--accent-foreground)` |

### Success

| Token                  | Value                       |
| ---------------------- | --------------------------- |
| `--success`            | `var(--success)`            |
| `--success-hover`      | `var(--success-hover)`      |
| `--success-muted`      | `var(--success-muted)`      |
| `--success-subtle`     | `var(--success-subtle)`     |
| `--success-foreground` | `var(--success-foreground)` |

### Warning

| Token                  | Value                       |
| ---------------------- | --------------------------- |
| `--warning`            | `var(--warning)`            |
| `--warning-hover`      | `var(--warning-hover)`      |
| `--warning-muted`      | `var(--warning-muted)`      |
| `--warning-subtle`     | `var(--warning-subtle)`     |
| `--warning-foreground` | `var(--warning-foreground)` |

### Error

| Token                | Value                     |
| -------------------- | ------------------------- |
| `--error`            | `var(--error)`            |
| `--error-hover`      | `var(--error-hover)`      |
| `--error-muted`      | `var(--error-muted)`      |
| `--error-subtle`     | `var(--error-subtle)`     |
| `--error-foreground` | `var(--error-foreground)` |

### Info

| Token               | Value                    |
| ------------------- | ------------------------ |
| `--info`            | `var(--info)`            |
| `--info-hover`      | `var(--info-hover)`      |
| `--info-muted`      | `var(--info-muted)`      |
| `--info-subtle`     | `var(--info-subtle)`     |
| `--info-foreground` | `var(--info-foreground)` |

### Borders & ring

| Token              | Value                   |
| ------------------ | ----------------------- |
| `--border`         | `var(--border)`         |
| `--border-strong`  | `var(--border-strong)`  |
| `--border-accent`  | `var(--border-accent)`  |
| `--border-error`   | `var(--border-error)`   |
| `--border-success` | `var(--border-success)` |
| `--border-warning` | `var(--border-warning)` |
| `--border-info`    | `var(--border-info)`    |
| `--ring`           | `var(--ring)`           |

## Typography

| Token               | Value      |
| ------------------- | ---------- |
| `--text-sm`         | `0.875rem` |
| `--text-base`       | `1rem`     |
| `--text-lg`         | `1.125rem` |
| `--text-xl`         | `1.25rem`  |
| `--text-2xl`        | `1.5rem`   |
| `--text-3xl`        | `1.875rem` |
| `--leading-tight`   | `1.2`      |
| `--leading-normal`  | `1.5`      |
| `--leading-relaxed` | `1.65`     |
| `--tracking-tight`  | `-0.01em`  |
| `--tracking-normal` | `0`        |
| `--tracking-wide`   | `0.02em`   |
| `--weight-normal`   | `400`      |
| `--weight-medium`   | `500`      |
| `--weight-semibold` | `600`      |
| `--weight-bold`     | `700`      |

## Spacing

| Token        | Value     |
| ------------ | --------- |
| `--space-1`  | `0.25rem` |
| `--space-2`  | `0.5rem`  |
| `--space-3`  | `0.75rem` |
| `--space-4`  | `1rem`    |
| `--space-5`  | `1.25rem` |
| `--space-6`  | `1.5rem`  |
| `--space-8`  | `2rem`    |
| `--space-10` | `2.5rem`  |
| `--space-12` | `3rem`    |
| `--space-16` | `4rem`    |

## Radius

| Token           | Value                |
| --------------- | -------------------- |
| `--radius-sm`   | `var(--radius-sm)`   |
| `--radius-md`   | `var(--radius-md)`   |
| `--radius-lg`   | `var(--radius-lg)`   |
| `--radius-xl`   | `var(--radius-xl)`   |
| `--radius-full` | `var(--radius-full)` |

## Shadows

| Token                  | Value                       |
| ---------------------- | --------------------------- |
| `--shadow-xs`          | `var(--shadow-xs)`          |
| `--shadow-sm`          | `var(--shadow-sm)`          |
| `--shadow-md`          | `var(--shadow-md)`          |
| `--shadow-lg`          | `var(--shadow-lg)`          |
| `--shadow-glow`        | `var(--shadow-glow)`        |
| `--shadow-glow-error`  | `var(--shadow-glow-error)`  |
| `--shadow-focus`       | `var(--shadow-focus)`       |
| `--shadow-focus-error` | `var(--shadow-focus-error)` |

## Motion

| Token               | Value                      |
| ------------------- | -------------------------- |
| `--duration-fast`   | `140ms`                    |
| `--duration-normal` | `220ms`                    |
| `--duration-slow`   | `420ms`                    |
| `--ease-standard`   | `cubic-bezier(.2,.8,.2,1)` |
| `--ease-emphasized` | `cubic-bezier(.3,0,0,1)`   |
| `--ease-exit`       | `cubic-bezier(.4,0,1,1)`   |

## Effect intensities

| Token                    | Value  |
| ------------------------ | ------ |
| `--spotlight-intensity`  | `0.4`  |
| `--magnetic-intensity`   | `0.2`  |
| `--glow-intensity`       | `0.7`  |
| `--pulse-intensity`      | `0.65` |
| `--ripple-intensity`     | `0.3`  |
| `--tilt-intensity`       | `0.5`  |
| `--reflection-intensity` | `0.35` |

## Animations

| Token                      | Value                                |
| -------------------------- | ------------------------------------ |
| `--animate-accordion-down` | `accordion-down 220ms ease-standard` |
| `--animate-accordion-up`   | `accordion-up 220ms ease-standard`   |
