import fs from "fs";
import crypto from "crypto";

export const generateSecretKey = (): string =>
  crypto.randomBytes(16).toString("hex");

export const saveSecretKey = (key: string, filePath: string): void => {
  fs.appendFileSync(filePath, `SECRET_KEY=${key}\n`, "utf-8");
};

export const saveEmail = (email: string, filePath: string): void => {
  fs.writeFileSync(filePath, `SENDER_EMAIL=${email}\n`, "utf-8");
};
