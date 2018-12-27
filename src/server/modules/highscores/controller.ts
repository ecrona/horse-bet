import {
  Controller,
  HttpCode,
  UseGuards,
  HttpStatus,
  Response,
  HttpException
} from '@nestjs/common'
import {
  HighscoresEndpointsData,
  highscoresEndpointsMeta
} from '@shared/endpoints/highscores'
import { Endpoints } from 'decorators/endpoints'
import { AuthGuard } from 'guards/auth'
import { HighscoresService } from './service'

@Controller()
@Endpoints(highscoresEndpointsMeta)
export class HighscoresController implements HighscoresEndpointsData {
  constructor(private readonly highscoresService: HighscoresService) {}

  @UseGuards(new AuthGuard())
  @HttpCode(200)
  async get(credentials: void, request) {
    return await this.highscoresService.get(request.locals.email)
  }
}
