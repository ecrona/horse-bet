import { HighscoresEndpointsData } from '@shared/endpoints/highscores'
import { createMockPromise } from '../create-mock-promise'

export const highscoresMockEndpoints: HighscoresEndpointsData = {
  get: createMockPromise([
    { name: 'Kåse', me: false, score: 1, rank: 1 },
    { name: 'Eddie', me: true, score: 0, rank: 2 },
    { name: 'Virredirre', me: false, score: 0, rank: 2 }
  ])
}
