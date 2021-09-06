import { Controller, HttpCode, UseGuards } from '@nestjs/common'
import {
  GetHighscoresRequest,
  HighscoresEndpointsData,
  highscoresEndpointsMeta,
} from '@shared/endpoints/highscores'
import { Endpoints } from 'decorators/endpoints'
import { AuthGuard } from 'guards/auth'
import { HighscoresService } from './service'

@Controller()
@Endpoints(highscoresEndpointsMeta)
export class HighscoresController implements HighscoresEndpointsData {
  constructor(private readonly highscoresService: HighscoresService) {}

  @UseGuards(AuthGuard)
  @HttpCode(200)
  async get(payload: GetHighscoresRequest, request) {
    return await this.highscoresService.get(
      payload.tournamentId,
      request.locals.email
    )
  }
}
