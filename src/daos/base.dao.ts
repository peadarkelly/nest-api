import { BaseModel } from 'src/data-models/base.model'

export abstract class BaseDao<T extends BaseModel> {

  public findAll(): Promise<T[]> {
    return Promise.resolve(<T[]>[])
  }

  public findById(id: number): Promise<T> {
    console.log(id)
    return Promise.resolve(<T>undefined)
  }

  public findByIds(ids: number[]): Promise<T[]> {
    console.log(ids)
    return Promise.resolve(<T[]>[])
  }

  public findSingleByColumnValue(column: string, value: number | string | boolean): Promise<T> {
    console.log(column)
    console.log(value)
    return Promise.resolve(<T>undefined)
  }

  public findManyByColumnValue(column: string, value: string | number | boolean): Promise<T[]> {
    console.log(column)
    console.log(value)
    return Promise.resolve(<T[]>[])
  }

  public create(model: T): Promise<void> {
    console.log(model)
    return Promise.resolve()
  }
}
