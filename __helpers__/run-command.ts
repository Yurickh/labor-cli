import * as fs from 'fs'
import * as path from 'path'

import { Command } from '@oclif/command'

const commandDir = path.join(__dirname, '../src/commands')

const filenames = fs.readdirSync(commandDir)
const commands: Record<string, Command> = {}

const removeExtension = (name: string): string =>
  name.slice(0, name.indexOf('.'))

filenames.forEach(filename => {
  commands[removeExtension(filename)] = require(path.join(
    commandDir,
    filename,
  )).default
})

export default async function runCommand(
  line: string[],
): Promise<{ code: 0 | 1; error?: string }> {
  try {
    const [command, ...tags] = line
    await commands[command].run(tags)

    return {
      code: 0,
    }
  } catch (exception) {
    return {
      code: 1,
      error: exception,
    }
  }
}
