import { Injectable } from '@nestjs/common'
import { MatchWinner } from '@shared/models/match-winner'
import { Command, Positional } from 'nestjs-command'
import { FixtureService } from 'services/fixture'
import { FootballData } from './api-adapters/football-data'

@Injectable()
export class SyncCommand {
  constructor(private readonly fixtureService: FixtureService) {}

  @Command({
    command: 'sync:fixtures <test>',
    describe: 'sync all the fixtures',
  })
  async fixtures(
    @Positional({
      name: 'test',
    })
    test: number
  ) {
    const api = new FootballData()
    const fixtures = (await api.getFixtures()).map((match) => ({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      firstMatchStart: match.firstMatchStart,
      secondMatchStart: match.secondMatchStart,
      round: match.round,
      winner: match.winner,
      score:
        match.winner === MatchWinner.None
          ? ''
          : `${
              match.winner === MatchWinner.Home && match.penalties ? 'P ' : ''
            }${match.homeScore}-${match.awayScore}${
              match.winner === MatchWinner.Away && match.penalties ? ' P' : ''
            }`,
      lastUpdated: match.lastUpdated,
    }))

    const existingFixtures = await this.fixtureService.getFixtures(2)

    const fixturesToAdd = fixtures.filter(
      (fixture) =>
        !existingFixtures.find(
          (existingFixture) =>
            existingFixture.homeTeam === fixture.homeTeam &&
            existingFixture.awayTeam === fixture.awayTeam
        )
    )

    const fixturesToUpdate = fixtures.filter((fixture) =>
      existingFixtures.find(
        (existingFixture) =>
          existingFixture.homeTeam === fixture.homeTeam &&
          existingFixture.awayTeam === fixture.awayTeam &&
          existingFixture.lastSync < fixture.lastUpdated
      )
    )

    await this.fixtureService.saveFixtures(
      2,
      [...fixturesToAdd, ...fixturesToUpdate].map((fixture) => ({
        tournamentId: 2,
        homeTeam: fixture.homeTeam,
        awayTeam: fixture.awayTeam,
        round: fixture.round,
        firstMatchStart: new Date(fixture.firstMatchStart),
        secondMatchStart: new Date(fixture.secondMatchStart),
        matchWinner: fixture.winner,
        score: fixture.score,
        lastSync: fixture.lastUpdated,
      }))
    )
  }
}
