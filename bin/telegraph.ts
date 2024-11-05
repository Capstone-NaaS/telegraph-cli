#!/usr/bin/env node

import { program } from "commander";
import { init, deploy, destroy } from "../src/main.js";

program
  .command("init")
  .description("Initialize Telegraph for deployment")
  .action(init);

program.command("deploy").description("Deploy Telegraph to AWS").action(deploy);

program
  .command("destroy")
  .description("Delete Telegraph resources from AWS")
  .action(destroy);

program.parse(process.argv);
