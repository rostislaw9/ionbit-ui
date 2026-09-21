import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Spotlight } from "./spotlight";

describe("Spotlight", () => {
  it("renders children", () => {
    render(
      <Spotlight>
        <div>Spotlight content</div>
      </Spotlight>,
    );
    expect(screen.getByText("Spotlight content")).toBeInTheDocument();
  });

  it("renders children when disabled", () => {
    render(
      <Spotlight disabled>
        <div>Spotlight content</div>
      </Spotlight>,
    );
    expect(screen.getByText("Spotlight content")).toBeInTheDocument();
  });

  it("does not render overlay when disabled", () => {
    const { container } = render(
      <Spotlight disabled>
        <div>Content</div>
      </Spotlight>,
    );
    // The overlay span has aria-hidden and a radial-gradient background
    const overlays = container.querySelectorAll('[aria-hidden="true"]');
    expect(overlays.length).toBe(0);
  });

  it("renders overlay when enabled", () => {
    const { container } = render(
      <Spotlight>
        <div>Content</div>
      </Spotlight>,
    );
    const overlays = container.querySelectorAll('[aria-hidden="true"]');
    expect(overlays.length).toBeGreaterThan(0);
  });

  it("clips the overlay layer without clipping children", () => {
    const { container } = render(
      <Spotlight>
        <div>Content</div>
      </Spotlight>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const clipLayer = container.querySelector(
      '[aria-hidden="true"]',
    ) as HTMLElement;
    expect(wrapper.style.overflow).toBe("");
    expect(clipLayer.style.overflow).toBe("hidden");
  });

  it("overlay is pointer-events none", () => {
    const { container } = render(
      <Spotlight>
        <div>Content</div>
      </Spotlight>,
    );
    const overlay = container.querySelector(
      '[aria-hidden="true"]',
    ) as HTMLElement;
    expect(overlay.style.pointerEvents).toBe("none");
  });
});
