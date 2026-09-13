import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

describe("Collapsible", () => {
  it("renders trigger and content", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByText("Toggle")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("hides content when closed", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.queryByText("Hidden content")).toBeNull();
  });

  it("expands on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.queryByText("Content")).toBeNull();
    await user.click(screen.getByText("Toggle"));
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("supports controlled open state", async () => {
    const user = userEvent.setup();
    let lastOpen = false;
    render(
      <Collapsible
        open={lastOpen}
        onOpenChange={(open) => {
          lastOpen = open;
        }}
      >
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.queryByText("Content")).toBeNull();
    await user.click(screen.getByText("Toggle"));
    expect(lastOpen).toBe(true);
  });

  it("trigger is a button with proper aria attributes", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("sets data-open attribute when open", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("data-panel-open");
  });
});
