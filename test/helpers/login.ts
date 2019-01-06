import Config from '../../src/config'

export default function login() {
  Config.set({
    auth: {
      uid: 'fake@email.com',
      client: 'fake',
      'token-type': 'Bearer',
      'access-token': 'access-token',
    },
  })
}
