import { Injectable } from '@nestjs/common'
import { User } from 'src/data-models/user.model'
import { BaseDao } from 'src/daos/base.dao'

@Injectable()
export class UserDao extends BaseDao<User> {

  public findByEmail(email: string): Promise<User> {
    return super.findSingleByColumnValue('email', email)
  }
}
