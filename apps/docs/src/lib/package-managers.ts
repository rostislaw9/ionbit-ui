/**
 * Shared package-manager constants.
 *
 * Imported by both the Vite Shiki plugin (build-time, Node) and
 * client-side React components. Contains no browser-only or Node-only
 * dependencies so it is safe in both contexts.
 */

/** Package manager IDs and CLI prefixes for `npx`-style commands. */
export const PACKAGE_MANAGERS = [
  { id: "pnpm", prefix: "pnpm dlx" },
  { id: "npm", prefix: "npx" },
  { id: "yarn", prefix: "yarn dlx" },
  { id: "bun", prefix: "bunx --bun" },
] as const;

/** Package manager `add`/`install` command prefixes (no package name). */
export const PM_INSTALL_PREFIX: Record<string, string> = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
};

/** Full `add`/`install` commands for a given package. */
export function pmInstallCmd(pkg: string): Record<string, string> {
  return Object.fromEntries(
    PACKAGE_MANAGERS.map((pm) => [pm.id, `${PM_INSTALL_PREFIX[pm.id]} ${pkg}`]),
  );
}

/** The CLI package, with version pin — e.g. `ionbit-ui@latest`. */
export const CLI_PACKAGE = "ionbit-ui@latest";

/** The `dlx`-style runner for a package manager id (`pnpm dlx`, `npx`…). */
export function pmDlx(pmId: string): string {
  return PACKAGE_MANAGERS.find((pm) => pm.id === pmId)?.prefix ?? "npx";
}

/** Full CLI invocation for a package manager — `npx ionbit-ui@latest <args>`. */
export function cliCmd(pmId: string, args: string): string {
  return `${pmDlx(pmId)} ${CLI_PACKAGE} ${args}`;
}
