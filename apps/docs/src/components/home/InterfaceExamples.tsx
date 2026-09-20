import {
  Activity,
  AlertTriangle,
  Bell,
  Check,
  Cpu,
  Gauge,
  GitMerge,
  MessageCircle,
  Rocket,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSeparator,
  Progress,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@ionbit-ui/ui";

import { TERMINAL_LABEL } from "./classes";
import { SectionLabel } from "./SectionLabel";

/** Three app fragments — settings, usage, feed — built from the same
 * components as the deploy console. Each is stateful, not a mock. */
export function InterfaceExamples() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <SectionLabel cmd="ls ./interfaces" note="settings · usage · feed" />
      <div className="grid gap-4 lg:grid-cols-3">
        <SettingsCard />
        <UsageCard />
        <ActivityCard />
      </div>
    </section>
  );
}

/** Shared pane header — an icon, a product-style label, and an optional
 * trailing control. */
function PaneHeader({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children?: ReactNode;
}) {
  return (
    <CardHeader className="h-13 flex-row items-center justify-between border-b border-border px-4 py-2.5">
      <span
        className={`flex items-center gap-2 ${TERMINAL_LABEL} text-foreground-muted`}
      >
        <span aria-hidden className="text-foreground-subtle">
          {icon}
        </span>
        {label}
      </span>
      {children}
    </CardHeader>
  );
}

/* ------------------------------------------------------------------ */
/* Notification preferences — labelled rows with descriptions,          */
/* separated by hairlines, the way a settings page actually looks.      */
/* ------------------------------------------------------------------ */

