import { Command } from '@oclif/command'

import Config from '../config'

export default class Start extends Command {
  async run() {
    const config = Config.get()

    if (config === null) {
      this.log('🚨  You need to be logged in order to execute this action.')
      this.exit(1)
    }
  }
}
