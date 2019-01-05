import { Command, flags } from '@oclif/command'

import orchestratePorcelain from '../login/porcelain'
import orchestratePumbler from '../login/pumbler'

export default class Login extends Command {
  static description = 'Enter your credentials to start using Labor.'

  static flags = {
    help: flags.help({ char: 'h' }),
    account: flags.string({
      char: 'a',
      dependsOn: ['password'],
      description:
        'Optional email. Pass only if you need to call this command programatically.',
    }),
    password: flags.string({
      char: 'p',
      dependsOn: ['account'],
      description:
        'Optional password. Pass only if you need to call this command programatically.',
    }),
  }

  async run() {
    try {
      const { flags } = this.parse(Login)
      const { account, password } = flags

      if (account && password) {
        await orchestratePumbler(this.log, { account, password })
      } else {
        await orchestratePorcelain(this.log)
      }
    } catch (exception) {
      // Uncomment next line to have meaningful errors for debugging, but don't leave it uncommented
      // this.error(exception)
      this.exit(1)
    }
  }
}
