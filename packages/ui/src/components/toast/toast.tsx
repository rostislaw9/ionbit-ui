import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Toast — toast notifications built on Base UI's Toast primitive.
 *
 * Built on [Base UI](https://base-ui.com/react/components/toast) (from the
 * MUI team), shadcn-inspired. Compose the toaster from `Toaster`,
 * `Toast`, `ToastContent`, `ToastTitle`, `ToastDescription`,
 * `ToastAction`, `ToastClose`, and `ToastIcon`. Use the imperative
 * `toast` API (or `createToastManager`) to show toasts from anywhere.
 *
 * Base UI handles stacking, smooth repositioning, swipe-to-dismiss,
 * auto-dismiss, and reduced motion.
 *
 * Usage:
 * ```tsx
 * import { Toaster, toast } from "@/components/ui/toast";
 *
 * <App>
 *   <Toaster />
 * </App>
 *
 * toast("Settings saved");
 * toast.success("Deploy complete");
 * toast.error("Deploy failed", { description: "Check the logs." });
 * ```
 */
const toastManager = ToastPrimitive.createToastManager();

/**
 * Toast position — controls where the viewport renders on screen.
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Toast type — controls the visual variant (border, background, icon).
 * Matches the Alert component variants.
 */
export type ToastType =
  | "default"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "loading"
  | "accent-soft"
  | "info-soft"
  | "success-soft"
  | "warning-soft"
  | "error-soft";

export interface ToastOptions {
  description?: React.ReactNode;
  type?: ToastType;
  duration?: number;
  id?: string;
  action?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
}

type TypedToastMethod = {
  (message: React.ReactNode, options?: ToastOptions): string;
  soft: (message: React.ReactNode, options?: ToastOptions) => string;
};

export type ToastAPI = {
  (message: React.ReactNode, options?: ToastOptions): string;
  success: TypedToastMethod;
  error: TypedToastMethod;
  info: TypedToastMethod;
  warning: TypedToastMethod;
  accent: TypedToastMethod;
  loading: (message: React.ReactNode, options?: ToastOptions) => string;
  promise: typeof toastManager.promise;
  close: typeof toastManager.close;
  update: typeof toastManager.update;
  add: typeof toastManager.add;
};

/**
 * Wraps the Base UI toast manager with an imperative API.
 * Supports `toast(msg)`, `toast.success(...)`, `toast.error(...)`,
 * `toast.info(...)`, `toast.warning(...)`, `toast.accent(...)`,
 * `toast.loading(...)`, and `toast.promise(...)`. Each typed method has a
 * `.soft` variant for the soft styling (no colored border/background).
 */
