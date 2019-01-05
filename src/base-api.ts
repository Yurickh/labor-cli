import fetch from 'node-fetch'
import Config from './config'

export const root = 'https://api.getlabor.com.br'

function stripLeadingSlash(uri: string) {
  if (uri.startsWith('/')) return uri.slice(1)
  return uri
}

function toDataURL(data: object) {
  return Object.entries(data || {})
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
    .join('&')
}

export default function baseAPI(uri: string) {
  const config = Config.get()
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json, text/plain, */*',
    'accept-encoding': 'deflate, br',
    'x-key-inflection': 'camel',
    ...(config && config.auth),
  }

  return {
    get: (data?: object) =>
      fetch(`${root}/${stripLeadingSlash(uri)}?${toDataURL(data || {})}`, {
        headers,
      }),
    post: (data?: object) =>
      fetch(`${root}/${stripLeadingSlash(uri)}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data || {}),
      }),
  }
}
