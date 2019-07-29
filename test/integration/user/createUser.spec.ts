import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { describe, before, it } from 'mocha'
import { assert } from 'chai'
import { CREATED, BAD_REQUEST, CONFLICT } from 'http-status-codes'
import { UserModule } from 'src/modules/user.module'
import { insertUser, deleteUser } from '../helpers/user.helper'
import { generateUser } from 'test/fixtures/user.fixtures'

describe('POST /users', () => {
  let app: INestApplication

  const EXISTING_EMAIL = 'existingUser@mail.com'
  const NEW_EMAIL = 'newUser@mail.com'

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    await insertUser(generateUser(EXISTING_EMAIL))
  })

  it('should return a Bad Request if request validation fails', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        email: NEW_EMAIL,
        lastName: 'User'
      })
      .expect(BAD_REQUEST)
  })

  it('should return a Conflict if a user already exists with the provided email', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        email: EXISTING_EMAIL,
        firstName: 'Test',
        lastName: 'User'
      })
      .expect(CONFLICT)
  })

  it('should return Created and the user email when the user is created successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        email: NEW_EMAIL,
        firstName: 'Test',
        lastName: 'User'
      })
      .expect(CREATED)

    assert.equal(response.body.email, NEW_EMAIL)
  })

  after(async () => {
    await app.close()

    await deleteUser(EXISTING_EMAIL, NEW_EMAIL)
  })
})
