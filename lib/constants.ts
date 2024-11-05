export default {
  COMMANDS: {
    DEPLOY:
      'cdk deploy "prod/*" --json --outputs-file ./cdk-output.json --require-approval never',
    DESTROY: `cdk destroy "prod/*" --force`,
  },
  REPO: "https://github.com/Capstone-NaaS/naas-cdk.git",
  APP_NAME: "telegraph-cdk",
  CDK_OUTPUT_FILE: "cdk-output.json",
  APP_DEPENDENCIES: ["aws", "cdk", "git"],
  NPM_I: "npm install",
  SECRET_KEY_FILE: ".secret-key.txt",
};
