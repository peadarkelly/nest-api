import { Validator } from 'src/modules/common/validators/validator'
import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator'
import { UserCreateRequest } from 'src/modules/user/dtos/userCreateRequest.dto'

export class UserCreateValidator extends Validator implements UserCreateRequest {

  @IsEmail()
  @IsNotEmpty()
  email: string

  @MaxLength(100)
  @IsNotEmpty()
  firstName: string

  @MaxLength(100)
  @IsNotEmpty()
  lastName: string

}
