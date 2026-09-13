import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-unchecked");
  });

  it("can be checked via click", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept" />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-checked");
  });

  it("has the correct role", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("is keyboard accessible", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept" />);
    const checkbox = screen.getByRole("checkbox");
    checkbox.focus();
    expect(checkbox).toHaveFocus();
    await user.keyboard(" ");
    expect(checkbox).toHaveAttribute("data-checked");
  });
});
