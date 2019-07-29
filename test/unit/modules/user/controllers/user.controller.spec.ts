import { describe, it, beforeEach } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, verify, anyOfClass } from 'ts-mockito'
import { NOT_FOUND, BAD_REQUEST, CONFLICT } from 'http-status-codes'
import { UserController } from 'src/modules/user/controllers/user.controller'
import { RequestValidator } from 'src/modules/common/validators/request.validator'
import { UserService } from 'src/modules/user/services/user.service'
import { UserResponse } from 'src/modules/user/dtos/userResponse.dto'
import { UserCreateValidator } from 'src/modules/user/validators/userCreate.validator'
import { UserCreateRequest } from 'src/modules/user/dtos/userCreateRequest.dto'
import { UserCreateResponse } from 'src/modules/user/dtos/userCreateResponse.dto'

describe('UserController', () => {

  let controller: UserController

  let validator: RequestValidator
  let service: UserService

  beforeEach(() => {
    validator = mock(RequestValidator)
    service = mock(UserService)

    controller = new UserController(instance(validator), instance(service))
  })

  describe('getUsers', () => {
    it('should fetch and return a list of users', async () => {
      const users: UserResponse[] = [new UserResponse(), new UserResponse()]

      when(service.getUsers()).thenResolve(users)

      const result: UserResponse[] = await controller.getUsers()

      assert.equal(result, users)
    })
  })

  describe('getUser', () => {
    it('should reject with a Not Found exception if no user exists with the provided email', async () => {
      when(service.getUser('user@mail.com')).thenResolve(null)

      try {
        await controller.getUser('user@mail.com')
        assert.fail()
      } catch (err) {
        assert.equal(err.getStatus(), NOT_FOUND)
      }
    })

    it('should fetch and return a the user with the provided email', async () => {
      const user: UserResponse = new UserResponse()

      when(service.getUser('user@mail.com')).thenResolve(user)

      const result: UserResponse = await controller.getUser('user@mail.com')

      assert.equal(result, user)
    })
  })

  describe('createUser', () => {
    it('should reject with a Bad Request exception if request validation fails', async () => {
      const request: UserCreateRequest = new UserCreateRequest()

      when(validator.validateRequest(anyOfClass(UserCreateValidator), request)).thenResolve({})

      try {
        await controller.createUser(request)
        assert.fail()
      } catch (err) {
        assert.equal(err.getStatus(), BAD_REQUEST)
      }

      verify(service.createUser(request)).never()
    })

    it('should reject with a Conflict exception if a user already exists with the provided email', async () => {
      const request: UserCreateRequest = new UserCreateRequest()
      request.email = 'user@mail.com'

      when(validator.validateRequest(anyOfClass(UserCreateValidator), request)).thenResolve(null)
      when(service.getUser('user@mail.com')).thenResolve(new UserResponse())

      try {
        await controller.createUser(request)
        assert.fail()
      } catch (err) {
        assert.equal(err.getStatus(), CONFLICT)
      }

      verify(service.createUser(request)).never()
    })

    it('should create the user', async () => {
      const request: UserCreateRequest = new UserCreateRequest()
      const response: UserCreateResponse = new UserCreateResponse()

      when(validator.validateRequest(anyOfClass(UserCreateValidator), request)).thenResolve(null)
      when(service.getUser('user@mail.com')).thenResolve(null)
      when(service.createUser(request)).thenResolve(response)

      const user: UserCreateResponse = await controller.createUser(request)

      assert.equal(user, response)

      verify(service.createUser(request)).called()
    })
  })
})