function SettingsCard() {
  const [alerts, setAlerts] = useState(true);
  const [digest, setDigest] = useState(false);
  const [channel, setChannel] = useState("slack");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      <PaneHeader icon={<Bell className="size-3" />} label="preferences" />
      <CardContent className="flex flex-1 flex-col gap-3.5 px-4 py-4">
        <Field orientation="horizontal" className="items-start justify-between">
          <FieldContent className="gap-0.5">
            <FieldLabel htmlFor="ex-alerts">Deploy alerts</FieldLabel>
            <FieldDescription className="text-xs">
              Failures, recoveries, and rollbacks.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="ex-alerts"
            size="sm"
            checked={alerts}
            onCheckedChange={setAlerts}
          />
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal" className="items-start justify-between">
          <FieldContent className="gap-0.5">
            <FieldLabel htmlFor="ex-digest">Weekly digest</FieldLabel>
            <FieldDescription className="text-xs">
              A Monday summary of activity.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="ex-digest"
            size="sm"
            checked={digest}
            onCheckedChange={setDigest}
          />
        </Field>
        <FieldSeparator />
        <Field
          orientation="horizontal"
          className="items-center justify-between"
        >
          <FieldContent className="gap-0.5">
            <FieldLabel>Delivery channel</FieldLabel>
            <FieldDescription className="text-xs">
              Where notifications land.
            </FieldDescription>
          </FieldContent>
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slack">Slack</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="webhook">Webhook</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </CardContent>
      <CardFooter className="justify-between border-t border-border px-4 py-2.5">
        <span className="text-xs text-foreground-subtle">
          {saved ? "preferences synced" : "unsaved changes"}
        </span>
        <Button variant="outline" size="sm" onClick={save}>
          {saved ? <Check data-icon="inline-start" /> : null}
          {saved ? "Saved" : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Usage — plan quotas as product-style meter rows; the period select    */
/* actually switches the dataset.                                       */
/* ------------------------------------------------------------------ */

interface UsageRow {
  label: string;
  used: string;
  pct: number;
}

const USAGE: Record<string, { rows: UsageRow[]; resets: string }> = {
  "24h": {
    rows: [
      { label: "requests", used: "6.2M / 10M", pct: 62 },
      { label: "storage", used: "410 GB / 1 TB", pct: 41 },
      { label: "build minutes", used: "1,560 / 2,000", pct: 78 },
    ],
    resets: "in 9h",
  },
  "7d": {
    rows: [
      { label: "requests", used: "41M / 55M", pct: 74 },
      { label: "storage", used: "410 GB / 1 TB", pct: 41 },
      { label: "build minutes", used: "9,400 / 12,000", pct: 83 },
    ],
    resets: "in 3d",
  },
  "30d": {
    rows: [
      { label: "requests", used: "24M / 40M", pct: 58 },
      { label: "storage", used: "410 GB / 1 TB", pct: 41 },
      { label: "build minutes", used: "8,120 / 12,000", pct: 67 },
    ],
    resets: "in 12 days",
  },
};

function UsageCard() {
  const [period, setPeriod] = useState("30d");
  const data = USAGE[period]!;

  return (
    <Card className="flex flex-col overflow-hidden">
      <PaneHeader icon={<Gauge className="size-3" />} label="usage">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">24h</SelectItem>
            <SelectItem value="7d">7d</SelectItem>
            <SelectItem value="30d">30d</SelectItem>
          </SelectContent>
        </Select>
      </PaneHeader>
      <CardContent className="flex flex-1 flex-col justify-center gap-4 px-4 py-4">
        {data.rows.map((r) => (
          <div key={r.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-foreground-muted">{r.label}</span>
              <span className="text-foreground-subtle tabular-nums">
                {r.used}
              </span>
            </div>
            <Progress value={r.pct} aria-label={`${r.label} usage`} />
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-between border-t border-border px-4 py-3.5">
        <span className="text-xs text-foreground-subtle">
          resets {data.resets}
        </span>
        <Badge variant="outline" className="font-mono">
          pro tier
        </Badge>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Activity feed — day groups, two-line entries, per-event icons, and   */
/* unread markers the action actually clears.                           */
/* ------------------------------------------------------------------ */

interface FeedEvent {
  id: string;
  who: string;
  action: string;
  target: string;
  time: string;
  icon: ReactNode;
  unread: boolean;
}

const FEED: { group: string; events: FeedEvent[] }[] = [
  {
    group: "today",
    events: [
      {
        id: "e1",
        who: "jd",
        action: "deployed",
        target: "web-app@2.14.2 → prod",
        time: "2m",
        icon: <Rocket className="size-3 text-success" />,
        unread: true,
      },
      {
        id: "e2",
        who: "ak",
        action: "merged",
        target: "PR #4821 · fix scheduler drain",
        time: "14m",
        icon: <GitMerge className="size-3 text-accent" />,
        unread: true,
      },
      {
        id: "e3",
        who: "tm",
        action: "opened incident",
        target: "INC-4821 · sev2",
        time: "1h",
        icon: <AlertTriangle className="size-3 text-warning" />,
        unread: true,
      },
    ],
  },
  {
    group: "yesterday",
    events: [
      {
        id: "e4",
        who: "system",
        action: "auto-scaled",
        target: "api-edge · 3 → 4 replicas",
        time: "3h",
        icon: <Cpu className="size-3 text-foreground-muted" />,
        unread: false,
      },
      {
        id: "e5",
        who: "rs",
        action: "commented on",
        target: "deploy #1409",
        time: "5h",
        icon: <MessageCircle className="size-3 text-foreground-muted" />,
        unread: false,
      },
      {
        id: "e6",
        who: "jd",
        action: "rotated",
        target: "edge certificates",
        time: "1d",
        icon: <Activity className="size-3 text-foreground-muted" />,
        unread: false,
      },
    ],
  },
];

function ActivityCard() {
  const [unread, setUnread] = useState(
    () =>
      new Set(
        FEED.flatMap((g) => g.events.filter((e) => e.unread).map((e) => e.id)),
      ),
  );
  // Ambient arrivals — the feed breathes like the deploy console: a new
  // event lands every ~9s, marked unread, with the list capped.
  const [liveEvents, setLiveEvents] = useState<FeedEvent[]>([]);
  const liveId = useRef(0);

  useEffect(() => {
    const pool: (() => Omit<FeedEvent, "id" | "time" | "unread">)[] = [
      () => ({
        who: "ak",
        action: "deployed",
        target: "api-edge@1.8.3 → staging",
        icon: <Rocket className="size-3 text-success" />,
      }),
      () => ({
        who: "tm",
        action: "resolved",
        target: "INC-4821 · sev2 → resolved",
        icon: <Check className="size-3 text-success" />,
      }),
      () => ({
        who: "system",
        action: "auto-scaled",
        target: "web-app · 4 → 3 replicas",
        icon: <Cpu className="size-3 text-foreground-muted" />,
      }),
      () => ({
        who: "jd",
        action: "merged",
        target: "PR #4824 · retry backoff",
        icon: <GitMerge className="size-3 text-accent" />,
      }),
    ];
    const id = setInterval(() => {
      const data = pool[liveId.current % pool.length]!();
      liveId.current += 1;
      const event: FeedEvent = {
        ...data,
        id: `live-${liveId.current}`,
        time: "now",
        unread: true,
      };
      setLiveEvents((prev) => [event, ...prev].slice(0, 4));
      setUnread((u) => new Set(u).add(event.id));
    }, 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <Card className="flex h-[20rem] flex-col overflow-hidden">
      <PaneHeader icon={<Activity className="size-3" />} label="activity">
        <Button
          variant="ghost"
          size="sm"
          disabled={unread.size === 0}
          onClick={() => setUnread(new Set())}
        >
          Mark all read
        </Button>
      </PaneHeader>
      {/* Fixed card height — the feed scrolls internally, so live arrivals
          never resize the card. `min-h-0` lets the viewport shrink below
          its content height inside the column flex layout. */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="px-4 py-1">
          {liveEvents.length > 0 && (
            <div>
              <p
                className={`pt-2.5 pb-1 ${TERMINAL_LABEL} text-foreground-subtle`}
              >
                just now
              </p>
              {liveEvents.map((e) => (
                <FeedRow key={e.id} event={e} unread={unread.has(e.id)} />
              ))}
            </div>
          )}
          {FEED.map((g) => (
            <div key={g.group}>
              <p
                className={`pt-2.5 pb-1 ${TERMINAL_LABEL} text-foreground-subtle`}
              >
                {g.group}
              </p>
              {g.events.map((e) => (
                <FeedRow key={e.id} event={e} unread={unread.has(e.id)} />
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}

function FeedRow({ event, unread }: { event: FeedEvent; unread: boolean }) {
  return (
    <div className="flex items-start gap-3 border-b border-border py-2.5 last:border-0">
      <Avatar size="sm">
        <AvatarFallback>{event.who.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-foreground-muted">
          <span className="font-medium text-foreground">{event.who}</span>{" "}
          {event.action}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 truncate font-mono text-[10px] text-foreground-subtle">
          {event.icon}
          {event.target}
        </p>
      </div>
      <span className="mt-0.5 flex shrink-0 items-center gap-1.5">
        <span className="font-mono text-[10px] text-foreground-subtle">
          {event.time}
        </span>
        <span
          aria-hidden
          className={`size-1.5 rounded-full ${unread ? "bg-accent" : ""}`}
        />
      </span>
    </div>
  );
}
