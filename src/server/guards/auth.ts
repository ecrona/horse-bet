import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp()
    const [request, response] = [
      httpContext.getRequest(),
      httpContext.getResponse()
    ]
    const token = request.cookies.token

    try {
      response.locals.email = (await jwt.verify(token, 'secret')).email
      return true
    } catch (e) {
      return false
    }
  }
}
