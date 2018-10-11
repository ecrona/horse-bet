import { UserEndpointsData, userEndpointsMeta } from '@shared/endpoints/user'
import {
  DashboardEndpointsData,
  dashboardEndpointsMeta
} from '@shared/endpoints/dashboard'

export interface Endpoints {
  user: UserEndpointsData
  dashboard: DashboardEndpointsData
}

export const endpointsMeta = {
  user: userEndpointsMeta,
  dashboard: dashboardEndpointsMeta
}
