#!/usr/bin/env node

import { program } from "commander";
import { init } from "../src/main.js";

program
  .command("init")
  .description("Initialize Telegraph for deployment")
  .action(init);

program.parse(process.argv);
