import { knex } from 'test/integration/helpers/knex.helper'
import { User } from 'src/data-models/user.model'

export function insertUser(...users: User[]): Promise<number[]> {
  return knex('user').insert(users, 'id')
}

export function getUser(email: string): Promise<User> {
  return knex('user').where('email', email).first()
}

export function deleteUser(...emails: string[]): Promise<void> {
  return knex('user').whereIn('email', emails).del()
}
