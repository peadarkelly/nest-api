import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { describe, before, it } from 'mocha'
import { assert } from 'chai'
import { StatusCodes } from 'http-status-codes'
import { UserModule } from 'src/modules/user.module'
import { insertUser, deleteUser } from '../helpers/user.helper'
import { generateUser } from 'test/fixtures/user.fixtures'
import { UserResponse } from 'src/dtos/userResponse.dto'

describe('GET /users', () => {
  let app: INestApplication

  const EMAIL_1 = 'user1@mail.com'
  const EMAIL_2 = 'user2@mail.com'

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    await insertUser(generateUser(EMAIL_1), generateUser(EMAIL_2))
  })

  it('should return all users with OK', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(StatusCodes.OK)

    const users: UserResponse[] = <UserResponse[]> response.body
    const emails: string[] = users.map((user: UserResponse) => user.email)

    assert.isTrue(emails.length >= 2)
    assert.isTrue(emails.includes(EMAIL_1))
    assert.isTrue(emails.includes(EMAIL_2))
  })

  after(async () => {
    await app.close()

    await deleteUser(EMAIL_1, EMAIL_2)
  })
})
