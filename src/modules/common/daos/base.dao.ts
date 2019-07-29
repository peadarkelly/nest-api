import * as Knex from 'knex'
import { BaseModel } from 'src/modules/common/data-models/base.model'

export abstract class BaseDao<T extends BaseModel> {

  public constructor(protected knex: Knex, private table: string) {}

  public findAll(): Promise<T[]> {
    return this.knex(this.table)
  }

  public findById(id: number): Promise<T> {
    return this.findSingleByColumnValue('id', id)
  }

  public findByIds(ids: number[]): Promise<T[]> {
    return this.knex(this.table).whereIn('id', ids)
  }

  public findSingleByColumnValue(column: string, value: number | string | boolean): Promise<T> {
    return this.knex(this.table).where(column, value).first()
  }

  public findManyByColumnValue(column: string, value: any): Promise<T[]> {
    return this.knex(this.table).where(column, value)
  }

  public create(model: T): Promise<void> {
    return this.knex(this.table).insert(model)
  }
}
