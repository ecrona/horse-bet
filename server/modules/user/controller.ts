import { Controller, HttpCode, UseGuards } from '@nestjs/common'
import { UserEndpointsData, userEndpointsMeta } from '@shared/endpoints/user'
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

  @UseGuards(AuthGuard)
  @HttpCode(200)
  async login(credentials, request) {
    console.log(request.locals)
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  async me(credentials, request) {
    const { admin } = await this.userService.getUser(request.locals.email)
    return { admin }
  }
}
