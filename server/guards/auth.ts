import {
  CanActivate,
  ExecutionContext,
  Inject,
  SetMetadata,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import * as jwt from 'jsonwebtoken'
import { UserService } from 'services/user'

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp()
    const request = httpContext.getRequest()
    const admin = this.reflector.get<string[]>('admin', context.getHandler())
    const token = request.cookies.token

    try {
      const { email } = await jwt.verify(token, 'secret')

      if (admin && !(await this.userService.getUser(email)).admin) {
        return false
      }

      request.locals = { email }
      return true
    } catch (e) {
      return false
    }
  }
}

export const AdminRole = () => SetMetadata('admin', true)
