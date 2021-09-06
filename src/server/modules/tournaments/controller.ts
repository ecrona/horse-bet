import { Controller, HttpCode, UseGuards } from '@nestjs/common'
import {
  ConcludeRoundRequest,
  CreateTournamentRequest,
  ModifyTournamentRequest,
  TournamentEndpointsData,
  tournamentEndpointsMeta,
} from '@shared/endpoints/tournament'
import { Endpoints } from 'decorators/endpoints'
import { AdminRole, AuthGuard } from 'guards/auth'
import { FixtureService } from 'services/fixture'
import { TournamentService } from './service'

@Controller()
@Endpoints(tournamentEndpointsMeta)
export class TournamentController implements TournamentEndpointsData {
  constructor(
    private readonly tournamentService: TournamentService,
    private readonly fixtureService: FixtureService
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(200)
  async getAll(payload: void, request) {
    return await this.tournamentService.getAll()
  }

  @UseGuards(AuthGuard)
  @AdminRole()
  @HttpCode(200)
  async create(payload: CreateTournamentRequest, request) {
    const tournament = await this.tournamentService.create(payload)
    return {
      ...tournament,
      fixtures: await this.fixtureService.getFixturesWithBets(
        tournament.id,
        request.locals.email
      ),
    }
  }

  @UseGuards(AuthGuard)
  @AdminRole()
  @HttpCode(200)
  async modify(payload: ModifyTournamentRequest, request) {
    return await this.tournamentService.modify(payload)
  }

  @UseGuards(AuthGuard)
  @AdminRole()
  @HttpCode(200)
  async concludeRound(payload: ConcludeRoundRequest, request) {
    await this.tournamentService.concludeRound(payload)

    return {
      ...(await this.tournamentService.get(payload.id)),
      fixtures: await this.fixtureService.getFixturesWithBets(
        payload.id,
        request.locals.email
      ),
    }
  }
}
