import { Highscore } from '@shared/models/highscore'
import { Endpoint, EndpointsMeta, RequestMethod } from '@shared/utils/endpoints'

export interface GetHighscoresRequest {
  tournamentId: number
}

interface HighscoresBaseEndpoints {
  get: any
}

export interface HighscoresEndpointsData extends HighscoresBaseEndpoints {
  get: Endpoint<GetHighscoresRequest, Array<Highscore>>
}

export const highscoresEndpointsMeta: EndpointsMeta<HighscoresBaseEndpoints> = {
  get: { route: '/highscores', requestMethod: RequestMethod.Get },
}
