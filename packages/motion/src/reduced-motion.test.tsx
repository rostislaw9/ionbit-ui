import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Glow } from "./primitives/glow";
import { Magnetic } from "./primitives/magnetic";
import { Pulse } from "./primitives/pulse";
import { Reveal } from "./primitives/reveal";
import { Spotlight } from "./primitives/spotlight";

// Helper to toggle matchMedia for prefers-reduced-motion. Non-reduce
// queries resolve as a desktop pointer environment (fine pointer, hover
// capable) so pointer-driven primitives stay enabled.
function setReducedMotion(enabled: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce")
        ? enabled
        : query.includes("hover") || query.includes("pointer: fine"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Reduced motion behavior", () => {
  it("Spotlight disables overlay when reduced motion is active", () => {
    setReducedMotion(true);
    const { container } = render(
      <Spotlight>
        <div>Content</div>
      </Spotlight>,
    );
    const overlays = container.querySelectorAll('[aria-hidden="true"]');
    expect(overlays.length).toBe(0);
  });

  it("Spotlight shows overlay when reduced motion is not active", () => {
    setReducedMotion(false);
    const { container } = render(
      <Spotlight>
        <div>Content</div>
      </Spotlight>,
    );
    const overlays = container.querySelectorAll('[aria-hidden="true"]');
    expect(overlays.length).toBeGreaterThan(0);
  });

  it("Glow still renders with reduced motion (state signal, not motion)", () => {
    setReducedMotion(true);
    render(
      <Glow always intensity={0.6}>
        <button>Active</button>
      </Glow>,
    );
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("Pulse still renders with reduced motion (collapses to static via CSS)", () => {
    setReducedMotion(true);
    render(
      <Pulse intensity={0.8}>
        <span>●</span>
      </Pulse>,
    );
    expect(screen.getByText("●")).toBeInTheDocument();
  });

  it("Magnetic does not apply spring transforms when reduced motion is active", () => {
    setReducedMotion(true);
    const { container } = render(
      <Magnetic>
        <button>Magnetic</button>
      </Magnetic>,
    );
    const wrapper = container.querySelector("div");
    expect(wrapper).toBeTruthy();
    // Motion values x/y should not be set on the style
    expect(wrapper?.style.transform).toBe("");
  });

  it("Reveal shows content immediately when reduced motion is active", () => {
    setReducedMotion(true);
    const { container } = render(
      <Reveal>
        <div>Revealed content</div>
      </Reveal>,
    );
    const wrapper = container.querySelector(
      "[data-digital-reveal]",
    ) as HTMLElement | null;
    expect(wrapper).toBeTruthy();
    expect(wrapper?.style.opacity).toBe("1");
    expect(screen.getByText("Revealed content")).toBeInTheDocument();
  });
});
