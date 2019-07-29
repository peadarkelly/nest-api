import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { describe, before, it } from 'mocha'
import { assert } from 'chai'
import { NOT_FOUND, OK } from 'http-status-codes'
import { UserModule } from 'src/modules/user.module'
import { insertUser, deleteUser } from '../helpers/user.helper'
import { generateUser } from 'test/fixtures/user.fixtures'

describe('GET /users/{email}', () => {
  let app: INestApplication

  const NON_EXISTING_EMAIL = 'missing@user.com'
  const EXISTING_EMAIL = 'user@mail.com'

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    await insertUser(generateUser(EXISTING_EMAIL))
  })

  it('should return a Not Found if no user exists with the provided email', async () => {
    await request(app.getHttpServer())
      .get(`/users/${NON_EXISTING_EMAIL}`)
      .expect(NOT_FOUND)
  })

  it('should return the user who matches the provided email with OK', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${EXISTING_EMAIL}`)
      .expect(OK)

    assert.equal(response.body.email, EXISTING_EMAIL)
  })

  after(async () => {
    await app.close()

    await deleteUser(EXISTING_EMAIL)
  })
})
