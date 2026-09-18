import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Ripple } from "./ripple";

describe("Ripple", () => {
  it("renders children when disabled", () => {
    render(
      <Ripple disabled>
        <span>Press</span>
      </Ripple>,
    );
    expect(screen.getByText("Press")).toBeInTheDocument();
  });

  it("renders children when not disabled", () => {
    render(
      <Ripple>
        <span>Press</span>
      </Ripple>,
    );
    expect(screen.getByText("Press")).toBeInTheDocument();
  });

  it("spawns a ripple on pointer down", () => {
    const { container } = render(
      <Ripple>
        <button>Press</button>
      </Ripple>,
    );
    fireEvent.pointerDown(container.firstChild as Element, { button: 0 });
    expect(container.querySelector("[data-ionbit-ripple]")).not.toBeNull();
  });

  it("does not spawn on non-primary pointer buttons", () => {
    const { container } = render(
      <Ripple>
        <button>Press</button>
      </Ripple>,
    );
    fireEvent.pointerDown(container.firstChild as Element, { button: 2 });
    expect(container.querySelector("[data-ionbit-ripple]")).toBeNull();
  });

  it("spawns a centered ripple on Enter/Space for keyboard users", () => {
    const { container } = render(
      <Ripple>
        <button>Press</button>
      </Ripple>,
    );
    fireEvent.keyDown(container.firstChild as Element, { key: "Enter" });
    expect(container.querySelector("[data-ionbit-ripple]")).not.toBeNull();
  });

  it("uses the wrapped element's computed text color by default", () => {
    const { container } = render(
      <Ripple>
        <button style={{ color: "rgb(10, 20, 30)" }}>Press</button>
      </Ripple>,
    );
    fireEvent.pointerDown(container.firstChild as Element, { button: 0 });
    const ripple = container.querySelector(
      "[data-ionbit-ripple]",
    ) as HTMLElement;
    expect(ripple.style.background).toBe("rgb(10, 20, 30)");
  });

  it("uses the color prop when provided", () => {
    const { container } = render(
      <Ripple color="rebeccapurple">
        <button>Press</button>
      </Ripple>,
    );
    fireEvent.pointerDown(container.firstChild as Element, { button: 0 });
    const ripple = container.querySelector(
      "[data-ionbit-ripple]",
    ) as HTMLElement;
    expect(ripple.style.background).toBe("rebeccapurple");
  });

  it("removes the ripple when its animation ends", () => {
    const { container } = render(
      <Ripple>
        <button>Press</button>
      </Ripple>,
    );
    fireEvent.pointerDown(container.firstChild as Element, { button: 0 });
    const ripple = container.querySelector("[data-ionbit-ripple]");
    expect(ripple).not.toBeNull();
    fireEvent.animationEnd(ripple as Element);
    expect(container.querySelector("[data-ionbit-ripple]")).toBeNull();
  });
});
