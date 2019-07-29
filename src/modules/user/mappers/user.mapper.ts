import { Injectable } from '@nestjs/common'
import { User } from 'src/modules/user/data-models/user.model'
import { UserCreateResponse } from 'src/modules/user/dtos/userCreateResponse.dto'
import { UserCreateRequest } from 'src/modules/user/dtos/userCreateRequest.dto'
import { UserResponse } from 'src/modules/user/dtos/userResponse.dto'

@Injectable()
export class UserMapper {

  public mapToUser(request: UserCreateRequest): User {
    return {
      email: request.email,
      first_name: request.firstName,
      last_name: request.lastName
    }
  }

  public mapToUserResponse(user: User): UserResponse {
    const response: UserResponse = new UserResponse()

    response.email = user.email
    response.firstName = user.first_name
    response.lastName = user.last_name

    return response
  }

  public mapToUserCreateResponse(user: User): UserCreateResponse {
    const response: UserCreateResponse = new UserCreateResponse()

    response.email = user.email

    return response
  }
}
