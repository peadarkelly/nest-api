import { Module } from '@nestjs/common'
import { CommonModule } from 'src/modules/common.module'
import { UserModule } from 'src/modules/user.module'

@Module({
  imports: [CommonModule, UserModule]
})
export class AppModule {}
