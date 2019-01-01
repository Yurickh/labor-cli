import * as inquirer from 'inquirer'
import {SinonSandbox} from 'sinon'

function mockResponse(question: inquirer.Question<{}>) {
  switch (question.type) {
    case 'list':
      if (Array.isArray(question.choices)) {
        const [choice] = question.choices

        if (choice) {
          return choice.value
        }

        return choice
      }

      return question
    case 'input':
      return 'yurick@email.com'
    case 'password':
      return 'saf3pa5s'
  }
}

export default function mockInquirer(sandbox: SinonSandbox) {
  sandbox.stub(inquirer, 'prompt').callsFake(async options => {
    if (Array.isArray(options)) {
      return options.reduce(
        (obj, cur) => ({
          ...obj,
          [cur.name]: mockResponse(cur),
        }),
        {},
      )
    }
    return options
  })
}
