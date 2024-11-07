# Telegraph

## Table of Contents

- [In Testing](#in-testing)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Deploying to AWS](#deploying-to-aws)
- [Tearing Down](#tearing-down)

## In testing

To run directly from the repository, run the following commands:

| Command                  | Function |
| ------------------------ | -------- |
| `npm run dev -- init`    | Init     |
| `npm run dev -- deploy`  | Deploy   |
| `npm run dev -- destroy` | Destroy  |

## Installation

## Getting Started

To complete initialization successfully, the user must have aws-cli, aws-cdk and git-cli installed. The installation status of these applications can be verified by running the following commands and getting back a file path.

```sh
$ which aws
$ which cdk
$ which git
```

An AWS account must have been created, along with an AWS IAM role with `AdministratorAccess` permissions. The access key and secret access key must have also been created.

The AWS CLI must be configured by running the `aws configure` command. The account and region must be specified.

To initialize Telegraph and ensure your environment is ready for deployment, run:

```sh
$ telegraph init
```

## Deploying to AWS

Telegraph is ready to be deployed to AWS after a successful initialization.

```
$ telegraph deploy
```

**Note:** The deployment of Telegraph can take about 10 minutes.

## Tearing down Telegraph

To delete Telegraph from AWS, run:

```
$ telegraph destroy
```

**Note:** The removal of Telegraph can take about 10 minutes.
