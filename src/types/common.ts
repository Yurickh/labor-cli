interface Team {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
  email: string
  allocations: { id: number; team: Team }[]
}

export interface Project {
  id: number
  name: string
  description: string | null
  statis: 'running'
  category:
    | 'internal'
    | 'external'
    | 'management' /* management is deprecated, but still present */
}

export interface Task {
  id?: number
  description: string | null
  start: string | null
  end: string | null
  duration: number | null

  project_id?: number | null
}
