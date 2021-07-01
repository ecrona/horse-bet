import { BetPlacement } from '@shared/models/bet-placement'
import { Fixture } from '@shared/models/fixture'
import { Endpoint, EndpointsMeta, RequestMethod } from '@shared/utils/endpoints'

interface FixtureBaseRequest {
  tournamentId: number
  awayTeam: string
  homeTeam: string
  // score: string
  // matchWinner: MatchWinner
}

export interface PlaceBetRequest extends FixtureBaseRequest {
  placement: BetPlacement
}

export interface UpdateFixtureRequest extends FixtureBaseRequest {
  firstMatchStart: string
  secondMatchStart: string
}

interface FixtureBaseEndpoints {
  get: any
  update: any
  placeBet: any
}

export interface FixtureEndpointsData extends FixtureBaseEndpoints {
  get: Endpoint<{ id: number }, Array<Fixture>>
  update: Endpoint<UpdateFixtureRequest, Fixture>
  placeBet: Endpoint<PlaceBetRequest, void>
}

export const fixturesEndpointsMeta: EndpointsMeta<FixtureBaseEndpoints> = {
  get: { route: '/fixtures', requestMethod: RequestMethod.Get },
  update: { route: '/fixtures', requestMethod: RequestMethod.Put },
  placeBet: { route: '/fixtures/placeBet', requestMethod: RequestMethod.Put },
}
