import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox";

const names = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

function BasicCombobox({ defaultValue }: { defaultValue?: string } = {}) {
  return (
    <Combobox items={names} defaultValue={defaultValue}>
      <ComboboxInput placeholder="Select a framework" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

describe("Combobox", () => {
  it("filters from the inline input without moving focus into the popup", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const input = screen.getByRole("combobox");
    await user.click(input);
    expect(screen.getAllByRole("option")).toHaveLength(names.length);
    await user.type(input, "svelte");
    expect(input).toHaveFocus();
    expect(
      screen.getByRole("option", { name: "SvelteKit" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "Next.js" }),
    ).not.toBeInTheDocument();
  });

  it("selects with the pointer, closes, and displays the selected label", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.click(screen.getByRole("option", { name: "Next.js" }));
    expect(input).toHaveValue("Next.js");
    expect(input).toHaveFocus();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens and selects using only the keyboard", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    await user.tab();
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(screen.getByRole("combobox")).toHaveValue("SvelteKit");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows an empty state and restores options when the query is cleared", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.type(input, "not-a-framework");
    expect(screen.getByText("No items found.")).toBeInTheDocument();
    await user.clear(input);
    expect(screen.getAllByRole("option")).toHaveLength(names.length);
  });

  it("restores the selected label when Escape dismisses a search", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultValue="Next.js" />);
    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.type(input, "astro");
    await user.keyboard("{Escape}");
    expect(input).toHaveValue("Next.js");
    expect(input).toHaveFocus();
  });

  it("clears selection without opening the popup", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultValue="Next.js" />);
    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);
    expect(screen.getByRole("combobox")).toHaveValue("");
  });

  it("disables both input and toggle through the root", async () => {
    const user = userEvent.setup();
    render(
      <Combobox items={names} disabled>
        <ComboboxInput placeholder="Select a framework" showClear />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("toggles the popup using the chevron without losing input focus", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const trigger = screen.getAllByRole("button")[0];
    if (!trigger) throw new Error("expected a trigger button");
    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("dismisses on outside click without stealing outside focus", async () => {
    const user = userEvent.setup();
    render(
      <>
        <BasicCombobox />
        <button>Outside</button>
      </>,
    );
    const input = screen.getByRole("combobox");
    await user.click(input);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("keeps independent instances isolated", async () => {
    const user = userEvent.setup();
    render(
      <>
        <BasicCombobox />
        <BasicCombobox defaultValue="Astro" />
      </>,
    );
    const [first, second] = screen.getAllByRole("combobox");
    if (!first || !second) throw new Error("expected two comboboxes");
    await user.click(first);
    await user.type(first, "svelte");
    await user.keyboard("{Enter}");
    expect(first).toHaveValue("SvelteKit");
    expect(second).toHaveValue("Astro");
  });
});

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

describe("Combobox with object items", () => {
  it("renders trigger with placeholder", () => {
    render(
      <Combobox items={frameworks}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );
    expect(
      screen.getByPlaceholderText("Select a framework"),
    ).toBeInTheDocument();
  });

  it("opens popover on trigger click and shows items", async () => {
    const user = userEvent.setup();
    render(
      <Combobox items={frameworks}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );
    await user.click(screen.getByPlaceholderText("Select a framework"));
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("SvelteKit")).toBeInTheDocument();
  });

  it("calls onValueChange when an item is selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Combobox items={frameworks} onValueChange={handleChange}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );
    await user.click(screen.getByPlaceholderText("Select a framework"));
    await user.click(screen.getByText("Next.js"));
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders grouped items", async () => {
    const user = userEvent.setup();
    const groups = [
      {
        label: "Americas",
        items: [
          { value: "ny", label: "New York" },
          { value: "la", label: "Los Angeles" },
        ],
      },
      {
        label: "Europe",
        items: [
          { value: "lon", label: "London" },
          { value: "par", label: "Paris" },
        ],
      },
    ];
    render(
      <Combobox items={groups}>
        <ComboboxInput placeholder="Select a city" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {groups.map((group) => (
              <ComboboxList key={group.label}>
                {(item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );
    await user.click(screen.getByPlaceholderText("Select a city"));
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
  });
});
