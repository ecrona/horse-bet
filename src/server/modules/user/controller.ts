import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  UseGuards,
  Req,
  Query
} from '@nestjs/common'
import {
  UserEndpointsData,
  userEndpointsMeta,
  LoginRequest,
  LoginResponse
} from '@shared/endpoints/user'
import { Endpoints } from 'decorators/endpoints'
import { AuthService } from 'services/auth'
import { UserService } from 'services/user'

import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp()
    const [request, response] = [
      httpContext.getRequest(),
      httpContext.getResponse()
    ]
    const token = request.cookies.token

    console.log(token)

    try {
      response.locals.email = (await jwt.verify(token, 'secret')).email
      return true
    } catch (e) {
      return false
    }
  }
}

const Deco = () => (target, key, index) => {
  // console.log(target, key, index)
}

@Controller()
@Endpoints(userEndpointsMeta)
export class UserController implements UserEndpointsData {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UseGuards(new AuthGuard())
  @HttpCode(200)
  async login(credentials, response = null) {
    console.log(response.locals)
    return { test: 'hej' }
  }

  authGoogle(@Deco() test) {
    return 'hej'
  }

  authGoogleCallback(a, b) {
    console.log(a, b)
  }
}
