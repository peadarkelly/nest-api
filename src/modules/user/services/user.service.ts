import { Injectable } from '@nestjs/common'
import { User } from 'src/modules/user/data-models/user.model'
import { UserMapper } from 'src/modules/user/mappers/user.mapper'
import { UserDao } from 'src/modules/user/daos/user.dao'
import { UserCreateResponse } from 'src/modules/user/dtos/userCreateResponse.dto'
import { UserCreateRequest } from 'src/modules/user/dtos/userCreateRequest.dto'
import { UserResponse } from 'src/modules/user/dtos/userResponse.dto'

@Injectable()
export class UserService {

  public constructor(
    private mapper: UserMapper,
    private dao: UserDao) {}

  public async getUsers(): Promise<UserResponse[]> {
    const users: User[] = await this.dao.findAll()
    return users.map((user: User) => this.mapper.mapToUserResponse(user))
  }

  public async getUser(email: string): Promise<UserResponse> {
    const user: User = await this.dao.findByEmail(email)

    return user ? this.mapper.mapToUserResponse(user) : null
  }

  public async createUser(body: UserCreateRequest): Promise<UserCreateResponse> {
    const user: User = this.mapper.mapToUser(body)

    await this.dao.create(user)

    return this.mapper.mapToUserCreateResponse(user)
  }
}
