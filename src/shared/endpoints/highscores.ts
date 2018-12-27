import { Endpoint, EndpointsMeta, RequestMethod } from '@shared/utils/endpoints'
import { Highscore } from '@shared/models/highscore'

interface HighscoresBaseEndpoints {
  get: any
}

export interface HighscoresEndpointsData extends HighscoresBaseEndpoints {
  get: Endpoint<void, Array<Highscore>>
}

export const highscoresEndpointsMeta: EndpointsMeta<HighscoresBaseEndpoints> = {
  get: { route: '/highscores', requestMethod: RequestMethod.Get }
}
