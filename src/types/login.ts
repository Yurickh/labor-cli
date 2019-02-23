export interface LoginCredentials {
  account: string
  password: string
}

export interface AuthCredentials {
  'token-type': string
  'access-token': string
  client: string
  uid: string
}
