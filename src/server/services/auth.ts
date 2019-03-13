import { Injectable } from '@nestjs/common'
import { UserEntity } from 'entities/user'
import * as jwt from 'jsonwebtoken'
import { UserService } from './user'

@Injectable()
export class AuthService {
  private authenticatedUser: UserEntity

  constructor(private userService: UserService) {}

  public async createToken(email: string) {
    const secretOrKey = 'secret'

    return jwt.sign({ email }, secretOrKey)
  }

  public async validateUser(email: string): Promise<UserEntity> {
    return await this.userService.getUserByEmail(email)
  }
}
