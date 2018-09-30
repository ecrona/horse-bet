import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { UserEntity } from 'entities/user'
import { UserService } from './user'

@Injectable()
export class AuthService {
  private authenticatedUser: UserEntity

  constructor(private userService: UserService) {}

  public async createToken(id: number, username: string) {
    const expiresIn = 60 * 60
    const secretOrKey = 'secret'
    const user = { username }
    const token = jwt.sign(user, secretOrKey, { expiresIn })

    return { token }
  }

  public async validateUser(signedUser): Promise<void> {
    if (signedUser && signedUser.username) {
      this.authenticatedUser = await this.userService.getUserByUsername(
        signedUser.username
      )
    }
  }

  public getAuthenticatedUser(): Readonly<UserEntity> {
    return this.authenticatedUser
  }
}
