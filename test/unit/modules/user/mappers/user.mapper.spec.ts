import { describe, it } from 'mocha'
import { assert } from 'chai'
import { UserMapper } from 'src/modules/user/mappers/user.mapper'
import { UserCreateRequest } from 'src/modules/user/dtos/userCreateRequest.dto'
import { UserCreateResponse } from 'src/modules/user/dtos/userCreateResponse.dto'
import { UserResponse } from 'src/modules/user/dtos/userResponse.dto'
import { User } from 'src/modules/user/data-models/user.model'
import { generateUser } from '../../../../fixtures/user.fixtures'

describe('UserMapper', () => {

  const mapper: UserMapper = new UserMapper()

  describe('mapToUser', () => {
    it('should map a UserCreateRequest to a User data model', async () => {
      const request: UserCreateRequest = new UserCreateRequest()
      request.email = 'user@mail.com'
      request.firstName = 'Test'
      request.lastName = 'User'

      const result: User = await mapper.mapToUser(request)

      assert.equal(result.email, 'user@mail.com')
      assert.equal(result.first_name, 'Test')
      assert.equal(result.last_name, 'User')
    })
  })

  describe('mapToUserResponse', () => {
    it('should map a User data model to a UserResponse', async () => {
      const user: User = generateUser()
      user.email = 'user@mail.com'
      user.first_name = 'Test'
      user.last_name = 'User'

      const result: UserResponse = await mapper.mapToUserResponse(user)

      assert.equal(result.email, 'user@mail.com')
      assert.equal(result.firstName, 'Test')
      assert.equal(result.lastName, 'User')
    })
  })

  describe('mapToUserCreateResponse', () => {
    it('should map a User data model to a mapToUserCreateResponse', async () => {
      const user: User = generateUser()
      user.email = 'user@mail.com'

      const result: UserCreateResponse = await mapper.mapToUserCreateResponse(user)

      assert.equal(result.email, 'user@mail.com')
    })
  })
})
