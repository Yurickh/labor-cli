import * as inquirer from 'inquirer'

import { Project } from '../types/common'

export async function project(projects: Project[]): Promise<number | null> {
  const chosen: { project: number | null } = await inquirer.prompt([
    {
      name: 'project',
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
  ])

  return chosen.project
}

export default {
  project,
}