function createToastAPI(manager: typeof toastManager) {
  const api = (
    message: React.ReactNode,
    options: ToastOptions = {},
  ): string => {
    return manager.add({
      title: message,
      description: options.description,
      type: options.type,
      timeout: options.duration,
      id: options.id,
      actionProps: options.action
        ? {
            children: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  };

  function createTypedMethod(type: ToastType): TypedToastMethod {
    const method = (message: React.ReactNode, options: ToastOptions = {}) =>
      api(message, { ...options, type });
    method.soft = (message: React.ReactNode, options: ToastOptions = {}) =>
      api(message, { ...options, type: `${type}-soft` as ToastType });
    return method;
  }

  api.success = createTypedMethod("success");
  api.error = createTypedMethod("error");
  api.info = createTypedMethod("info");
  api.warning = createTypedMethod("warning");
  api.accent = createTypedMethod("accent");

  api.loading = (message: React.ReactNode, options: ToastOptions = {}) =>
    api(message, { ...options, type: "loading", duration: 0 });

  api.promise = manager.promise.bind(manager);
  api.close = manager.close.bind(manager);
  api.update = manager.update.bind(manager);
  api.add = manager.add.bind(manager);

  return api as ToastAPI;
}

const toast = createToastAPI(toastManager);

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

const VIEWPORT_POSITION_CLASSES: Record<ToastPosition, string> = {
  // On mobile (below sm), all left/center/right collapse to centered.
  "top-left":
    "top-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 [--toast-dir:-1]",
  "top-center": "top-4 left-1/2 -translate-x-1/2 [--toast-dir:-1]",
  "top-right":
    "top-4 left-1/2 -translate-x-1/2 sm:right-4 sm:left-auto sm:translate-x-0 [--toast-dir:-1]",
  "bottom-left":
    "bottom-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 [--toast-dir:1]",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 [--toast-dir:1]",
  "bottom-right":
    "bottom-4 left-1/2 -translate-x-1/2 sm:right-4 sm:left-auto sm:translate-x-0 [--toast-dir:1]",
};

function ToastViewport({
  className,
  position = "bottom-right",
  ...props
}: ToastPrimitive.Viewport.Props & { position?: ToastPosition }) {
  const vertical = position.startsWith("top") ? "top" : "bottom";
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      data-position={position}
      data-vertical={vertical}
      className={cn(
        "group/toast-viewport pointer-events-none fixed z-50 w-[calc(100%-2rem)] max-w-sm outline-none sm:w-full",
        VIEWPORT_POSITION_CLASSES[position],
        className,
      )}
      {...props}
    />
  );
}

function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        // Base
        "group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-lg border-[1.5px] border-border bg-surface-elevated text-foreground shadow-lg will-change-transform outline-none select-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Top position overrides (flip anchor and origin)
        "group-data-[vertical=top]/toast-viewport:top-0 group-data-[vertical=top]/toast-viewport:bottom-auto group-data-[vertical=top]/toast-viewport:origin-top group-data-[vertical=top]/toast-viewport:after:top-auto group-data-[vertical=top]/toast-viewport:after:bottom-full",
        // Type variants — colored (only border changes; bg stays surface-elevated)
        "data-[type=info]:border-border-info data-[type=info]:[&_svg]:text-info",
        "data-[type=success]:border-border-success data-[type=success]:[&_svg]:text-success",
        "data-[type=warning]:border-border-warning data-[type=warning]:[&_svg]:text-warning",
        "data-[type=error]:border-border-error data-[type=error]:[&_svg]:text-error",
        "data-[type=accent]:border-border-accent data-[type=accent]:[&_svg]:text-accent",
        // Type variants — soft (neutral border/bg, colored title + icon)
        "data-[type=info-soft]:text-info data-[type=info-soft]:[&_svg]:text-info",
        "data-[type=success-soft]:text-success data-[type=success-soft]:[&_svg]:text-success",
        "data-[type=warning-soft]:text-warning data-[type=warning-soft]:[&_svg]:text-warning",
        "data-[type=error-soft]:text-error data-[type=error-soft]:[&_svg]:text-error",
        "data-[type=accent-soft]:text-accent data-[type=accent-soft]:[&_svg]:text-accent",
        // CSS vars (use --toast-dir to flip stacking direction for top positions)
        "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y,0)*var(--toast-dir,1)*-1+calc(var(--toast-index)*var(--gap)*var(--toast-dir,1)*-1)+var(--toast-swipe-movement-y,0))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
        // Transforms (collapsed stacking — uses --toast-dir for direction)
        "h-(--height) [transform:translateX(var(--toast-swipe-movement-x,0))_translateY(calc(var(--toast-swipe-movement-y,0)-(var(--toast-index)*var(--peek)*var(--toast-dir,1))-(var(--shrink)*var(--height)*var(--toast-dir,1))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
        // After pseudo (gap between stacked toasts)
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        // Expanded
        "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x,0))_translateY(var(--offset-y))]",
        // Limited / starting
        "data-limited:opacity-0 data-starting-style:[transform:translateY(calc(150%*var(--toast-dir,1)))]",
        // Ending (default — direction depends on position)
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(calc(150%*var(--toast-dir,1)))]",
        // Ending (swipe directions — same for top/bottom)
        "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y,0)+150%))]",
        "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x,0)-150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x,0)+150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y,0)-150%))]",
        // Expanded ending (swipe directions)
        "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y,0)+150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x,0)-150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x,0)+150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y,0)-150%))]",
        className,
      )}
      {...props}
    />
  );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-sm text-foreground-muted", className)}
      {...props}
    />
  );
}

function ToastAction({
  className,
  render = <Button variant="outline" size="sm" />,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

function ToastClose({
  className,
  children,
  render = <Button variant="ghost" size="icon-sm" />,
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn(
        "relative shrink-0 text-foreground-muted after:absolute after:-inset-2 after:content-[''] hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
}

function ToastIcon({ type }: { type: string | undefined }) {
  let icon: React.ReactNode = null;

  // Strip -soft suffix to get the base type for icon selection
  const baseType = type?.replace(/-soft$/, "");

  if (baseType === "success") {
    icon = <CircleCheckIcon className="text-success" aria-hidden="true" />;
  } else if (baseType === "info") {
    icon = <InfoIcon className="text-info" aria-hidden="true" />;
  } else if (baseType === "warning") {
    icon = <TriangleAlertIcon className="text-warning" aria-hidden="true" />;
  } else if (baseType === "error") {
    icon = <OctagonXIcon className="text-error" aria-hidden="true" />;
  } else if (baseType === "loading") {
    icon = <Loader2Icon className="animate-spin" aria-hidden="true" />;
  }

  if (!icon) {
    return null;
  }

  return (
    <span
      data-slot="toast-icon"
      className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
    >
      {icon}
    </span>
  );
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ));
}

function Toaster({
  children,
  toastManager: manager = toastManager,
  position = "bottom-right",
  ...props
}: ToastPrimitive.Provider.Props & { position?: ToastPosition }) {
  return (
    <ToastProvider toastManager={manager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport position={position}>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastIcon,
  ToastList,
  createToastManager,
  toast,
  toastManager,
  useToastManager,
};
