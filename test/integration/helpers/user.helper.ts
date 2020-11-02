import { User } from 'src/data-models/user.model'

export function insertUser(...users: User[]): Promise<number[]> {
  console.log(users)
  return Promise.resolve(<number[]>[])
}

export function getUser(email: string): Promise<User> {
  console.log(email)
  return Promise.resolve(<User> undefined)
}

export function deleteUser(...emails: string[]): Promise<void> {
  console.log(emails)
  return Promise.resolve()
}
