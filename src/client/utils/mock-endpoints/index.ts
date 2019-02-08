import { Endpoints } from '@shared/endpoints'
import { dashboardMockEndpoints } from './dashboard'
import { highscoresMockEndpoints } from './highscores'
import { userMockEndpoints } from './user'

export const mockEndpoints: Endpoints = {
  user: userMockEndpoints,
  dashboard: dashboardMockEndpoints,
  highscores: highscoresMockEndpoints
}
