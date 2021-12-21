import * as path from 'path'
import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost
} from '@nestjs/common'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  public catch(exception: NotFoundExceptionFilter, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse()
    response.sendFile(path.join(`${__dirname}/../../../dist/client/index.html`))
  }
}
