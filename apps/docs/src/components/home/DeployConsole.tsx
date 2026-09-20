import {
  Copy,
  Ellipsis,
  RefreshCw,
  Rocket,
  RotateCcw,
  Terminal,
} from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Glow, Pulse, Scramble, Trace } from "@ionbit-ui/motion";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Progress,
  ProgressLabel,
  ProgressValue,
  ScrollArea,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  cn,
} from "@ionbit-ui/ui";

import { COMPONENT_SLUGS } from "../../lib/library";
import { TERMINAL_LABEL } from "./classes";
import { SectionLabel } from "./SectionLabel";

type Env = "production" | "staging" | "dev";
type Status = "live" | "degraded" | "deploying";

interface Service {
  id: string;
  name: string;
  version: string;
  status: Status;
  replicas: number;
  region: string;
  uptime: string;
  age: string;
}

const SERVICES: Record<Env, Service[]> = {
  production: [
    {
      id: "api-edge",
      name: "api-edge",
      version: "2.14.1",
      status: "live",
      replicas: 4,
      region: "fra1",
      uptime: "99.98",
      age: "3d",
    },
    {
      id: "web-app",
      name: "web-app",
      version: "1.9.3",
      status: "live",
      replicas: 3,
      region: "fra1",
      uptime: "99.95",
      age: "18h",
    },
    {
      id: "scheduler",
      name: "scheduler",
      version: "0.8.2",
      status: "degraded",
      replicas: 1,
      region: "iad1",
      uptime: "98.41",
      age: "6d",
    },
    {
      id: "assets",
      name: "assets",
      version: "3.2.0",
      status: "live",
      replicas: 2,
      region: "sfo1",
      uptime: "100.0",
      age: "1w",
    },
  ],
  staging: [
    {
      id: "api-edge",
      name: "api-edge",
      version: "2.15.0-rc.2",
      status: "live",
      replicas: 2,
      region: "fra1",
      uptime: "99.90",
      age: "4h",
    },
    {
      id: "web-app",
      name: "web-app",
      version: "1.10.0-beta.4",
      status: "live",
      replicas: 2,
      region: "iad1",
      uptime: "99.72",
      age: "7h",
    },
    {
      id: "scheduler",
      name: "scheduler",
      version: "0.9.0-rc.1",
      status: "live",
      replicas: 1,
      region: "iad1",
      uptime: "99.20",
      age: "2d",
    },
  ],
  dev: [
    {
      id: "sandbox",
      name: "sandbox",
      version: "0.4.0",
      status: "live",
      replicas: 1,
      region: "dev",
      uptime: "97.20",
      age: "31m",
    },
    {
      id: "web-app",
      name: "web-app",
      version: "1.11.0-dev.7",
      status: "degraded",
      replicas: 1,
      region: "dev",
      uptime: "95.84",
      age: "52m",
    },
  ],
};

const STATUS_VARIANT: Record<Status, "success" | "warning" | "accent"> = {
  live: "success",
  degraded: "warning",
  deploying: "accent",
};

type Level = "cmd" | "info" | "ok" | "warn" | "hint";

const LEVEL_CLASS: Record<Level, string> = {
  cmd: "text-accent",
  info: "text-foreground-muted",
  ok: "text-success",
  warn: "text-warning",
  hint: "text-foreground-subtle",
};

interface LogLine {
  id: number;
  ts: string;
  level: Level;
  text: string;
}

const REGIONS = ["fra1", "iad1", "sfo1", "hnd1"] as const;
const LOG_CAP = 36;

const rand = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));
const pick = <T,>(arr: readonly T[]) => arr[rand(0, arr.length - 1)]!;
const now = () => new Date().toTimeString().slice(0, 8);
const newDeployId = () => `dpl_${Math.random().toString(36).slice(2, 8)}`;
const sha = () => Math.random().toString(16).slice(2, 9);
const BLOCKS = "▁▂▃▄▅▆▇";

/** Bumps the trailing numeric segment — semver patches and `rc.N` alike. */
function bumpPatch(version: string, delta = 1): string {
  const parts = version.split(".");
  const last = parts[parts.length - 1]!;
  const n = Number.parseInt(last, 10);
  if (Number.isNaN(n)) return version;
  parts[parts.length - 1] = String(Math.max(0, n + delta));
  return parts.join(".");
}

