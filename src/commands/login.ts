import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import {validate} from 'isemail'
import * as Listr from 'listr'

import baseAPI from '../base-api'

export default class Login extends Command {
  static description = 'Enter your credentials to start using Labor.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const responses = await inquirer.prompt([
      {
        name: 'email',
        message: 'Email:',
        type: 'input',
        validate: email => validate(email) || 'Please provide a valid email',
      },
      {
        name: 'password',
        message: 'Password:',
        type: 'password',
      },
    ])

    const tasks = new Listr([
      {
        title: 'Authenticating',
        task: async ctx => {
          const result = await baseAPI('auth/sign_in').post(responses)

          if (result.success) {
            ctx.result = result
            return result
          } else {
            const [error] = result.errors
            ctx.error = error
            return Promise.reject(new Error(error))
          }
        },
      },
    ])

    try {
      await tasks.run()
    } catch (_exception) {
      this.exit(1)
    }
  }
}
