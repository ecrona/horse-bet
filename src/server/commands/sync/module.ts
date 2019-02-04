import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SyncCommand } from './command'
import { FixtureEntity } from 'entities/fixture'
import { BetEntity } from 'entities/bet'
import { FixtureService } from 'services/fixture'

@Module({
  imports: [
    TypeOrmModule.forFeature([FixtureEntity]),
    TypeOrmModule.forFeature([BetEntity])
  ],
  providers: [FixtureService, SyncCommand]
})
export class SyncModule {}
