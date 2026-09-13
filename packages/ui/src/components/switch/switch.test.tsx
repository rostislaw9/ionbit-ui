import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { Switch } from "./switch";

describe("Switch", () => {
  it("renders as a switch role", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Toggle" />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("data-unchecked");
    await user.click(sw);
    expect(sw).toHaveAttribute("data-checked");
  });

  it("respects disabled", () => {
    render(<Switch disabled aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-disabled", "true");
  });

  it("accepts custom className", () => {
    render(<Switch className="custom" aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveClass("custom");
  });
});
