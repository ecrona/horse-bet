import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BetEntity } from 'entities/bet'
import { FixtureEntity } from 'entities/fixture'
import { TournamentEntity } from 'entities/tournament'
import { UserEntity } from 'entities/user'
import { UserService } from 'services/user'
import { HighscoresController } from './controller'
import { HighscoresService } from './service'

@Module({
  imports: [
    TypeOrmModule.forFeature([BetEntity]),
    TypeOrmModule.forFeature([FixtureEntity]),
    TypeOrmModule.forFeature([TournamentEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [HighscoresService, UserService],
  controllers: [HighscoresController],
})
export class HighscoresModule {}
