import { fixturesEndpointsMeta } from '@client/../shared/endpoints/fixtures'
import { Endpoints } from '@shared/endpoints'
import { highscoresMockEndpoints } from './highscores'
import { tournamentMockEndpoints } from './tournaments'
import { userMockEndpoints } from './user'

export const mockEndpoints: Endpoints = {
  user: userMockEndpoints,
  tournaments: tournamentMockEndpoints,
  fixtures: fixturesEndpointsMeta,
  highscores: highscoresMockEndpoints,
}
