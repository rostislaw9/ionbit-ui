import { Command } from "commander";

import { add } from "./commands/add";
import { init } from "./commands/init";
import { list } from "./commands/list";

const program = new Command();

program
  .name("ionbit-ui")
  .description(
    "Ionbit UI CLI — install source-owned components from the Ionbit UI registry.",
  )
  .version("0.1.13");

program
  .command("init")
  .description(
    "Initialize Ionbit UI in your project. Creates a ionbit-ui.config.json and installs design tokens.",
  )
  .option("-y, --yes", "Skip confirmation prompts and use defaults")
  .option("-f, --force", "Force overwrite of existing configuration")
  .option(
    "--pointer",
    "Add cursor: pointer CSS for buttons (Tailwind v4 defaults to cursor: default)",
  )
  .action(init);

program
  .command("add <components...>")
  .description(
    "Add components to your project. e.g. ionbit-ui add button card accordion",
  )
  .option("-o, --overwrite", "Overwrite existing files")
  .action(add);

program
  .command("list")
  .description("List all available components in the registry.")
  .action(list);

program.parse();
