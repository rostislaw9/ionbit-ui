import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const avatarSizes = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
} as const;

export interface AvatarProps extends React.ComponentProps<
  typeof AvatarPrimitive.Root
> {
  /** Avatar size. @default "md" */
  size?: keyof typeof avatarSizes;
}

/**
 * Avatar — an image element with fallback, status, and badge support.
 *
 * Accessibility: Radix handles alt text via the `alt` prop on `AvatarImage`.
 * When the image fails to load, `AvatarFallback` is shown. Provide a
 * meaningful fallback (initials or icon). Use `AvatarStatus` to show a
 * presence indicator (online/offline/busy) or `AvatarBadge` for custom
 * badges (icons, labels). Wrap multiple avatars in `AvatarGroup`.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, size = "md", ...props },
  ref,
) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 rounded-full",
        avatarSizes[size],
        className,
      )}
      {...props}
    />
  );
});

export type AvatarImageProps = React.ComponentProps<
  typeof AvatarPrimitive.Image
>;

/**
 * AvatarImage — the actual image displayed inside an Avatar.
 *
 * Renders an `<img>` absolutely positioned to fill the avatar's circular
 * container. Pass an `alt` prop for accessibility — screen readers use it
 * to describe the avatar. When the image fails to load, Radix automatically
 * swaps to `AvatarFallback`.
 */
export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  function AvatarImage({ className, ...props }, ref) {
    return (
      <AvatarPrimitive.Image
        ref={ref}
        className={cn(
          "absolute inset-0 size-full rounded-full border border-border bg-surface object-cover",
          className,
        )}
        {...props}
      />
    );
  },
);

export type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarPrimitive.Fallback
>;

/**
 * AvatarFallback — the content shown when `AvatarImage` fails to load.
 *
 * Typically displays initials or an icon. Rendered as a centered span
 * with an elevated background. Provide meaningful fallback content so
 * the avatar remains informative even without an image.
 */
export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  function AvatarFallback({ className, ...props }, ref) {
    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-full border border-border bg-surface-elevated text-sm font-medium text-foreground-muted",
          className,
        )}
        {...props}
      />
    );
  },
);

export interface AvatarStatusProps extends HTMLAttributes<HTMLSpanElement> {
  /** Status color variant. @default "online" */
  variant?: "online" | "offline" | "busy" | "away";
  /** Position of the status indicator. @default "bottom-right" */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const statusColors: Record<
  NonNullable<AvatarStatusProps["variant"]>,
  string
> = {
  online: "bg-success",
  offline: "bg-foreground-subtle",
  busy: "bg-error",
  away: "bg-warning",
};

const statusPositions: Record<
  NonNullable<AvatarStatusProps["position"]>,
  string
> = {
  "top-left": "left-0.5 top-0.5",
  "top-right": "right-0.5 top-0.5",
  "bottom-left": "bottom-0.5 left-0.5",
  "bottom-right": "bottom-0.5 right-0.5",
};

/**
 * AvatarStatus — a small presence indicator overlaid on the avatar.
 *
 * Place inside `<Avatar>` as a sibling of `AvatarImage` / `AvatarFallback`.
 * The dot is bordered to separate it from the avatar edge.
 */
export const AvatarStatus = forwardRef<HTMLSpanElement, AvatarStatusProps>(
  function AvatarStatus(
    { className, variant = "online", position = "bottom-right", ...props },
    ref,
  ) {
    return (
      <span
        ref={ref}
        role="img"
        className={cn(
          "absolute z-10 size-3.5 rounded-full border-2 border-background ring-2 ring-background/50 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
          statusColors[variant],
          statusPositions[position],
          className,
        )}
        {...props}
      />
    );
  },
);

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement>;

/**
 * AvatarGroup — overlapping avatars in a horizontal row.
 *
 * Children should be `Avatar` elements. Use `AvatarGroupCount` as the
 * last child to show a "+N" overflow indicator. Avatars overlap via
 * negative spacing and each gets a ring matching the background to
 * separate them visually.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex -space-x-2 [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-background",
          className,
        )}
        {...props}
      />
    );
  },
);

export type AvatarGroupCountProps = HTMLAttributes<HTMLDivElement>;

/**
 * AvatarGroupCount — overflow count shown at the end of an AvatarGroup.
 *
 * Renders as a circular element matching avatar sizing. Place as the
 * last child of `AvatarGroup`.
 */
export const AvatarGroupCount = forwardRef<
  HTMLDivElement,
  AvatarGroupCountProps
>(function AvatarGroupCount({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-sm font-medium text-foreground-muted ring-2 ring-background",
        className,
      )}
      {...props}
    />
  );
});

export type AvatarBadgeProps = HTMLAttributes<HTMLSpanElement>;

/**
 * AvatarBadge — a small status badge overlaid on the avatar corner.
 *
 * Similar to `AvatarStatus` but accepts arbitrary children (icon, dot).
 * Positioned at the bottom-right by default. Use color utilities on
 * the badge to convey meaning (e.g. `bg-success`).
 */
export const AvatarBadge = forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  function AvatarBadge({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute right-0 bottom-0 z-10 flex items-center justify-center rounded-full ring-2 ring-background",
          className,
        )}
        {...props}
      />
    );
  },
);
