import {
  Controller,
  HttpCode,
  UseGuards,
  HttpStatus,
  Response,
  HttpException
} from '@nestjs/common'
import {
  DashboardEndpointsData,
  dashboardEndpointsMeta,
  PlaceBetRequest
} from '@shared/endpoints/dashboard'
import {
  hasFixtureBegun,
  isValidBetPlacement
} from '@shared/validators/fixture'
import { Endpoints } from 'decorators/endpoints'
import { AuthGuard } from 'guards/auth'
import { FixtureService } from 'services/fixture'

@Controller()
@Endpoints(dashboardEndpointsMeta)
export class DashboardController implements DashboardEndpointsData {
  constructor(private readonly fixtureService: FixtureService) {}

  @UseGuards(new AuthGuard())
  @HttpCode(200)
  async get(credentials: void, request) {
    return await this.fixtureService.getFixturesWithBets(request.locals.email)
  }

  @UseGuards(new AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async placeBet(bet: PlaceBetRequest, request) {
    const fixture = await this.fixtureService.getFixture(
      bet.awayTeam,
      bet.homeTeam
    )

    if (
      fixture &&
      !hasFixtureBegun(fixture) &&
      isValidBetPlacement(bet.placement)
    ) {
      await this.fixtureService.placeBet(
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
