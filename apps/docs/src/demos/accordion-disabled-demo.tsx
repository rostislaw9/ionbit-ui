import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDisabledDemo() {
  return (
    <Accordion className="w-full max-w-lg">
      <AccordionItem value="history">
        <AccordionTrigger>Where can I find my activity log?</AccordionTrigger>
        <AccordionContent>
          The activity log lists every sign-in, plan change, and settings update
          on the workspace. Open it from the security section of your dashboard.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="premium" disabled>
        <AccordionTrigger>Audit exports</AccordionTrigger>
        <AccordionContent>
          Audit exports are available on the Enterprise plan. Upgrade to unlock
          this section.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="email">
        <AccordionTrigger>How do I change my email address?</AccordionTrigger>
        <AccordionContent>
          Update the address in account settings. A verification link is sent to
          the new address before the change takes effect.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
