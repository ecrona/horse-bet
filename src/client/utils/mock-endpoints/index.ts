import { Endpoints } from '@shared/endpoints'
import { fixturesMockEndpoints } from './fixtures'
import { highscoresMockEndpoints } from './highscores'
import { tournamentMockEndpoints } from './tournaments'
import { userMockEndpoints } from './user'

export const mockEndpoints: Endpoints = {
  user: userMockEndpoints,
  tournaments: tournamentMockEndpoints,
  fixtures: fixturesMockEndpoints,
  highscores: highscoresMockEndpoints,
}
