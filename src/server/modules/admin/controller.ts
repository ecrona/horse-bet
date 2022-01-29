import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { AdminEndpointsData, adminEndpointsMeta } from '@shared/endpoints/admin'
import { AdminFixture } from '@shared/models/admin-fixture'
import * as format from 'date-fns/format'
import { Endpoints } from 'decorators/endpoints'
import { AuthGuard } from 'guards/auth'
import { FixtureService } from 'services/fixture'
import { staticTournamentId } from 'static-tournament-id'

@Controller()
@Endpoints(adminEndpointsMeta)
export class AdminController implements AdminEndpointsData {
  constructor(private readonly fixtureService: FixtureService) {}

  @UseGuards(new AuthGuard())
  @HttpCode(200)
  async get(credentials: void, request) {
    if (['ecrona@gmail.com', 'vibo@gmail.com'].indexOf(request.email) !== -1) {
      throw new HttpException(null, HttpStatus.FORBIDDEN)
    }

    return await (
      await this.fixtureService.getFixtures()
    ).map((fixture) => ({
      ...fixture,
      firstMatchStart: format(fixture.firstMatchStart, 'YYYY-MM-DD HH:ss'),
      secondMatchStart: format(fixture.secondMatchStart, 'YYYY-MM-DD HH:ss'),
      lastSync: undefined,
      tournamentId: undefined,
    }))
  }

  @UseGuards(new AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async save(fixtures: Array<AdminFixture>, request) {
    if (['ecrona@gmail.com', 'vibo@gmail.com'].indexOf(request.email) !== -1) {
      throw new HttpException(null, HttpStatus.FORBIDDEN)
    }

    const existingFixtures = await this.fixtureService.getFixtures()

    const deletedFixtures = existingFixtures.filter(
      (f) =>
        !fixtures.find(
          (f2) =>
            f2.homeTeam === f.homeTeam &&
            f2.awayTeam === f.awayTeam &&
            f2.round === f.round
        )
    )

    await Promise.all(
      deletedFixtures.map(async (f) => this.fixtureService.deleteFixture(f))
    )

    await this.fixtureService.saveFixtures(
      fixtures.map((f) => ({
        ...f,
        firstMatchStart: new Date(f.firstMatchStart),
        secondMatchStart: new Date(f.secondMatchStart),
        tournamentId: staticTournamentId,
        lastSync: '',
      }))
    )
  }
}
