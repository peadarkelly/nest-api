import { User } from 'src/data-models/user.model'

export function generateUser(email = 'user@mail.com'): User {
  return {
    email: email,
    first_name: 'Test',
    last_name: 'User'
  }
}
