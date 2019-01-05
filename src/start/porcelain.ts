import * as Listr from 'listr'

import Config, { ConfigType } from '../config'
import Project from '../project'

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
  ]).run()
}

export default async function porcelain(log: typeof console.log) {
  let config = Config.get()

  if (config === null || !config.auth) {
    log('🚨  You need to be logged in order to execute this action.')
    throw new Error()
  }

  await fetchProjects(config)
  config = Config.get()

  // ....
}
