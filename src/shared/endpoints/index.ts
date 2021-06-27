import {
  FixtureEndpointsData,
  fixturesEndpointsMeta,
} from '@shared/endpoints/fixtures'
import {
  HighscoresEndpointsData,
  highscoresEndpointsMeta,
} from '@shared/endpoints/highscores'
import { UserEndpointsData, userEndpointsMeta } from '@shared/endpoints/user'
import { TournamentEndpointsData, tournamentEndpointsMeta } from './tournament'

export interface Endpoints {
  user: UserEndpointsData
  tournaments: TournamentEndpointsData
  fixtures: FixtureEndpointsData
  highscores: HighscoresEndpointsData
}

export const endpointsMeta = {
  user: userEndpointsMeta,
  tournaments: tournamentEndpointsMeta,
  fixtures: fixturesEndpointsMeta,
  highscores: highscoresEndpointsMeta,
}
