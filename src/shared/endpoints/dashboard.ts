import {
  Endpoint,
  EndpointsMeta,
  Response,
  RequestMethod
} from '@shared/utils/endpoints'
import { Round } from '@shared/models/round'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

interface DashboardBaseEndpoints {
  get: any
}

export interface DashboardEndpointsData extends DashboardBaseEndpoints {
  get: Endpoint<void, Array<Round>>
}

export const dashboardEndpointsMeta: EndpointsMeta<DashboardBaseEndpoints> = {
  get: { route: '/dashboard', requestMethod: RequestMethod.Get }
}
