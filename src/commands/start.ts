import { Command, flags } from '@oclif/command'
import Config from '../config'

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
  }

  async run() {
    const config = Config.get()

    if (config === null) {
      this.log('🚨  You need to be logged in order to execute this action.')
      this.exit(1)
    }
  }
}
