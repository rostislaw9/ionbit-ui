import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    value: "plans",
    trigger: "Which plans are available?",
    content:
      "Starter, Team, and Enterprise tiers. Every plan includes unlimited projects; higher tiers add audit logs, SSO, and priority support.",
  },
  {
    value: "security",
    trigger: "How is workspace data protected?",
    content:
      "Data is encrypted in transit and at rest, with daily backups retained for 30 days. Enterprise workspaces can pin a storage region.",
  },
  {
    value: "integrations",
    trigger: "Which integrations are supported?",
    content:
      "Slack, GitHub, Linear, and Figma connect natively. Anything else can be wired up through the REST API or outgoing webhooks.",
  },
];

export function AccordionBordersDemo() {
  return (
    <Accordion
      defaultValue={["plans"]}
      className="max-w-lg rounded-lg border border-border px-4"
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
