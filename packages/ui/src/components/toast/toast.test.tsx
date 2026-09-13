import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Toaster, toast } from "./toast";

describe("Toast", () => {
  it("shows toast on trigger", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button onClick={() => toast("Hello toast")}>Show Toast</button>
        <Toaster />
      </>,
    );
    await user.click(screen.getByText("Show Toast"));
    await waitFor(() => {
      expect(screen.getByText("Hello toast")).toBeInTheDocument();
    });
  });

  it("shows toast with description", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button
          onClick={() => toast("With desc", { description: "A description" })}
        >
          Show Toast
        </button>
        <Toaster />
      </>,
    );
    await user.click(screen.getByText("Show Toast"));
    await waitFor(() => {
      expect(screen.getByText("With desc")).toBeInTheDocument();
      expect(screen.getByText("A description")).toBeInTheDocument();
    });
  });

  it("renders toaster without crashing", () => {
    render(<Toaster />);
    // Toaster renders a portal, no crash is the test
  });

  it("shows success toast", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button onClick={() => toast.success("Done!")}>Show</button>
        <Toaster />
      </>,
    );
    await user.click(screen.getByText("Show"));
    await waitFor(() => {
      expect(screen.getByText("Done!")).toBeInTheDocument();
    });
  });

  it("shows error toast", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button onClick={() => toast.error("Failed!")}>Show</button>
        <Toaster />
      </>,
    );
    await user.click(screen.getByText("Show"));
    await waitFor(() => {
      expect(screen.getByText("Failed!")).toBeInTheDocument();
    });
  });

  it("shows accent toast", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button onClick={() => toast.accent("Highlighted!")}>Show</button>
        <Toaster />
      </>,
    );
    await user.click(screen.getByText("Show"));
    await waitFor(() => {
      expect(screen.getByText("Highlighted!")).toBeInTheDocument();
    });
  });

  it("shows soft info toast", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button onClick={() => toast.info.soft("Soft info")}>Show</button>
        <Toaster />
      </>,
    );
    await user.click(screen.getByText("Show"));
    await waitFor(() => {
      expect(screen.getByText("Soft info")).toBeInTheDocument();
    });
  });

  it("shows soft success toast", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button onClick={() => toast.success.soft("Soft success")}>Show</button>
        <Toaster />
      </>,
    );
    await user.click(screen.getByText("Show"));
    await waitFor(() => {
      expect(screen.getByText("Soft success")).toBeInTheDocument();
    });
  });
});
