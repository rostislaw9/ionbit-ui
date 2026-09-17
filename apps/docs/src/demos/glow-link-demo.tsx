import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Glow } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function GlowLinkDemo() {
  return (
    <Glow variant="text" intensity={0.9}>
      <Button
        variant="link"
        nativeButton={false}
        render={<Link to="/docs/components" />}
      >
        Components <ArrowRight data-icon="inline-end" />
      </Button>
    </Glow>
  );
}
