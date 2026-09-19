import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tilt } from "./tilt";

describe("Tilt", () => {
  it("renders children when disabled", () => {
    render(
      <Tilt disabled>
        <button>Hover me</button>
      </Tilt>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("renders children when not disabled", () => {
    render(
      <Tilt intensity={0.5}>
        <button>Hover me</button>
      </Tilt>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("wrapped button remains keyboard focusable", () => {
    render(
      <Tilt>
        <button>Focus me</button>
      </Tilt>,
    );
    const btn = screen.getByText("Focus me");
    btn.focus();
    expect(btn).toHaveFocus();
  });

  it("does not throw on pointermove and pointerleave", () => {
    const { container } = render(
      <Tilt intensity={0.5}>
        <button>Hover me</button>
      </Tilt>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toBeTruthy();
    expect(() => {
      fireEvent.pointerMove(wrapper, { clientX: 50, clientY: 50 });
      fireEvent.pointerLeave(wrapper);
    }).not.toThrow();
  });

  it("renders a glare layer when reflection is enabled", () => {
    const { container } = render(
      <Tilt reflection>
        <button>Hover me</button>
      </Tilt>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const glare = wrapper.querySelector("[aria-hidden]");
    expect(glare).toBeTruthy();
    expect((glare as HTMLElement).style.pointerEvents).toBe("none");
  });

  it("does not render a glare layer without reflection", () => {
    const { container } = render(
      <Tilt>
        <button>Hover me</button>
      </Tilt>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.querySelector("[aria-hidden]")).toBeNull();
  });

  it("does not render a glare layer when disabled", () => {
    const { container } = render(
      <Tilt reflection disabled>
        <button>Hover me</button>
      </Tilt>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.querySelector("[aria-hidden]")).toBeNull();
  });

  it("does not track the pointer when disabled", () => {
    const { container } = render(
      <Tilt disabled intensity={0.5}>
        <button>Hover me</button>
      </Tilt>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(() => {
      fireEvent.pointerMove(wrapper, { clientX: 50, clientY: 50 });
    }).not.toThrow();
    expect(wrapper.style.transform ?? "").not.toContain("rotate");
  });
});
