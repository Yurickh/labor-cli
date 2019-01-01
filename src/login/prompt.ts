import * as inquirer from 'inquirer'
import { validate } from 'isemail'

import { LoginCredentials } from './types'

export function user(
  credentials: Array<LoginCredentials>,
): Promise<{ chosen: LoginCredentials | null }> {
  return inquirer.prompt([
    {
      name: 'chosen',
      message: 'Which account do you want to use to login with getlabor.com?',
      type: 'list',
      choices: [
        ...credentials.map(credential => ({
          name: credential.account,
          value: credential,
        })),
        {
          name: 'Login with another account',
          value: null,
        },
      ],
    },
  ])
}

export function credentials(): Promise<LoginCredentials> {
  return inquirer.prompt([
    {
      name: 'account',
      message: 'Email:',
      type: 'input',
      validate: account => validate(account) || 'Please provide a valid email',
    },
    {
      name: 'password',
      message: 'Password:',
      type: 'password',
    },
  ])
}
