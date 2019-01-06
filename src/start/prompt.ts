import * as inquirer from 'inquirer'

import { Project, Task } from '../types/common'

export function task(projects: Project[]): Promise<Task> {
  return inquirer.prompt([
    {
      name: 'project_id',
      message: 'Which project are you running?',
      type: 'list',
      choices: [
        ...projects.map((project: Project) => ({
          name: project.name,
          value: project.id,
        })),
        {
          name: 'No project',
          value: null,
        },
      ],
    },
    {
      name: 'description',
      message: 'What are you working on?',
      type: 'string',
    },
  ])
}

export default {
  task,
}
