import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Marquee } from "./marquee";

describe("Marquee", () => {
  it("renders the content twice for a seamless loop", () => {
    const { container } = render(
      <Marquee>
        <span>ITEM</span>
      </Marquee>,
    );
    expect(container.querySelectorAll("span")).toHaveLength(2);
  });

  it("hides the duplicate copy from assistive technology", () => {
    const { container } = render(
      <Marquee>
        <span>ITEM</span>
      </Marquee>,
    );
    const copies = container.querySelectorAll("[data-marquee-track] > div");
    expect(copies[0]!.hasAttribute("aria-hidden")).toBe(false);
    expect(copies[1]!.getAttribute("aria-hidden")).toBe("true");
  });

  it("loops the track over its duration", () => {
    const { container } = render(
      <Marquee duration={12}>
        <span>ITEM</span>
      </Marquee>,
    );
    const track = container.querySelector(
      "[data-marquee-track]",
    ) as HTMLElement;
    // The animation itself lives in the stylesheet — inline vars
    // drive it so the pause-on-hover rule can win.
    expect(track.style.getPropertyValue("--marquee-duration")).toBe("12s");
  });

  it("reverses direction", () => {
    const { container } = render(
      <Marquee reverse>
        <span>ITEM</span>
      </Marquee>,
    );
    const track = container.querySelector(
      "[data-marquee-track]",
    ) as HTMLElement;
    expect(track.style.getPropertyValue("--marquee-direction")).toBe("reverse");
  });

  it("pauses on hover by default and opts out", () => {
    const { container, rerender } = render(
      <Marquee>
        <span>ITEM</span>
      </Marquee>,
    );
    expect(
      container
        .querySelector("[data-marquee]")!
        .hasAttribute("data-pause-on-hover"),
    ).toBe(true);
    rerender(
      <Marquee pauseOnHover={false}>
        <span>ITEM</span>
      </Marquee>,
    );
    expect(
      container
        .querySelector("[data-marquee]")!
        .hasAttribute("data-pause-on-hover"),
    ).toBe(false);
  });

  it("renders statically when disabled", () => {
    const { container } = render(
      <Marquee disabled>
        <span>ITEM</span>
      </Marquee>,
    );
    const track = container.querySelector(
      "[data-marquee-track]",
    ) as HTMLElement;
    expect(track.style.animation).toContain("none");
  });
});
