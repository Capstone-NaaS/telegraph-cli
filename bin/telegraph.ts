#!/usr/bin/env node

import { program } from "commander";
import { init, deploy } from "../src/main.js";

program
  .command("init")
  .description("Initialize Telegraph for deployment")
  .action(init);

program.command("deploy").description("Deploy Telegraph to AWS").action(deploy);

program.parse(process.argv);
