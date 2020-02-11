import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BetPlacement } from '@shared/models/bet-placement'
import { hasFixtureBegun } from '@shared/validators/fixture'
import * as format from 'date-fns/format'
import { BetEntity } from 'entities/bet'
import { FixtureEntity } from 'entities/fixture'
import { UserEntity } from 'entities/user'
import { MoreThan, Repository } from 'typeorm'

const tournamentId = 2

@Injectable()
export class FixtureService {
  constructor(
    @InjectRepository(FixtureEntity)
    private readonly fixtureRepository: Repository<FixtureEntity>,
    @InjectRepository(BetEntity)
    private readonly betRepository: Repository<BetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  private getTeamLogo(name: string) {
    return `/assets/logotypes/${name.toLocaleLowerCase().replace(' ', '-')}.png`
  }

  async getFixture(awayTeam: string, homeTeam: string) {
    return await this.fixtureRepository.findOne({ tournamentId, awayTeam, homeTeam })
  }

  async getFixtures() {
    return (await this.fixtureRepository.find({ tournamentId })).map(fixture => ({
      ...fixture,
      lastSync: format(new Date(fixture.lastSync), 'YYYY-MM-DD HH:mm:ss')
    }))
  }

  async getActiveFixtures() {
    return await this.fixtureRepository.find({
      firstMatchStart: MoreThan(new Date())
    })
  }

  async getFixturesWithBets(email: string) {
    const fixtures = await this.fixtureRepository.find({ tournamentId })
    const bets = await this.betRepository.find({ tournamentId })
    const users = await this.userRepository.find()

    return fixtures
      .sort((a, b) => (a.firstMatchStart < b.firstMatchStart ? 1 : -1))
      .map(fixture => {
        const fixtureBets = bets.filter(
          bet =>
            bet.awayTeam === fixture.awayTeam &&
            bet.homeTeam === fixture.homeTeam
        )
        const userBet = fixtureBets.find(
          bet => bet.userEmail.toLowerCase() === email.toLowerCase()
        )

        return {
          round: fixture.round,
          firstMatchStart: format(
            new Date(fixture.firstMatchStart),
            'YYYY-MM-DD HH:ss'
          ),
          secondMatchStart: format(
            new Date(fixture.secondMatchStart),
            'YYYY-MM-DD HH:ss'
          ),
          homeTeam: {
            name: fixture.homeTeam,
            logo: this.getTeamLogo(fixture.homeTeam)
          },
          awayTeam: {
            name: fixture.awayTeam,
            logo: this.getTeamLogo(fixture.awayTeam)
          },
          betPlacement: userBet ? userBet.placement : BetPlacement.NotPlaced,
          matchWinner: fixture.matchWinner,
          score: fixture.score,
          bets: hasFixtureBegun(fixture)
            ? fixtureBets.map(bet => ({
              name: users.find(
                user =>
                  user.email.toLowerCase() === bet.userEmail.toLowerCase()
              ).displayName,
              placement: bet.placement
            }))
            : []
        }
      })
  }

  async saveFixtures(fixtures: Array<FixtureEntity>) {
    return await this.fixtureRepository.save(fixtures.map(fixture => ({ ...fixture, tournamentId })))
  }

  async placeBet(
    email: string,
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) {
    const bet = new BetEntity()
    bet.tournamentId = tournamentId
    bet.userEmail = email
    bet.homeTeam = homeTeam
    bet.awayTeam = awayTeam
    bet.placement = placement

    return Boolean(await this.betRepository.save(bet))
  }
}
