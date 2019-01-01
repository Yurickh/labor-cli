import fetch from 'node-fetch'

export const root = 'https://api.getlabor.com.br'

function stripLeadingSlash(uri: string) {
  if (uri.startsWith('/')) return uri.slice(1)
  return uri
}

export default function baseAPI(uri: string) {
  return {
    post: (data: object) => {
      return fetch(`${root}/${stripLeadingSlash(uri)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Accept: 'application/json, text/plain, */*',
          'accept-encoding': 'deflate, br',
          'x-key-inflection': 'camel',
        },
        body: JSON.stringify(data),
      })
    },
  }
}