/** Plausible background traffic for the log tail — the fictional app's
 * requests browse component routes from the real manifest. */
const AMBIENT: readonly (() => string)[] = [
  () => `GET /components/${pick(COMPONENT_SLUGS)} · 200 · ${rand(2, 9)}ms`,
  () => `GET /components/${pick(COMPONENT_SLUGS)} · 304 · ${rand(1, 4)}ms`,
  () =>
    `search "${pick(COMPONENT_SLUGS)}" · ${rand(0, 3)} hits · ${rand(2, 8)}ms`,
  () => `POST /v1/telemetry · 204 · ${rand(3, 12)}ms`,
  () => `cache hit · edge/${pick(REGIONS)}`,
  () => `heartbeat ok · shard ${rand(0, 15)}`,
  () => `gc pause ${(rand(4, 18) / 10).toFixed(1)}ms`,
  () => `pool checkout · ${rand(2, 9)} conns`,
];

/** Deploy log lines, fired when the progress bar crosses each threshold. */
const DEPLOY_STEPS: readonly [number, Level, (s: Service) => string][] = [
  [8, "info", () => "resolving manifest · ok"],
  [18, "info", () => `checkout · ${sha()}`],
  [34, "info", () => `compiling ${rand(160, 240)} modules`],
  [52, "info", () => `tree-shake · ${rand(60, 120)} kB dropped`],
  [
    68,
    "info",
    () => `bundle ${rand(380, 460)} kB → ${rand(90, 110)} kB brotli`,
  ],
  [80, "warn", () => `tarball +${rand(3, 9)}% vs prev`],
  [88, "info", (s) => `pushing to edge · ${s.region}`],
  [94, "info", () => "health check · 200 ok"],
];

interface Deploy {
  serviceName: string;
  pct: number;
}

/** The console is a small state machine: pick an env, select a service,
 * tune replicas, deploy. Every control mutates real state — the table,
 * the log tail, and the status bar all reflect it. */
