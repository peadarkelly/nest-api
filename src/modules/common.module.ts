import { Module } from '@nestjs/common'
import { RequestValidator } from 'src/validators/request.validator'

@Module({
  providers: [
    RequestValidator
  ],
  exports: [RequestValidator]
})
export class CommonModule {}
