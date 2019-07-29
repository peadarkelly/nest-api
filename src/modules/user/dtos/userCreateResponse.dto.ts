import { ApiModelProperty } from '@nestjs/swagger'

export class UserCreateResponse {

  @ApiModelProperty()
  email: string

}