export function DeployConsole() {
  const [env, setEnv] = useState<Env>("production");
  const [servicesByEnv, setServicesByEnv] = useState(SERVICES);
  const [selectedId, setSelectedId] = useState("api-edge");
  const [lines, setLines] = useState<LogLine[]>(() => [
    { id: 0, ts: now(), level: "cmd", text: "$ tail -f deploys.log" },
    { id: 1, ts: now(), level: "info", text: "stream attached · ionbit/app" },
    {
      id: 2,
      ts: now(),
      level: "hint",
      text: "pick a service, hit deploy — or just watch",
    },
  ]);
  const [liveTail, setLiveTail] = useState(true);
  const [deploy, setDeploy] = useState<Deploy | null>(null);
  const [deployId, setDeployId] = useState("dpl_8f3a21c");
  const [spark, setSpark] = useState("▂▃▂▁▃▂▃▂▁");

  const lineId = useRef(2);
  const deployTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);

  const services = servicesByEnv[env];
  const selected = services.find((s) => s.id === selectedId) ?? services[0]!;
  const healthy = services.filter((s) => s.status === "live").length;

  const push = useCallback((level: Level, text: string) => {
    // Every log event is a request — tick the sparkline with the line.
    setSpark((s) => (s + BLOCKS[rand(0, BLOCKS.length - 1)]).slice(-9));
    setLines((ls) => [
      ...ls.slice(-(LOG_CAP - 1)),
      { id: lineId.current++, ts: now(), level, text },
    ]);
  }, []);

  const patchService = useCallback(
    (e: Env, id: string, patch: Partial<Service>) =>
      setServicesByEnv((prev) => ({
        ...prev,
        [e]: prev[e].map((s) => (s.id === id ? { ...s, ...patch } : s)),
      })),
    [],
  );

  // Ambient tail — one interval, bounded buffer, pauses with the switch.
  // Rarely, a degraded service self-heals: the badge flips live and the
  // healthy count in the status bar visibly ticks up.
  useEffect(() => {
    if (!liveTail) return;
    const id = setInterval(() => {
      const degraded = servicesByEnv[env].find((s) => s.status === "degraded");
      if (degraded && Math.random() < 0.12) {
        patchService(env, degraded.id, { status: "live" });
        push("ok", `auto-heal · ${degraded.name} recovered`);
      } else {
        push("info", pick(AMBIENT)());
      }
    }, 1600);
    return () => clearInterval(id);
  }, [liveTail, env, servicesByEnv, push, patchService]);

  // Follow the tail only while the user is pinned to the bottom —
  // scrolling up releases the lock until they return. DOM writes only.
  useEffect(() => {
    const viewport = scrollRef.current?.querySelector<HTMLElement>(
      "[data-radix-scroll-area-viewport]",
    );
    if (!viewport) return;
    const onScroll = () => {
      stickRef.current =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 24;
    };
    viewport.addEventListener("scroll", onScroll);
    return () => viewport.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const viewport = scrollRef.current?.querySelector<HTMLElement>(
      "[data-radix-scroll-area-viewport]",
    );
    if (viewport && stickRef.current)
      viewport.scrollTop = viewport.scrollHeight;
  }, [lines]);

  useEffect(
    () => () => {
      if (deployTimer.current) clearInterval(deployTimer.current);
    },
    [],
  );

  const changeEnv = useCallback(
    (next: string) => {
      if (!next || next === env) return;
      const target = next as Env;
      setEnv(target);
      setSelectedId(servicesByEnv[target][0]!.id);
      push("cmd", `$ context --set ${target}`);
    },
    [env, servicesByEnv, push],
  );

  const selectService = useCallback(
    (s: Service) => {
      if (s.id === selected.id) return;
      setSelectedId(s.id);
      push("cmd", `$ tail -f ${s.name}.log`);
    },
    [selected.id, push],
  );

  const startDeploy = useCallback(() => {
    if (deploy) return;
    const svc = selected;
    const targetEnv = env;
    const nextVersion = bumpPatch(svc.version);
    const start = performance.now();
    let pct = 0;
    let step = 0;

    setDeploy({ serviceName: svc.name, pct: 0 });
    patchService(targetEnv, svc.id, { status: "deploying" });
    push(
      "cmd",
      `$ deploy ${svc.name}@${nextVersion} --env ${targetEnv} --by you`,
    );

    deployTimer.current = setInterval(() => {
      pct = Math.min(100, pct + rand(3, 9));
      setDeploy((d) => (d ? { ...d, pct } : d));
      while (step < DEPLOY_STEPS.length && pct >= DEPLOY_STEPS[step]![0]) {
        push(DEPLOY_STEPS[step]![1], DEPLOY_STEPS[step]![2](svc));
        step++;
      }
      if (pct >= 100) {
        if (deployTimer.current) clearInterval(deployTimer.current);
        deployTimer.current = null;
        patchService(targetEnv, svc.id, {
          status: "live",
          version: nextVersion,
        });
        push(
          "ok",
          `live — ${svc.name} v${nextVersion} · ${((performance.now() - start) / 1000).toFixed(1)}s`,
        );
        setDeployId(newDeployId());
        setDeploy(null);
      }
    }, 300);
  }, [deploy, selected, env, patchService, push]);

  const toggleTail = useCallback(
    (on: boolean) => {
      setLiveTail(on);
      push(
        on ? "cmd" : "warn",
        on
          ? "$ tail -f deploys.log — attached"
          : "tail detached — stream paused",
      );
    },
    [push],
  );

  const restart = useCallback(() => {
    push("cmd", `$ restart ${selected.name}`);
    push("ok", `signal sent · draining ${selected.replicas} replicas`);
  }, [selected, push]);

  const rollback = useCallback(() => {
    const prev = bumpPatch(selected.version, -1);
    patchService(env, selected.id, { version: prev });
    push("warn", `rollback — ${selected.name} pinned to v${prev}`);
  }, [selected, env, patchService, push]);

  const copyId = useCallback(() => {
    void navigator.clipboard?.writeText(selected.id).catch(() => {});
    push("info", `copied ${selected.id} to clipboard`);
  }, [selected.id, push]);

  const setReplicas = useCallback(
    (v: number) => patchService(env, selected.id, { replicas: v }),
    [env, selected.id, patchService],
  );

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <SectionLabel
        cmd="open examples/deploy-console.tsx"
        note="interactive · try a deploy"
      />
      <Trace as="div" intensity={0.9} duration={4800} active={!!deploy}>
        <Card className="overflow-hidden">
          <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5">
            <span className="flex items-center gap-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <i className="size-2 rounded-full bg-border-strong" />
                <i className="size-2 rounded-full bg-border-strong" />
                <i className="size-2 rounded-full bg-border-strong" />
              </span>
              <span className="font-mono text-xs text-foreground-muted">
                ionbit/app · deploys
              </span>
            </span>
            <ToggleGroup
              type="single"
              variant="outline"
              size="sm"
              spacing={0}
              value={env}
              onValueChange={changeEnv}
              aria-label="Environment"
            >
              <ToggleGroupItem value="production" className="font-mono">
                prod
              </ToggleGroupItem>
              <ToggleGroupItem value="staging" className="font-mono">
                staging
              </ToggleGroupItem>
              <ToggleGroupItem value="dev" className="font-mono">
                dev
              </ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>

          <CardContent className="grid p-0 sm:grid-cols-2">
            {/* Memoized: ambient log ticks don't re-render it. */}
            <div className="flex min-w-0 flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <span className={`${TERMINAL_LABEL} text-foreground-muted`}>
                  services
                </span>
                <Badge variant="outline">{services.length}</Badge>
              </div>
              <ServicesTable
                services={services}
                selectedId={selected.id}
                onSelect={selectService}
              />
            </div>

            <div className="flex h-72 min-w-0 flex-col border-t border-border sm:border-t-0 sm:border-l">
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
                <span
                  className={`flex min-w-0 items-center gap-2 ${TERMINAL_LABEL} text-foreground-muted`}
                >
                  <Terminal className="size-3 shrink-0" aria-hidden />
                  <span className="truncate">tail -f · {selected.name}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="w-10 text-right font-mono text-[10px] text-foreground-muted">
                    {liveTail ? "live" : "paused"}
                  </span>
                  <Switch
                    size="sm"
                    checked={liveTail}
                    onCheckedChange={toggleTail}
                    aria-label="Live tail"
                  />
                </span>
              </div>
              <ScrollArea ref={scrollRef} className="min-h-0 flex-1">
                <div className="flex flex-col gap-1 px-4 py-3 font-mono text-[11px] leading-relaxed">
                  {lines.map((l) => (
                    <LogRow key={l.id} line={l} />
                  ))}
                  <span aria-hidden className="animate-pulse text-accent">
                    ▌
                  </span>
                </div>
              </ScrollArea>
              {deploy && (
                <div className="border-t border-border px-4 py-2.5">
                  <Progress
                    value={deploy.pct}
                    aria-label={`Deploying ${deploy.serviceName}`}
                  >
                    <span className="flex items-center justify-between">
                      <ProgressLabel
                        className={`${TERMINAL_LABEL} text-foreground-muted`}
                      >
                        deploying {deploy.serviceName}
                      </ProgressLabel>
                      <ProgressValue className="font-mono text-[10px]" />
                    </span>
                  </Progress>
                </div>
              )}
            </div>
          </CardContent>

          {/* Memoized: skips ambient log ticks entirely. */}
          <ControlStrip
            replicas={selected.replicas}
            deploying={!!deploy}
            serviceName={selected.name}
            onReplicas={setReplicas}
            onDeploy={startDeploy}
            onRestart={restart}
            onRollback={rollback}
            onCopyId={copyId}
          />

          <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2 font-mono text-[10px] tracking-[0.15em] text-foreground-muted uppercase">
            <span className="truncate tabular-nums">
              {deploy
                ? `deploying ${deploy.serviceName} · ${deploy.pct}%`
                : `ready · ${healthy}/${services.length} healthy · ${env}`}
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span
                aria-hidden
                className="tracking-normal text-foreground-subtle"
              >
                {spark}
              </span>
              <Scramble>{deployId}</Scramble>
              <Pulse color={deploy ? undefined : "var(--success)"}>
                <span
                  className={cn(
                    "block size-1.5 rounded-full",
                    deploy ? "bg-accent" : "bg-success",
                  )}
                />
              </Pulse>
            </span>
          </div>
        </Card>
      </Trace>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Memoized subtrees — the ambient tail pushes a log line every ~1.6s   */
