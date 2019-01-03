# labor-cli

CLI interface for managing your tasks on Labor

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/labor-cli.svg)](https://npmjs.org/package/labor-cli)
[![CircleCI](https://circleci.com/gh/Yurickh/labor-cli/tree/master.svg?style=shield)](https://circleci.com/gh/Yurickh/labor-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/labor-cli.svg)](https://npmjs.org/package/labor-cli)
[![License](https://img.shields.io/npm/l/labor-cli.svg)](https://github.com/Yurickh/labor-cli/blob/master/package.json)

<!-- toc -->

- [labor-cli](#labor-cli)
- [Usage](#usage)
- [Commands](#commands)
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

- [`labor help [COMMAND]`](#labor-help-command)
- [`labor login`](#labor-login)
- [`labor re`](#labor-re)
- [`labor start [FILE]`](#labor-start-file)

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
  -a, --account=account
  -h, --help               show CLI help
  -p, --password=password
```

_See code: [src/commands/login.ts](https://github.com/Yurickh/labor-cli/blob/v0.0.0/src/commands/login.ts)_

## `labor re`

```
USAGE
  $ labor re
```

_See code: [src/commands/re.ts](https://github.com/Yurickh/labor-cli/blob/v0.0.0/src/commands/re.ts)_

## `labor start [FILE]`

describe the command here

```
USAGE
  $ labor start [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/start.ts](https://github.com/Yurickh/labor-cli/blob/v0.0.0/src/commands/start.ts)_

<!-- commandsstop -->
