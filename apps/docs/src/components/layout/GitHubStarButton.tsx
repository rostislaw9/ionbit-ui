import { MarkGithubIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Tooltip } from "@ionbit-ui/ui";

const REPO = "rostislaw9/ionbit-ui";

/** GitHub star button — links to the repo and shows the star count.
 *
 * Fetches the count from the GitHub REST API on mount. If the request
 * fails (rate limit, offline, etc.) the count is omitted and only the
 * icon + "Star" label are shown. */
export function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || typeof data.stargazers_count !== "number") return;
        setStars(data.stargazers_count);
      })
      .catch(() => {
        // Rate-limited or offline — show button without count.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Tooltip content="GitHub Repository">
      <Button
        variant="ghost"
        nativeButton={false}
        aria-label="Star ionbit-ui on GitHub"
        render={
          <Link
            to={`https://github.com/${REPO}`}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <MarkGithubIcon size={16} data-icon="inline-start" />
        {stars && stars >= 1000 && (
          <span className="text-foreground-muted tabular-nums">
            {`${(stars / 1000).toFixed(1)}k`}
          </span>
        )}
      </Button>
    </Tooltip>
  );
}
