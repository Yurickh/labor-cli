# labor-cli

CLI interface for managing your tasks on Labor

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/labor-cli.svg)](https://npmjs.org/package/labor-cli)
[![CircleCI](https://circleci.com/gh/Yurickh/labor-cli/tree/master.svg?style=shield)](https://circleci.com/gh/Yurickh/labor-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/labor-cli.svg)](https://npmjs.org/package/labor-cli)
[![License](https://img.shields.io/npm/l/labor-cli.svg)](https://github.com/Yurickh/labor-cli/blob/master/package.json)

<!-- toc -->
* [labor-cli](#labor-cli)
<!-- tocstop -->

## Usage

<!-- usage -->
```sh-session
$ npm install -g labor-cli
$ labor COMMAND
running command...
$ labor (-v|--version|version)
labor-cli/0.0.0 darwin-x64 node-v10.13.0
$ labor --help [COMMAND]
USAGE
  $ labor COMMAND
...
```
<!-- usagestop -->

## Commands

<!-- commands -->
* [`labor help [COMMAND]`](#labor-help-command)
* [`labor login`](#labor-login)
* [`labor logout`](#labor-logout)
* [`labor start`](#labor-start)

## `labor help [COMMAND]`

display help for labor

```
USAGE
  $ labor help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `labor login`

Enter your credentials to start using Labor.

```
USAGE
  $ labor login

OPTIONS
  -a, --account=account    Optional email. Pass only if you need to call this command programatically.
  -h, --help               show CLI help
  -p, --password=password  Optional password. Pass only if you need to call this command programatically.
```

_See code: [src/commands/login.ts](https://github.com/Yurickh/labor-cli/blob/v0.0.0/src/commands/login.ts)_

## `labor logout`

Forgets your credentials

```
USAGE
  $ labor logout

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/logout.ts](https://github.com/Yurickh/labor-cli/blob/v0.0.0/src/commands/logout.ts)_

## `labor start`

Start a new task

```
USAGE
  $ labor start

OPTIONS
  -h, --help         show CLI help
  --name=name        Optional name of the task. If not provided, this command will start a blank task.

  --project=project  Optional project of the task. Must match one of the projects configured for your institution. If
                     not provided, this command will start a task without project.

  --time=time        Optional start date. Must be in the past and represent a RFC2822 date. Default is now.
```

_See code: [src/commands/start.ts](https://github.com/Yurickh/labor-cli/blob/v0.0.0/src/commands/start.ts)_
<!-- commandsstop -->
