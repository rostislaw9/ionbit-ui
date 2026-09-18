import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    value: "deploys",
    trigger: "How do deploy previews work?",
    content:
      "Every push to a feature branch builds a preview URL. Previews inherit staging environment variables and expire after seven days.",
  },
  {
    value: "rollbacks",
    trigger: "Can I roll back a release?",
    content:
      "Any previous deploy can be restored from the deployments page. Rollbacks take effect immediately and keep the original build hash.",
  },
  {
    value: "domains",
    trigger: "How do I attach a custom domain?",
    content:
      "Add the domain in project settings and point its DNS records at the provided address. Certificates are issued automatically.",
  },
];

export function AccordionCardDemo() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Deployments</CardTitle>
        <CardDescription>
          Common questions about previews, rollbacks, and domains.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["deploys"]}>
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
