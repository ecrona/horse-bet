import { Command, Positional } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { FixtureService } from 'services/fixture'
import { FootballData } from './api-adapters/football-data'
import { MatchWinner } from '@shared/models/match-winner'

@Injectable()
export class SyncCommand {
  constructor(private readonly fixtureService: FixtureService) {}

  @Command({
    command: 'sync:fixtures <test>',
    describe: 'sync all the fixtures'
  })
  async fixtures(
    @Positional({
      name: 'test'
    })
    test: number
  ) {
    const api = new FootballData()
    const fixtures = (await api.getFixtures()).map(match => ({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      matchStart: match.matchStart,
      round: match.round,
      winner: match.winner,
      score:
        match.winner === MatchWinner.InProgress
          ? ''
          : `${
              match.winner === MatchWinner.Home && match.penalties ? 'P ' : ''
            }${match.homeScore}-${match.awayScore}${
              match.winner === MatchWinner.Away && match.penalties ? ' P' : ''
            }`,
      lastUpdated: match.lastUpdated
    }))

    const existingFixtures = await this.fixtureService.getFixtures()

    const fixturesToAdd = fixtures.filter(
      fixture =>
        !existingFixtures.find(
          existingFixture =>
            existingFixture.homeTeam === fixture.homeTeam &&
            existingFixture.awayTeam === fixture.awayTeam
        )
    )

    const fixturesToUpdate = fixtures.filter(fixture =>
      existingFixtures.find(
        existingFixture =>
          existingFixture.homeTeam === fixture.homeTeam &&
          existingFixture.awayTeam === fixture.awayTeam &&
          existingFixture.lastSync < fixture.lastUpdated
      )
    )

    await this.fixtureService.createFixtures(
      [...fixturesToAdd, ...fixturesToUpdate].map(fixture => ({
        homeTeam: fixture.homeTeam,
        awayTeam: fixture.awayTeam,
        round: fixture.round,
        matchStart: fixture.matchStart,
        matchWinner: fixture.winner,
        score: fixture.score,
        lastSync: fixture.lastUpdated
      }))
    )
  }
}
