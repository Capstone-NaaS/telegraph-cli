import fs from "fs";
import path from "path";
import shell from "shelljs";
import ora from "ora";
import boxen from "boxen";
import chalk from "chalk";
import CONSTANTS from "../lib/constants.js";

const secretKeyPath = path.join(process.cwd(), CONSTANTS.SECRET_KEY_FILE);
const cdkRepoPath = path.join(process.cwd(), CONSTANTS.APP_NAME);

export const deploy = async (): Promise<void> => {
  const spinner = ora();

  console.log("Starting deployment...");

  let secretKey = "";
  try {
    secretKey = fs.readFileSync(secretKeyPath, "utf-8").trim();
  } catch (error) {
    spinner.fail(
      "Failed to read secret key. Have you initialized the project?"
    );
    return;
  }

  // Clone the CDK project repository
  spinner.start("Cloning the telegraph-cdk repository...");

  try {
    await new Promise((resolve, reject) => {
      shell.exec(
        `git clone ${CONSTANTS.REPO} ${cdkRepoPath}`,
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
    spinner.succeed("Repository cloned successfully.");
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(error.message);
    } else {
      spinner.fail("Git clone failed.");
    }
    return;
  }

  shell.cd(`${CONSTANTS.APP_NAME}`);

  // Install dependencies
  spinner.start("Installing dependencies...");

  try {
    await new Promise((resolve, reject) => {
      shell.exec(
        `${CONSTANTS.NPM_I}`,
        { silent: true, async: true },
        (code, stdout, stderr) => {
          if (code !== 0) {
            reject(
              new Error(`Error: Dependency installation failed. ${stderr}`)
            );
          } else {
            resolve(stdout);
          }
        }
      );
    });
    spinner.succeed("Dependencies installed.");
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(error.message);
    } else {
      spinner.fail("Dependency installation failed.");
    }
    return;
  }

  // Bootstrap CDK
  spinner.start("Bootstrapping CDK resources...");

  try {
    await new Promise((resolve, reject) => {
      shell.exec(
        `${CONSTANTS.COMMANDS.BOOTSTRAP}`,
        { silent: true, async: true },
        (code, stdout, stderr) => {
          if (code !== 0) {
            reject(new Error(`Error: Bootstrapping failed. ${stderr}`));
          } else {
            resolve(stdout);
          }
        }
      );
    });
    spinner.succeed("Bootstrapping completed.");
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(error.message);
    } else {
      spinner.fail("Bootstrapping failed.");
    }
    return;
  }

  // Deploy the CDK application
  spinner.start(
    "Deploying the Telegraph AWS resources... This could take up to ten minutes."
  );
  try {
    shell.env["SECRET_KEY"] = secretKey;
    shell.cd(cdkRepoPath);

    const deployResult = await new Promise<string>((resolve, reject) => {
      shell.exec(
        `${CONSTANTS.COMMANDS.DEPLOY}`,
        { silent: true, async: true },
        (code, stdout, stderr) => {
          if (code !== 0) {
            reject(new Error(`CDK deployment failed: ${stderr}`));
          } else {
            resolve(stdout);
          }
        }
      );
    });

    spinner.succeed("AWS deployment complete!");
    handleDeploymentOutput(deployResult);
  } catch (error) {
    spinner.fail((error as Error).message);
    return;
  } finally {
    spinner.text = "Cleaning up...";
    await cleanup();
  }
};

async function cleanup() {
  const spinner = ora("Cleaning up...").start();
  try {
    fs.unlinkSync(secretKeyPath);
    delete shell.env["SECRET_KEY"];
    spinner.succeed("Clean up complete.");
  } catch (err) {
    spinner.warn(
      "Failed to delete .secret-key.txt or unset environment variable. Please delete/unset them manually."
    );
  }
}

function handleDeploymentOutput(output: string) {
  const outputData = fs.readFileSync(`./${CONSTANTS.CDK_OUTPUT_FILE}`, "utf8");
  const outputs = JSON.parse(outputData);

  const httpApiUrl =
    outputs["dev-kwang-WebSocketGWStack-dev-kwang"]["wssEndpointdevkwang"];
  const websocketApiUrl =
    outputs["dev-kwang-HttpGWStack-dev-kwang"]["HttpApiInvokeUrldevkwang"];
  console.log(
    boxen(
      `Your secret key: ${chalk.yellow(
        shell.env["SECRET_KEY"]
      )}\nHTTP API URL: ${chalk.yellow(
        httpApiUrl
      )}\nWebSocket API URL: ${chalk.yellow(websocketApiUrl)}`,
      {
        padding: 1,
        margin: 1,
        borderColor: "green",
        borderStyle: "round",
      }
    )
  );
}
