import { ApiModelProperty } from '@nestjs/swagger'

export class UserResponse {

  @ApiModelProperty()
  email: string

  @ApiModelProperty()
  firstName: string

  @ApiModelProperty()
  lastName: string

}
