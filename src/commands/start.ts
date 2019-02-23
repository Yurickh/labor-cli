import { Command, flags } from '@oclif/command'

import orchestratePorcelain from '../start/porcelain'

export default class Start extends Command {
  static description = 'Start a new task'

  static flags = {
    help: flags.help({ char: 'h' }),
    name: flags.string({
      description:
        'Optional name of the task. If not provided, this command will start a blank task.',
    }),
    project: flags.string({
      description:
        'Optional project of the task. Must match one of the projects configured for your institution. If not provided, this command will start a task without project.',
    }),
    time: flags.string({
      description:
        'Optional start date. Must be in the past and represent a RFC2822 date. Default is now.',
    }),
    default: flags.boolean({
      char: 'y',
      description: 'Use default answers to all fields.',
    }),
  }

  async run(): Promise<void> {
    const { flags } = this.parse(Start)
    try {
      await orchestratePorcelain(this.log, flags.default)
    } catch (exception) {
      // Uncomment next line to have meaningful errors for debugging, but don't leave it uncommented
      // this.error(exception)
      this.exit(1)
    }
  }
}
