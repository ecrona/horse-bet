import { Controller, HttpCode, UseGuards } from '@nestjs/common'
import {
  UserEndpointsData,
  userEndpointsMeta,
  LoginRequest,
  LoginResponse
} from '@shared/endpoints/user'
import { Endpoints } from 'decorators/endpoints'
import { AuthGuard } from 'guards/auth'
import { AuthService } from 'services/auth'
import { UserService } from 'services/user'

@Controller()
@Endpoints(userEndpointsMeta)
export class UserController implements UserEndpointsData {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UseGuards(new AuthGuard())
  @HttpCode(200)
  async login(credentials, request) {
    console.log(request.locals)
  }
}
