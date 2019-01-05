import baseAPI from './base-api'
import { Project } from './types/common'

export async function all(): Promise<Project[]> {
  const response = await baseAPI('/projects').get()
  const result = await response.json()

  if (result.errors) {
    throw new Error(result.errors[0])
  }

  return result
}

export default {
  all,
}
