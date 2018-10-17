import {
  Endpoint,
  EndpointsMeta,
  Response,
  RequestMethod
} from '@shared/utils/endpoints'
import { Fixture } from '@shared/models/fixture'

interface DashboardBaseEndpoints {
  get: any
}

export interface DashboardEndpointsData extends DashboardBaseEndpoints {
  get: Endpoint<void, Array<Fixture>>
}

export const dashboardEndpointsMeta: EndpointsMeta<DashboardBaseEndpoints> = {
  get: { route: '/dashboard', requestMethod: RequestMethod.Get }
}
