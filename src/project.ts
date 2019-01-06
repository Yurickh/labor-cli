import baseAPI from './common/base-api'
import { Project } from './types/common'

export async function all(): Promise<Project[]> {
  const result = await baseAPI('/projects').get()

  if (result.errors) {
    throw new Error(result.errors[0])
  }

  return result
}

export default {
  all,
}
