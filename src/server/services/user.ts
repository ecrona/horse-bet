import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from 'entities/user'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  private saltRounds = 10

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ username })
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    user.password = await this.getHash(user.password)

    return this.userRepository.save(user)
  }

  async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds)
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
