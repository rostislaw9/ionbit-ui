import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@ionbit-ui/ui";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const showCopied = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(showCopied)
        .catch(() => {
          fallbackCopy(text);
          showCopied();
        });
    } else {
      fallbackCopy(text);
      showCopied();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-inherit"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={handleCopy}
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } catch {
    // no-op
  }
  document.body.removeChild(textarea);
}
