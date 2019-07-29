import { Module } from '@nestjs/common'
import { CommonModule } from 'src/modules/common.module'
import { UserController } from 'src/controllers/user.controller'
import { UserService } from 'src/services/user.service'
import { UserMapper } from 'src/mappers/user.mapper'
import { UserDao } from 'src/daos/user.dao'

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService, UserMapper, UserDao]
})
export class UserModule {}
