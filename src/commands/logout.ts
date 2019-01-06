import { Command, flags } from '@oclif/command'
import Config from '../config'

export default class Logout extends Command {
  static description = 'Forgets your credentials'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run() {
    try {
      const removed = Config.remove()
      if (removed) {
        this.log('🗑  Removed credentials from memory.')
      } else {
        this.log('💩  In order to logout, you need to login first.')
      }
    } catch (exception) {
      this.exit(1)
    }
  }
}
