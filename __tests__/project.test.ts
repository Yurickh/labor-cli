import * as nock from 'nock'

import Project from '../src/project'

describe('Project', () => {
  const projects = [
    {
      id: 1,
      name: 'My fake project',
    },
  ]

  beforeEach(() => {
    nock('https://api.getlabor.com.br')
      .get('/projects?')
      .reply(200, projects)
  })

  it('returns all projects from remote', async () => {
    expect(await Project.all()).toEqual(projects)
  })
})
