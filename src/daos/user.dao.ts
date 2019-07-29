import * as Knex from 'knex'
import { Injectable, Inject } from '@nestjs/common'
import { User } from 'src/data-models/user.model'
import { KNEX } from 'src/types'
import { BaseDao } from 'src/daos/base.dao'

@Injectable()
export class UserDao extends BaseDao<User> {

  public constructor(@Inject(KNEX) knex: Knex) {
    super(knex, 'user')
  }

  public findByEmail(email: string): Promise<User> {
    return super.findSingleByColumnValue('email', email)
  }
}
