import { LoginCredentials } from '../src/types/login'

const keychain: LoginCredentials[] = []

export async function findCredentials(): Promise<LoginCredentials[]> {
  return keychain
}

export async function setPassword(
  _domain: string,
  account: string,
  password: string,
): Promise<void> {
  keychain.push({ account, password })
}
