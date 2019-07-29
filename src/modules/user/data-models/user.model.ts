import { BaseModel } from 'src/modules/common/data-models/base.model'

export interface User extends BaseModel {
  email: string
  first_name: string
  last_name: string
}
