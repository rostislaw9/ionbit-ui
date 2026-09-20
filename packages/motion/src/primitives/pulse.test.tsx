import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { Pulse } from "./pulse";

describe("Pulse", () => {
  it("renders children when disabled", () => {
    render(
      <Pulse disabled>
        <span>Status</span>
      </Pulse>,
    );
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders children when not disabled", () => {
    render(
      <Pulse>
        <span>Status</span>
      </Pulse>,
    );
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("applies animation style for halo variant", () => {
    const { container } = render(
      <Pulse intensity={0.8}>
        <span className="h-3 w-3 rounded-full bg-accent" />
      </Pulse>,
    );
    const wrapper = container.querySelector("span");
    expect(wrapper?.style.animation).toContain("ionbit-ui-pulse");
    expect(wrapper?.style.animation).toContain("infinite");
  });

  it("uses text-shadow keyframes for text variant", () => {
    const { container } = render(
      <Pulse variant="text" intensity={0.7}>
        <span>LIVE</span>
      </Pulse>,
    );
    const wrapper = container.querySelector("span");
    expect(wrapper?.style.animation).toContain("ionbit-ui-pulse-text");
  });

  it("uses box-shadow keyframes for halo variant", () => {
    const { container } = render(
      <Pulse variant="halo" intensity={0.7}>
        <span>●</span>
      </Pulse>,
    );
    const wrapper = container.querySelector("span");
    expect(wrapper?.style.animation).toContain("ionbit-ui-pulse-halo");
  });

  it("respects custom duration", () => {
    const { container } = render(
      <Pulse duration={3000}>
        <span>●</span>
      </Pulse>,
    );
    const wrapper = container.querySelector("span");
    expect(wrapper?.style.animation).toContain("3000ms");
  });

  // Regression: the wrapper used to be removed while `disabled`, so the
  // radius sample had to happen on the commit where the wrapper first
  // mounted. The wrapper now always mounts — this also guards that
  // toggling never drops the consumer's className or ref.
  it("inherits the child radius when the wrapper mounts after a disabled→enabled flip", () => {
    const { container, rerender } = render(
      <Pulse disabled>
        <button style={{ borderRadius: "8px" }}>b</button>
      </Pulse>,
    );
    rerender(
      <Pulse>
        <button style={{ borderRadius: "8px" }}>b</button>
      </Pulse>,
    );
    const wrapper = container.querySelector("span");
    expect(wrapper?.style.borderRadius).toBe("8px");
  });

  it("keeps the wrapper, className, and ref while disabled", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(
      <Pulse ref={ref} disabled className="wrapper-class">
        <span>Status</span>
      </Pulse>,
    );
    const wrapper = container.querySelector("span");
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass("wrapper-class");
    expect(wrapper?.style.animation).toBe("");
    expect(ref.current).toBe(wrapper);
  });

  it("attaches the ref to the wrapper when enabled", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Pulse ref={ref}>
        <span>Status</span>
      </Pulse>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
