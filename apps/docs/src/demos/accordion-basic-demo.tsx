import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    value: "item-1",
    trigger: "How do I invite teammates?",
    content:
      "Open workspace settings and send an invite by email. Invited members join with the default role; admins can change roles at any time.",
  },
  {
    value: "item-2",
    trigger: "Can I transfer a project to another workspace?",
    content:
      "Yes. Project owners can move a project between workspaces from its settings page. Deployments and environment variables carry over.",
  },
  {
    value: "item-3",
    trigger: "What happens to my data if I downgrade?",
    content:
      "Nothing is deleted. Features above your new tier become read-only until you upgrade again or reduce usage below the limit.",
  },
];

export function AccordionBasicDemo() {
  return (
    <Accordion defaultValue={["item-1"]} className="max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
