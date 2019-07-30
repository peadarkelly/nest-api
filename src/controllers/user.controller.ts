import { Controller, Get, Param, Post, Body, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { ApiValidationErrors, RequestValidator } from 'src/validators/request.validator'
import { UserService } from 'src/services/user.service'
import { UserResponse } from 'src/dtos/userResponse.dto'
import { UserCreateRequest } from 'src/dtos/userCreateRequest.dto'
import { UserCreateResponse } from 'src/dtos/userCreateResponse.dto'
import { UserCreateValidator } from 'src/validators/userCreate.validator'
import { OK, NOT_FOUND, CREATED, BAD_REQUEST, CONFLICT } from 'http-status-codes'

@Controller('users')
export class UserController {

  public constructor(
    private readonly validator: RequestValidator,
    private readonly service: UserService) {}

  @Get()
  @ApiResponse({ status: OK,  type: UserResponse, isArray: true })
  public async getUsers(): Promise<UserResponse[]> {
    return this.service.getUsers()
  }

  @Get(':email')
  @ApiResponse({ status: OK,  type: UserResponse })
  @ApiResponse({ status: NOT_FOUND, description: 'No user can be found with the provided email' })
  public async getUser(@Param('email') email: string): Promise<UserResponse> {
    const response: UserResponse = await this.service.getUser(email)

    if (!response) {
      return Promise.reject(new NotFoundException())
    }

    return response
  }

  @Post()
  @ApiResponse({ status: CREATED, description: 'User successfully created', type: UserCreateResponse })
  @ApiResponse({ status: BAD_REQUEST, description: 'Request body failed to meet validation criteria' })
  @ApiResponse({ status: CONFLICT, description: 'A user already exists with the provided email' })
  public async createUser(@Body() user: UserCreateRequest): Promise<UserCreateResponse> {
    const errors: ApiValidationErrors = await this.validator.validateRequest(new UserCreateValidator(), user)
    if (errors) {
      return Promise.reject(new BadRequestException('Validation failed', JSON.stringify(errors)))
    }

    if (await this.service.getUser(user.email)) {
      return Promise.reject(new ConflictException('A user already exists with the provided email'))
    }

    return this.service.createUser(user)
  }
}
