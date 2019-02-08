import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailCommand } from './command'
import { UserEntity } from 'entities/user'
import { FixtureEntity } from 'entities/fixture'
import { BetEntity } from 'entities/bet'
import { FixtureService } from 'services/fixture'
import { UserService } from 'services/user'

@Module({
  imports: [
    TypeOrmModule.forFeature([BetEntity]),
    TypeOrmModule.forFeature([FixtureEntity]),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [FixtureService, UserService, MailCommand]
})
export class MailModule {}
