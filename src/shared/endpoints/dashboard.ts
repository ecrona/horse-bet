import {
  Endpoint,
  EndpointsMeta,
  Response,
  RequestMethod
} from '@shared/utils/endpoints'
import { Fixture } from '@shared/models/fixture'
import { BetPlacement } from '@shared/models/bet-placement'

export interface PlaceBetRequest {
  awayTeam: string
  homeTeam: string
  placement: BetPlacement
}

interface DashboardBaseEndpoints {
  get: any
  placeBet: any
}

export interface DashboardEndpointsData extends DashboardBaseEndpoints {
  get: Endpoint<void, Array<Fixture>>
  placeBet: Endpoint<PlaceBetRequest, void>
}

export const dashboardEndpointsMeta: EndpointsMeta<DashboardBaseEndpoints> = {
  get: { route: '/dashboard', requestMethod: RequestMethod.Get },
  placeBet: { route: '/dashboard/placeBet', requestMethod: RequestMethod.Post }
}
