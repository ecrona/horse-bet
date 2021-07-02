import { BetPlacement } from '@shared/models/bet-placement'
import { Round } from '@shared/models/round'
import { Tournament, TournamentDetail } from '@shared/models/tournament'
import { Endpoint, EndpointsMeta, RequestMethod } from '@shared/utils/endpoints'

export interface PlaceBetRequest {
  awayTeam: string
  homeTeam: string
  placement: BetPlacement
}

interface FixtureRequest {
  awayTeam: string
  homeTeam: string
  firstMatchStart: string
  secondMatchStart: string
  score: string
  
}

interface TournamentBaseRequest {
  name: string
}

export interface CreateTournamentRequest extends TournamentBaseRequest {
  firstRound: Round
  fixtures: Array<FixtureRequest>
}

export interface ModifyTournamentRequest extends TournamentBaseRequest {
  id: number
}

export interface ConcludeRoundRequest {
  id: number
  fixtures: Array<FixtureRequest>
}

interface TournamentBaseEndpoints {
  getAll: any
  create: any
  modify: any
  concludeRound: any
}

export interface TournamentEndpointsData extends TournamentBaseEndpoints {
  getAll: Endpoint<void, Array<Tournament>>
  create: Endpoint<CreateTournamentRequest, TournamentDetail>
  modify: Endpoint<ModifyTournamentRequest, Tournament>
  concludeRound: Endpoint<ConcludeRoundRequest, TournamentDetail>
}

export const tournamentEndpointsMeta: EndpointsMeta<TournamentBaseEndpoints> = {
  getAll: { route: '/tournaments', requestMethod: RequestMethod.Get },
  create: { route: '/tournaments', requestMethod: RequestMethod.Post },
  modify: { route: '/tournaments', requestMethod: RequestMethod.Put },
  concludeRound: {
    route: '/tournaments/conclude',
    requestMethod: RequestMethod.Put,
  },
}