/* (and ~300ms during deploys). Without memo, every tick re-renders the */
/* whole console: ToggleGroup, four Tooltip/Badge rows, Slider, and the */
/* DropdownMenu. With stable callbacks these bail out entirely — only   */
/* the new LogRow actually renders.                                     */
/* ------------------------------------------------------------------ */

const ServicesTable = memo(function ServicesTable({
  services,
  selectedId,
  onSelect,
}: {
  services: Service[];
  selectedId: string;
  onSelect: (s: Service) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-4">service</TableHead>
          <TableHead className="w-32">version</TableHead>
          <TableHead className="w-12">repl</TableHead>
          <TableHead className="w-32 pr-4 text-right">status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((s) => (
          <TableRow
            key={s.id}
            tabIndex={0}
            aria-selected={s.id === selectedId}
            data-state={s.id === selectedId ? "selected" : undefined}
            className="cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
            onClick={() => onSelect(s)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(s);
              }
            }}
          >
            <TableCell className="pl-4 font-mono text-xs font-medium text-foreground">
              {s.name}
            </TableCell>
            {/* Scramble re-decodes when the version bumps. */}
            <TableCell className="font-mono text-xs text-foreground-muted">
              <Scramble>v{s.version}</Scramble>
            </TableCell>
            <TableCell className="font-mono text-xs text-foreground-muted tabular-nums">
              ×{s.replicas}
            </TableCell>
            <TableCell className="pr-4 text-right">
              <Tooltip
                content={`${s.region} · uptime ${s.uptime}% · shipped ${s.age} ago`}
                side="left"
              >
                <Badge variant={STATUS_VARIANT[s.status]} className="font-mono">
                  {s.status === "deploying" && <Spinner size="xs" />}
                  {s.status}
                </Badge>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

const ControlStrip = memo(function ControlStrip({
  replicas,
  deploying,
  serviceName,
  onReplicas,
  onDeploy,
  onRestart,
  onRollback,
  onCopyId,
}: {
  replicas: number;
  deploying: boolean;
  serviceName: string;
  onReplicas: (v: number) => void;
  onDeploy: () => void;
  onRestart: () => void;
  onRollback: () => void;
  onCopyId: () => void;
}) {
  return (
    <CardFooter className="flex-wrap justify-between gap-x-4 gap-y-3 border-t border-border px-4 py-3">
      <span className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted uppercase">
          replicas
        </span>
        <Slider
          className="w-24 sm:w-32"
          min={1}
          max={8}
          step={1}
          value={[replicas]}
          onValueChange={([v]) => onReplicas(v ?? 1)}
          aria-label="Replicas"
        />
        <span className="w-6 font-mono text-xs text-foreground-muted tabular-nums">
          ×{replicas}
        </span>
      </span>
      <span className="flex items-center gap-2.5">
        <Glow intensity={0.7}>
          <Button
            variant="outline"
            size="sm"
            disabled={deploying}
            onClick={onDeploy}
          >
            {deploying ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <Rocket data-icon="inline-start" />
            )}
            {deploying ? "deploying…" : "deploy"}
          </Button>
        </Glow>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="secondary"
                size="icon-sm"
                aria-label={`Actions for ${serviceName}`}
              />
            }
          >
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onRestart} disabled={deploying}>
              <RefreshCw />
              Restart Service
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRollback} disabled={deploying}>
              <RotateCcw />
              Rollback Version
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onCopyId}>
              <Copy />
              Copy Service ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </CardFooter>
  );
});

const LogRow = memo(function LogRow({ line }: { line: LogLine }) {
  return (
    <div className="flex gap-2">
      <span className="shrink-0 text-foreground-subtle">{line.ts}</span>
      <span className={LEVEL_CLASS[line.level]}>{line.text}</span>
    </div>
  );
});
