import * as Listr from 'listr'

import Config, { ConfigType } from '../config'
import Project from '../project'

import Task from '../labor-api/task'
import prompt from './prompt'

function fetchProjects(config: ConfigType) {
  return new Listr([
    {
      title: 'Fetching projects...',
      task: async () => {
        const projects = await Project.all()
        Config.set({ projects })
      },
      enabled: () => !config || !config.projects,
    },
  ])
    .run()
    .then(() => {
      const config = Config.get()
      return config && config.projects
    })
}

export default async function porcelain(
  log: typeof console.log,
  skipQuestions: boolean,
) {
  let config = Config.get()

  if (config === null || !config.auth) {
    log('🚨  You need to be logged in order to execute this action.')
    throw new Error()
  }

  if (!skipQuestions) {
    const projects = await fetchProjects(config)
    const task = await prompt.task(projects || [])
    await Task.start({
      start: null,
      end: null,
      duration: null,
      description: '',
      ...task,
    })
  } else {
    await Task.start()
  }
  log('✨  Your task just started')
}
