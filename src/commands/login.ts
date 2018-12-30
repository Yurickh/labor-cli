import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import {validate} from 'isemail'

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

    const result = await baseAPI('auth/sign_in').post(responses)
    if (result.success) {
      this.log(result)
    } else {
      this.error(result.errors[0])
    }
  }
}
