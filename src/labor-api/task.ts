import baseAPI from '../common/base-api'
import { Task } from '../types/common'

import refreshAuthTokens from '../start/refresh-auth-tokens'

export async function start(
  task?: Task,
  options: { skipRetry?: boolean } = {},
): Promise<Task> {
  try {
    const result = await baseAPI<Task>('tasks').post(task)

    if (result.success !== undefined) {
      throw new Error(result.errors[0])
    }

    return result
  } catch (exception) {
    if (exception.reauth && !options.skipRetry) {
      await refreshAuthTokens()
      return start(task, { skipRetry: true })
    }

    throw exception
  }
}

export default {
  start,
}
