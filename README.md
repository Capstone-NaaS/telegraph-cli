# Telegraph CLI

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Deploying to AWS](#deploying-to-aws)
- [Tearing Down](#tearing-down)
- [Changing the secret key](#changing-the-secret-key)
- [Changing the dashboard API key](#changing-the-dashboard-api-key)

## Installation

Run the following command to install Telegraph CLI.

```bash
$ npm install -g @telegraph-notify/telegraph-cli
```

## Getting Started

You must have `aws-cli`, `aws-cdk`, and `git-cli` installed to begin the initialization process. The installation status of these applications can be verified by running the following commands and getting back a file path.

```bash
$ which aws
$ which cdk
$ which git
```

An AWS account must have been created, along with an AWS IAM role with `AdministratorAccess` permissions. The access key and secret access key must have also been created on the Security Credentials page.

The AWS CLI must be configured by running the `aws configure` command. The account and region must be specified using the access keys created in the previous step.

Secret keys to be used in conjunction with the SDKs will be displayed after
deployment in addition to URLs to the API gateways. Please save these as they
are necessary to integrate Telegraph services.

To initialize Telegraph and ensure your environment is ready for deployment, run:

```bash
$ telegraph init
```

You will be prompted to enter an email address to be used as the sender's email for email notification, the application's secret key, and the API key for the dashboard. The secret key and API key can be left blank to automatically generate them.

## Deploying to AWS

Telegraph is ready to be deployed to AWS after a successful initialization.

```bash
$ telegraph deploy
```

**Note:** The deployment of Telegraph can take about 10 minutes.

## Tearing down Telegraph

To delete Telegraph from AWS, run:

```bash
$ telegraph destroy
```

**Note:** The removal of Telegraph can take about 10 minutes.

## Changing the Secret Key

To change the secret key on AWS, run:

```bash
$ telegraph secretkey
```

## Changing the Dashboard API Key

To change the dashboard API key on AWS, run:

```bash
$ telegraph apikey
```
