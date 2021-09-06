import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BetPlacement } from '@shared/models/bet-placement'
import { MatchWinner } from '@shared/models/match-winner'
import { BetEntity } from 'entities/bet'
import { FixtureEntity } from 'entities/fixture'
import { UserEntity } from 'entities/user'
import { Repository } from 'typeorm'

@Injectable()
export class HighscoresService {
  constructor(
    @InjectRepository(FixtureEntity)
    private readonly fixtureRepository: Repository<FixtureEntity>,
    @InjectRepository(BetEntity)
    private readonly betRepository: Repository<BetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async get(tournamentId: number, email: string) {
    const users = await this.userRepository.find()
    const fixtures = await this.fixtureRepository.find({ tournamentId })
    const bets = await this.betRepository.find({ tournamentId })

    return (
      users
        // Map all the users to retrieve the data we're interested in
        .map((user) => ({
          name: user.displayName,
          me: user.email.toLowerCase() === email.toLowerCase(),
          // Compare all the user bets to the fixtures to find out total score
          score: fixtures.filter((fixture) =>
            bets.find(
              (bet) =>
                bet.userEmail.toLowerCase() === user.email.toLowerCase() &&
                bet.awayTeam === fixture.awayTeam &&
                bet.homeTeam === fixture.homeTeam &&
                ((bet.placement === BetPlacement.Home &&
                  fixture.matchWinner === MatchWinner.Home) ||
                  (bet.placement === BetPlacement.Away &&
                    fixture.matchWinner === MatchWinner.Away) ||
                  (bet.placement === BetPlacement.NotPlaced &&
                    fixture.matchWinner === MatchWinner.None))
            )
          ).length,
        }))
        // Sort the scores so the highest score comes first
        .sort((a, b) => b.score - a.score)
        // Rank the highscores from index
        .map((highscore, index) => ({ ...highscore, rank: index + 1 }))
        // Make sure all highscores with equal scores share the same rank
        .map((highscore, _, highscores) => ({
          ...highscore,
          rank: highscores.find(
            (_highscore, _index) => _highscore.score === highscore.score
          ).rank,
        }))
    )
  }
}
