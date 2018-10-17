import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FixtureEntity } from 'entities/fixture'
import { DashboardController } from './controller'
import { BetEntity } from 'entities/bet'
import { FixtureService } from 'services/fixture'

@Module({
  imports: [
    TypeOrmModule.forFeature([FixtureEntity]),
    TypeOrmModule.forFeature([BetEntity])
  ],
  providers: [FixtureService],
  controllers: [DashboardController]
})
export class DashboardModule {}
