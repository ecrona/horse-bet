import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { BetEntity } from 'entities/bet'
import { TournamentEntity } from 'entities/tournament'
import { UserEntity } from 'entities/user'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  private saltRounds = 10

  constructor(
    @InjectRepository(BetEntity)
    private readonly betRepository: Repository<BetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TournamentEntity)
    private readonly tourmanentRepository: Repository<TournamentEntity>
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { active: true } })
  }

  async getUser(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({ email })
  }

  async getUserBets() {
    const users = await this.getUsers()
    const tournament = await this.tourmanentRepository.findOneOrFail({
      order: { id: 'DESC' },
    })
    const bets = await this.betRepository.find({
      tournamentId: tournament.id,
    })

    return users.map((user) => ({
      ...user,
      bets: bets.filter((bet) => bet.userEmail === user.email),
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
