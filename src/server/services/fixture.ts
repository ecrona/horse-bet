import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as format from 'date-fns/format'
import { BetPlacement } from '@shared/models/bet-placement'
import { FixtureEntity } from 'entities/fixture'
import { BetEntity } from 'entities/bet'

@Injectable()
export class FixtureService {
  constructor(
    @InjectRepository(FixtureEntity)
    private readonly fixtureRepository: Repository<FixtureEntity>,
    @InjectRepository(BetEntity)
    private readonly betRepository: Repository<BetEntity>
  ) {}

  private getTeamLogo(name: string) {
    return `/img/${name.toLocaleLowerCase()}.png`
  }

  async getFixture(awayTeam: string, homeTeam: string) {
    return await this.fixtureRepository.findOne({ awayTeam, homeTeam })
  }

  async getFixturesWithBets(email: string) {
    const fixtures = await this.fixtureRepository.find()
    const bets = await this.betRepository.find({
      userEmail: email
    })

    return fixtures.map(fixture => {
      const fixtureBet = bets.find(
        bet =>
          bet.awayTeam === fixture.awayTeam && bet.homeTeam === fixture.homeTeam
      )

      const matchStart = new Date(fixture.matchStart)

      return {
        round: fixture.round,
        startDate: format(matchStart, 'YYYY-MM-DD'),
        startDay: format(matchStart, 'dddd'),
        startTime: format(matchStart, 'HH:ss'),
        homeTeam: {
          name: fixture.homeTeam,
          logo: this.getTeamLogo(fixture.homeTeam)
        },
        awayTeam: {
          name: fixture.awayTeam,
          logo: this.getTeamLogo(fixture.awayTeam)
        },
        betPlacement: fixtureBet
          ? fixtureBet.placement
          : BetPlacement.NotPlaced,
        matchWinner: fixture.matchWinner,
        score: fixture.score
      }
    })
  }

  async placeBet(
    email: string,
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) {
    const bet = new BetEntity()
    bet.userEmail = email
    bet.homeTeam = homeTeam
    bet.awayTeam = awayTeam
    bet.placement = placement

    return Boolean(await this.betRepository.save(bet))
  }
}
