import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion defaultValue={["billing"]} className="w-full max-w-lg">
      <AccordionItem value="billing">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm leading-relaxed text-foreground-muted">
            You&apos;re billed on the first of each month for your active plan.
            Upgrades are prorated automatically. Download past invoices from the
            billing page.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="team">
        <AccordionTrigger>Can I add team members mid-cycle?</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm leading-relaxed text-foreground-muted">
            Yes. Invite teammates at any time. Seats are prorated to your
            billing date and you&apos;ll see the adjusted charge on your next
            invoice.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="data">
        <AccordionTrigger>Where is my data stored?</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm leading-relaxed text-foreground-muted">
            All data is encrypted at rest and stored in the region you selected
            during sign-up. You can change your data residency at any time from
            workspace settings.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="cancel">
        <AccordionTrigger>What happens when I cancel?</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm leading-relaxed text-foreground-muted">
            Your workspace remains read-only for 30 days. After that, all data
            is permanently deleted. You can reactivate at any time during the
            grace period.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
