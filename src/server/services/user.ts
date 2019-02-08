import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { BetEntity } from 'entities/bet'
import { UserEntity } from 'entities/user'

@Injectable()
export class UserService {
  private saltRounds = 10

  constructor(
    @InjectRepository(BetEntity)
    private readonly betRepository: Repository<BetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async getUserBets() {
    const users = await this.getUsers()
    const bets = await this.betRepository.find()

    return users.map(user => ({
      ...user,
      bets: bets.filter(bet => bet.userEmail === user.email)
    }))
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ email })
  }

  async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds)
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
