import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DashboardController } from './controller'
import { BetEntity } from 'entities/bet'
import { FixtureEntity } from 'entities/fixture'
import { FixtureService } from 'services/fixture'

@Module({
  imports: [
    TypeOrmModule.forFeature([BetEntity]),
    TypeOrmModule.forFeature([FixtureEntity])
  ],
  providers: [FixtureService],
  controllers: [DashboardController]
})
export class DashboardModule {}
