import type { ComponentMeta } from "./types";

import { InlineCode } from "../../components/code/InlineCode";
import { ButtonIconVariantsDemo } from "../../demos/button-icon-variants-demo";
import ButtonIconVariantsDemoSource from "../../demos/button-icon-variants-demo.tsx?highlighted";
import ButtonIconVariantsDemoRaw from "../../demos/button-icon-variants-demo.tsx?raw";
import { ButtonRenderDemo } from "../../demos/button-render-demo";
import ButtonRenderDemoSource from "../../demos/button-render-demo.tsx?highlighted";
import ButtonRenderDemoRaw from "../../demos/button-render-demo.tsx?raw";
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
    "The primary action trigger. Eight variants, five text sizes and five icon sizes, automatic icon sizing with data-icon, accent glow on primary, and tactile press feedback.",
  category: "Form",
  examples: [
    {
      title: "Variants",
      description: (
        <>
          All eight variants including soft styles. Icons with{" "}
          <InlineCode>data-icon</InlineCode> adjust padding automatically.
        </>
      ),
      code: ButtonVariantsDemoSource,
      rawCode: ButtonVariantsDemoRaw,
      render: () => <ButtonVariantsDemo />,
    },
    {
      title: "With Icon",
      description: (
        <>
          Remember to add{" "}
          <InlineCode>data-icon=&quot;inline-start&quot;</InlineCode> or{" "}
          <InlineCode>data-icon=&quot;inline-end&quot;</InlineCode> to the icon
          for correct spacing.
        </>
      ),
      code: ButtonWithIconDemoSource,
      rawCode: ButtonWithIconDemoRaw,
      render: () => <ButtonWithIconDemo />,
    },
    {
      title: "Icon Variants",
      description: (
        <>
          Icon-only buttons using <InlineCode>size=&quot;icon&quot;</InlineCode>
          . Requires <InlineCode>aria-label</InlineCode>.
        </>
      ),
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
    {
      title: "Render",
      description: (
        <>
          Use the <InlineCode>render</InlineCode> prop to compose another
          element or component, like a router link. Set{" "}
          <InlineCode>nativeButton=&#123;false&#125;</InlineCode> when the
          rendered element is not a <InlineCode>&lt;button&gt;</InlineCode>.
        </>
      ),
      code: ButtonRenderDemoSource,
      rawCode: ButtonRenderDemoRaw,
      render: () => <ButtonRenderDemo />,
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
  ],
  accessibility: [
    'Base UI applies type="button" and disabled handling automatically',
    "Keyboard activation via Space and Enter on native buttons",
    "Focus-visible ring via the ring token",
    "focusableWhenDisabled keeps disabled buttons in the tab order with aria-disabled",
    "Icon-only buttons require an aria-label",
  ],
  apiReference: {
    label: "Base UI Button",
    url: "https://base-ui.com/react/components/button#api-reference",
  },
  basedOn: "base",
};
