import { Module } from '@nestjs/common'
import { CommonModule } from 'src/modules/common/common.module'
import { UserController } from 'src/modules/user/controllers/user.controller'
import { UserService } from 'src/modules/user/services/user.service'
import { UserMapper } from 'src/modules/user/mappers/user.mapper'
import { UserDao } from 'src/modules/user/daos/user.dao'

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService, UserMapper, UserDao]
})
export class UserModule {}
