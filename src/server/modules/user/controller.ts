import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode
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

@Controller()
@Endpoints(userEndpointsMeta)
export class UserController implements UserEndpointsData {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @HttpCode(200)
  async login(@Body() credentials: LoginRequest): Promise<LoginResponse> {
    const user = await this.userService.getUserByUsername(credentials.username)

    if (user) {
      if (
        await this.userService.compareHash(credentials.password, user.password)
      ) {
        return await this.authService.createToken(user.id, user.username)
      }
    }

    throw new BadRequestException()
  }
}
