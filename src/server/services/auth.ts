import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { UserEntity } from 'entities/user'
import { UserService } from './user'

@Injectable()
export class AuthService {
  private authenticatedUser: UserEntity

  constructor(private userService: UserService) {}

  public async createToken(email: string) {
    const expiresIn = 60 * 60
    const secretOrKey = 'secret'

    return jwt.sign({ email }, secretOrKey, { expiresIn })
  }

  public async validateUser(email: string): Promise<UserEntity> {
    return await this.userService.getUserByEmail(email)
  }
}
