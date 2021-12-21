import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SyncCommand } from './command'
import { BetEntity } from 'entities/bet'
import { FixtureEntity } from 'entities/fixture'
import { FixtureService } from 'services/fixture'
import { UserEntity } from 'entities/user'

@Module({
  imports: [
    TypeOrmModule.forFeature([BetEntity]),
    TypeOrmModule.forFeature([FixtureEntity]),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [FixtureService, SyncCommand]
})
export class SyncModule {}
