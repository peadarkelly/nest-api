import { describe, it, beforeEach } from 'mocha'
import { assert } from 'chai'
import { mock, instance, when, verify, anything } from 'ts-mockito'
import { UserService } from 'src/services/user.service'
import { UserMapper } from 'src/mappers/user.mapper'
import { UserDao } from 'src/daos/user.dao'
import { UserResponse } from 'src/dtos/userResponse.dto'
import { UserCreateRequest } from 'src/dtos/userCreateRequest.dto'
import { UserCreateResponse } from 'src/dtos/userCreateResponse.dto'
import { User } from 'src/data-models/user.model'
import { generateUser } from 'test/fixtures/user.fixtures'

describe('UserService', () => {

  let service: UserService

  let mapper: UserMapper
  let dao: UserDao

  beforeEach(() => {
    mapper = mock(UserMapper)
    dao = mock(UserDao)

    service = new UserService(instance(mapper), instance(dao))
  })

  describe('getUsers', () => {
    it('should fetches a list of users from the database and maps each to the response model', async () => {
      const user1: User = generateUser()
      const user2: User = generateUser()

      const response1: UserResponse = new UserResponse()
      const response2: UserResponse = new UserResponse()

      when(dao.findAll()).thenResolve([user1, user2])
      when(mapper.mapToUserResponse(anything())).thenReturn(response1, response2)

      const result: UserResponse[] = await service.getUsers()

      assert.equal(result.length, 2)
      assert.equal(result[0], response1)
      assert.equal(result[1], response2)

      verify(mapper.mapToUserResponse(anything())).twice()
      verify(mapper.mapToUserResponse(user1)).called()
      verify(mapper.mapToUserResponse(user2)).called()
    })
  })

  describe('getUser', () => {
    it('should resolve null if no user exists with the provided email', async () => {
      when(dao.findByEmail('user@mail.com')).thenResolve(null)

      assert.isNull(await service.getUser('user@mail.com'))

      verify(mapper.mapToUserResponse(anything())).never()
    })

    it('should fetch a user from the database with the provided email and map it to the response', async () => {
      const user: User = generateUser()
      const response: UserResponse = new UserResponse()

      when(dao.findByEmail('user@mail.com')).thenResolve(user)
      when(mapper.mapToUserResponse(user)).thenReturn(response)

      const result: UserResponse = await service.getUser('user@mail.com')

      assert.equal(result, response)
    })
  })

  describe('createUser', () => {
    it('should map the request to a User, save it in the database and finally map the created user to te response', async () => {
      const request: UserCreateRequest = new UserCreateRequest()
      const user: User = generateUser()
      const response: UserCreateResponse = new UserCreateResponse()

      when(mapper.mapToUser(request)).thenReturn(user)
      when(mapper.mapToUserCreateResponse(user)).thenReturn(response)

      const result: UserCreateResponse = await service.createUser(request)

      assert.equal(result, response)

      verify(dao.create(user)).called()
    })
  })
})
