import fs from "fs";
import crypto from "crypto";

export const generateSecretKey = (): string =>
  crypto.randomBytes(16).toString("hex");

export const saveSecretKey = (key: string, filePath: string): void => {
  fs.writeFileSync(filePath, key, "utf-8");
};
