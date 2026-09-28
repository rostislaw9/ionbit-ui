import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

// npm package specifiers: an optional @scope/, a name, and an optional
// @version/tag/range. Rejects flag-looking values so registry-supplied
// strings can't inject arguments into the package-manager call.
const DEP_SPEC =
  /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(@[^\s]+)?$/;

export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(resolve(cwd, "bun.lockb"))) return "bun";
  if (existsSync(resolve(cwd, "bun.lock"))) return "bun";
  if (existsSync(resolve(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(resolve(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

export function installNpmDeps(deps: string[], cwd: string): void {
  const invalid = deps.filter((d) => !DEP_SPEC.test(d));
  if (invalid.length > 0) {
    throw new Error(
      `Refusing to install invalid dependency specifiers: ${invalid.join(", ")}`,
    );
  }
  if (deps.length === 0) return;

  const pm = detectPackageManager(cwd);
  const subcommand = pm === "npm" ? "install" : "add";
  // argv array, no shell — dep strings are never re-parsed as a command.
  const res = spawnSync(pm, [subcommand, ...deps], {
    cwd,
    stdio: "inherit",
  });
  if (res.error) throw res.error;
  if (res.status !== 0) {
    throw new Error(`${pm} ${subcommand} failed with exit code ${res.status}`);
  }
}
