export default {
  COMMANDS: {
    DEPLOY:
      'cdk deploy "prod/*" --json --outputs-file ./cdk-output.json --require-approval never',
    DESTROY: `cdk destroy "prod/*" --force`,
    BOOTSTRAP: "cdk bootstrap",
  },
  REPO: "https://github.com/telegraph-notify/telegraph-cdk.git",
  APP_NAME: "telegraph-cdk",
  CDK_OUTPUT_FILE: "cdk-output.json",
  APP_DEPENDENCIES: ["aws", "cdk", "git"],
  NPM_I: "npm install",
  ENV_FILE: ".env",
};
