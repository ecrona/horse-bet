import { Controller, HttpCode, UseGuards } from '@nestjs/common'
import {
  DashboardEndpointsData,
  dashboardEndpointsMeta
} from '@shared/endpoints/dashboard'
import { Endpoints } from 'decorators/endpoints'
import { AuthGuard } from 'guards/auth'
import { AuthService } from 'services/auth'
import { FixtureService } from 'services/fixture'

@Controller()
@Endpoints(dashboardEndpointsMeta)
export class DashboardController implements DashboardEndpointsData {
  constructor(private readonly fixtureService: FixtureService) {}

  // @UseGuards(new AuthGuard())
  @HttpCode(200)
  async get(credentials: void, request) {
    return await this.fixtureService.getFixturesWithBets('ecrona@gmail.com')
  }
}
