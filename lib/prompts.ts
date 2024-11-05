import inquirer from "inquirer";

export const askForSecretKey = async (): Promise<string> => {
  const { secretKey } = await inquirer.prompt<{ secretKey: string }>({
    type: "input",
    name: "secretKey",
    message: "Enter a secret key (or leave blank to generate one):",
  });
  return secretKey || "";
};
