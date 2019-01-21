import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FixtureEntity } from 'entities/fixture'
import { SyncCommand } from './command'
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
