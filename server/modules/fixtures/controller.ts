import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import {
  FixtureEndpointsData,
  fixturesEndpointsMeta,
  PlaceBetRequest,
  UpdateFixtureRequest,
} from '@shared/endpoints/fixtures'
import { Fixture } from '@shared/models/fixture'
import {
  hasFixtureBegun,
  isValidBetPlacement,
} from '@shared/validators/fixture'
import { Endpoints } from 'decorators/endpoints'
import { AdminRole, AuthGuard } from 'guards/auth'
import { FixtureService } from 'services/fixture'

@Controller()
@Endpoints(fixturesEndpointsMeta)
export class FixturesController implements FixtureEndpointsData {
  constructor(private readonly fixtureService: FixtureService) {}

  @UseGuards(AuthGuard)
  @HttpCode(200)
  async get(payload: { id: number }, request) {
    return await this.fixtureService.getFixturesWithBets(
      JSON.parse(payload as any).id,
      request.locals.email
    )
  }

  @UseGuards(AuthGuard)
  @AdminRole()
  @HttpCode(200)
  async update(request: UpdateFixtureRequest) {
    await this.fixtureService.updateFixture(request)
    return {} as Fixture
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async placeBet(bet: PlaceBetRequest, request) {
    const fixture = await this.fixtureService.getFixture(
      bet.tournamentId,
      bet.awayTeam,
      bet.homeTeam
    )

    if (
      fixture &&
      !hasFixtureBegun(fixture) &&
      isValidBetPlacement(bet.placement)
    ) {
      await this.fixtureService.placeBet(
        bet.tournamentId,
        request.locals.email,
        bet.awayTeam,
        bet.homeTeam,
        bet.placement
      )
    } else {
      throw new HttpException(null, HttpStatus.BAD_REQUEST)
    }
  }
}
