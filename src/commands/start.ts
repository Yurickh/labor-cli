import { Command, flags } from '@oclif/command'
import Config from '../config'

export default class Start extends Command {
  static description = 'Start a new task'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run() {
    const config = Config.get()

    if (config === null) {
      this.log('🚨  You need to be logged in order to execute this action.')
      this.exit(1)
    }
  }
}
