import { ApiModelProperty } from '@nestjs/swagger'

export class UserCreateRequest {

  @ApiModelProperty()
  email: string

  @ApiModelProperty()
  firstName: string

  @ApiModelProperty()
  lastName: string
}
