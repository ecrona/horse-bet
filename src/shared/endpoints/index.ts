import { UserEndpointsData, userEndpointsMeta } from '@shared/endpoints/user'
import {
  DashboardEndpointsData,
  dashboardEndpointsMeta
} from '@shared/endpoints/dashboard'
import {
  HighscoresEndpointsData,
  highscoresEndpointsMeta
} from '@shared/endpoints/highscores'

export interface Endpoints {
  user: UserEndpointsData
  dashboard: DashboardEndpointsData
  highscores: HighscoresEndpointsData
}

export const endpointsMeta = {
  user: userEndpointsMeta,
  dashboard: dashboardEndpointsMeta,
  highscores: highscoresEndpointsMeta
}
