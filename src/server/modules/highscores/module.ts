import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FixtureEntity } from 'entities/fixture'
import { BetEntity } from 'entities/bet'
import { UserEntity } from 'entities/user'
import { HighscoresController } from './controller'
import { HighscoresService } from './service'

@Module({
  imports: [
    TypeOrmModule.forFeature([BetEntity]),
    TypeOrmModule.forFeature([FixtureEntity]),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [HighscoresService],
  controllers: [HighscoresController]
})
export class HighscoresModule {}
