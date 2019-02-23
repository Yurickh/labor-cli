import baseAPI from './common/base-api'
import { Project } from './types/common'

export async function all(): Promise<Project[]> {
  const result = await baseAPI<Project[]>('/projects').get()

  if (result.success === false) {
    throw new Error(result.errors[0])
  }

  return result
}

export default {
  all,
}
