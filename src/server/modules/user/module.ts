import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'entities/user'
import { AuthService } from 'services/auth'
import { UserService } from 'services/user'
import { JwtStrategy } from 'strategies/jwt'
import { UserController } from './controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [UserController],
  exports: [AuthService]
})
export class UserModule {}
