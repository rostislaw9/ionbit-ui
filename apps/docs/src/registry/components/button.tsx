import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/InlineCode";
import { ButtonIconVariantsDemo } from "../../demos/button-icon-variants-demo";
import ButtonIconVariantsDemoSource from "../../demos/button-icon-variants-demo.tsx?highlighted";
import ButtonIconVariantsDemoRaw from "../../demos/button-icon-variants-demo.tsx?raw";
import { ButtonSizesDemo } from "../../demos/button-sizes-demo";
import ButtonSizesDemoSource from "../../demos/button-sizes-demo.tsx?highlighted";
import ButtonSizesDemoRaw from "../../demos/button-sizes-demo.tsx?raw";
import { ButtonStatesDemo } from "../../demos/button-states-demo";
import ButtonStatesDemoSource from "../../demos/button-states-demo.tsx?highlighted";
import ButtonStatesDemoRaw from "../../demos/button-states-demo.tsx?raw";
import { ButtonVariantsDemo } from "../../demos/button-variants-demo";
import ButtonVariantsDemoSource from "../../demos/button-variants-demo.tsx?highlighted";
import ButtonVariantsDemoRaw from "../../demos/button-variants-demo.tsx?raw";
import { ButtonWithIconDemo } from "../../demos/button-with-icon-demo";
import ButtonWithIconDemoSource from "../../demos/button-with-icon-demo.tsx?highlighted";
import ButtonWithIconDemoRaw from "../../demos/button-with-icon-demo.tsx?raw";

export const buttonMeta: ComponentMeta = {
  name: "button",
  label: "Button",
  description:
    "Triggers an action. Eight variants, five text sizes with matching icon sizes, hover scale, accent glow on primary, focus ring. Icons with data-icon adjust padding automatically.",
  category: "Form",
  examples: [
    {
      title: "Variants",
      description:
        "All eight variants including soft styles. Icons with data-icon adjust padding automatically.",
      code: ButtonVariantsDemoSource,
      rawCode: ButtonVariantsDemoRaw,
      render: () => <ButtonVariantsDemo />,
    },
    {
      title: "With Icon",
      description:
        'Remember to add data-icon="inline-start" or data-icon="inline-end" to the icon for correct spacing.',
      code: ButtonWithIconDemoSource,
      rawCode: ButtonWithIconDemoRaw,
      render: () => <ButtonWithIconDemo />,
    },
    {
      title: "Icon Variants",
      description: 'Icon-only buttons using size="icon". Requires aria-label.',
      code: ButtonIconVariantsDemoSource,
      rawCode: ButtonIconVariantsDemoRaw,
      render: () => <ButtonIconVariantsDemo />,
    },
    {
      title: "Sizes",
      description: "Five sizes paired with their icon equivalents.",
      code: ButtonSizesDemoSource,
      rawCode: ButtonSizesDemoRaw,
      render: () => <ButtonSizesDemo />,
    },
    {
      title: "States",
      description: "Disabled state with a custom loading spinner.",
      code: ButtonStatesDemoSource,
      rawCode: ButtonStatesDemoRaw,
      render: () => <ButtonStatesDemo />,
    },
  ],
  usageImport: `import { Button } from "@/components/ui/button";`,
  usageCode: `<Button variant="primary" size="md">Click me</Button>`,
  infoBlocks: [
    {
      title: "Cursor",
      description: (
        <>
          <p>
            Tailwind v4{" "}
            <a
              href="https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor"
              className="text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              switched
            </a>{" "}
            from <InlineCode>cursor: pointer</InlineCode> to{" "}
            <InlineCode>cursor: default</InlineCode> for the button component.
          </p>
          <p>
            If you want to keep the <InlineCode>cursor: pointer</InlineCode>{" "}
            behavior, add the following code to your CSS file:
          </p>
          <p>
            You can also enable this during project setup with{" "}
            <InlineCode>npx ionbit-ui init --pointer</InlineCode>.
          </p>
        </>
      ),
      lang: "css",
      filename: "src/index.css",
      code: `@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}`,
    },
  ],
  props: [
    {
      name: "variant",
      type: '"primary" | "primary-soft" | "secondary" | "outline" | "ghost" | "destructive" | "destructive-soft" | "link"',
      default: '"primary"',
      description: "Visual style of the button.",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"',
      default: '"md"',
      description: "Button size. Use icon variants for icon-only buttons.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Render as child element via Radix Slot.",
    },
  ],
  accessibility: [
    "Supports keyboard navigation via native button element",
    "Focus visible ring via shadow-focus token",
    "Disabled state prevents interaction and reduces opacity",
    "Icon-only buttons require an aria-label",
  ],
  basedOn: "radix",
  isNew: false,
};
