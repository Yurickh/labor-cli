export type LoginCredentials = { account: string; password: string }

export type AuthCredentials = {
  'token-type': string;
  'access-token': string;
  client: string;
  uid: string;
}
