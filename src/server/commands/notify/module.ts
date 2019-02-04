import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotifyCommand } from './command'
import { UserEntity } from 'entities/user'
import { BetEntity } from 'entities/bet'
import { UserService } from 'services/user'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([BetEntity])
  ],
  providers: [UserService, NotifyCommand]
})
export class NotifyModule {}
