import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    value: "notifications",
    trigger: "Notification settings",
    content:
      "Choose which events trigger an alert. Email digests, push notifications, and in-app badges can each be toggled independently.",
  },
  {
    value: "privacy",
    trigger: "Privacy and security",
    content:
      "Manage two-factor authentication, review active sessions, and control which data is shared with connected integrations.",
  },
  {
    value: "billing",
    trigger: "Billing and plan",
    content:
      "Review your current plan, download invoices, update the payment method, or switch tiers. Changes apply at the next cycle.",
  },
];

export function AccordionMultipleDemo() {
  return (
    <Accordion multiple defaultValue={["notifications"]} className="max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
