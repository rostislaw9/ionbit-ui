import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./context-menu";

describe("ContextMenu", () => {
  it("opens on right-click", async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="target">
          Right click me
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Action 1</ContextMenuItem>
          <ContextMenuItem>Action 2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await user.pointer({
      keys: "[MouseRight>]",
      target: screen.getByTestId("target"),
    });
    expect(screen.getByText("Action 1")).toBeInTheDocument();
  });

  it("renders menu items", async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="target">
          Right click me
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await user.pointer({
      keys: "[MouseRight>]",
      target: screen.getByTestId("target"),
    });
    expect(screen.getByText("Cut")).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
    expect(screen.getByText("Paste")).toBeInTheDocument();
  });
});
