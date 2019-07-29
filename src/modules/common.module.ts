import { Module, Provider } from '@nestjs/common'
import { RequestValidator } from 'src/validators/request.validator'
import { KNEX } from 'src/types'
import { knex } from 'src/constants/knex.const'

const knexProvider: Provider = {
  provide: KNEX,
  useValue: knex,
}

@Module({
  providers: [
    RequestValidator,
    knexProvider
  ],
  exports: [RequestValidator, knexProvider]
})
export class CommonModule {}
