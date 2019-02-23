import { Question } from 'inquirer'

function mockResponse(question: Question): Question | string {
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

  return question
}

export async function prompt(
  options: Question[],
): Promise<Question | Question[]> {
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
}
