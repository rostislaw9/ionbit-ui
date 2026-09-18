import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

describe("Accordion", () => {
  it("renders with items", () => {
    render(
      <Accordion defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>Content one</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Content two</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("can expand an item by clicking trigger", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>Content one</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Content two</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    // Initially collapsed (collapsible, no default value)
    expect(screen.queryByText("Content one")).toBeNull();
    await user.click(screen.getByText("First"));
    expect(screen.getByText("Content one")).toBeInTheDocument();
  });

  it("has appropriate accessibility roles", () => {
    render(
      <Accordion defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>Content one</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    // Base UI exposes triggers as buttons and content as region.
    expect(screen.getByRole("button", { name: "First" })).toBeInTheDocument();
    expect(screen.getByRole("region")).toBeInTheDocument();
  });
});
