import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup", () => {
  it("renders radio items", () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Option A" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Option B" })).toBeInTheDocument();
  });

  it("checks the correct item based on defaultValue", () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Option B" })).toHaveAttribute(
      "data-checked",
    );
    expect(screen.getByRole("radio", { name: "Option A" })).toHaveAttribute(
      "data-unchecked",
    );
  });

  it("can be selected via click", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    await user.click(screen.getByRole("radio", { name: "Option A" }));
    expect(screen.getByRole("radio", { name: "Option A" })).toHaveAttribute(
      "data-checked",
    );
  });

  it("is keyboard accessible", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    const firstRadio = screen.getByRole("radio", { name: "Option A" });
    firstRadio.focus();
    expect(firstRadio).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Option B" })).toHaveFocus();
  });
});
