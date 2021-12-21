import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BetEntity } from 'entities/bet'
import { FixtureEntity } from 'entities/fixture'
import { TournamentEntity } from 'entities/tournament'
import { UserEntity } from 'entities/user'
import { FixtureService } from 'services/fixture'
import { UserService } from 'services/user'
import { MailCommand } from './command'

@Module({
  imports: [
    TypeOrmModule.forFeature([BetEntity]),
    TypeOrmModule.forFeature([FixtureEntity]),
    TypeOrmModule.forFeature([TournamentEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [FixtureService, UserService, MailCommand],
})
export class MailModule {}
