import Config, { ConfigType } from '../src/config'

export default async function login(): Promise<ConfigType | null> {
  return Config.set({
    auth: {
      uid: 'fake@email.com',
      client: 'fake',
      'token-type': 'Bearer',
      'access-token': 'access-token',
    },
  })
}
