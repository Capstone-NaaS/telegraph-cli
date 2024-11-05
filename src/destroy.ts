import shell from "shelljs";
import path from "path";
import ora from "ora";
import CONSTANTS from "../lib/constants.js";

const cdkRepoPath = path.join(process.cwd(), CONSTANTS.APP_NAME);

export const destroy = async (): Promise<void> => {
  const spinner = ora();
  console.log("Starting resource destruction...");

  spinner.start("Destroying the Telegraph AWS resources...");
  shell.cd(cdkRepoPath);

  try {
    await new Promise((resolve, reject) => {
      shell.exec(
        `${CONSTANTS.COMMANDS.DESTROY}`,
        { silent: true, async: true },
        (code, stdout, stderr) => {
          if (code !== 0) {
            reject(new Error(`Git clone failed: ${stderr}`));
          } else {
            resolve(stdout);
          }
        }
      );
    });
    spinner.succeed("Resources destroyed successfully.");
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(error.message);
    } else {
      spinner.fail("Error: CDK destroy failed.");
    }
    return;
  }
};
