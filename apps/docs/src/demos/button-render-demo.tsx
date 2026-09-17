import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function ButtonRenderDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button render={<Link to="/docs/components" />} nativeButton={false}>
        Components
      </Button>
      <Button
        variant="outline"
        nativeButton={false}
        render={<a href="#installation">Anchor</a>}
      />
    </div>
  );
}
