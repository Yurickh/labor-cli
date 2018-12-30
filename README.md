labor-cli
=========

CLI interface for managing your tasks on Labor

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/labor-cli.svg)](https://npmjs.org/package/labor-cli)
[![CircleCI](https://circleci.com/gh/Yurickh/labor-cli/tree/master.svg?style=shield)](https://circleci.com/gh/Yurickh/labor-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/labor-cli.svg)](https://npmjs.org/package/labor-cli)
[![License](https://img.shields.io/npm/l/labor-cli.svg)](https://github.com/Yurickh/labor-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
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
# Commands
<!-- commands -->
* [`labor hello [FILE]`](#labor-hello-file)
* [`labor help [COMMAND]`](#labor-help-command)
* [`labor login [FILE]`](#labor-login-file)

## `labor hello [FILE]`

describe the command here

```
USAGE
  $ labor hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
  -v, --version    show CLI version

EXAMPLE
  $ labor hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Yurickh/labor-cli/blob/v0.0.0/src/commands/hello.ts)_

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

## `labor login [FILE]`

describe the command here

```
USAGE
  $ labor login [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/login.ts](https://github.com/Yurickh/labor-cli/blob/v0.0.0/src/commands/login.ts)_
<!-- commandsstop -->
