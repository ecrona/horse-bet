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
