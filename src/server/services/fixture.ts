import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FixtureEntity } from 'entities/fixture'
import { BetEntity } from 'entities/bet'
import { BetPlacement } from '@shared/models/bet-placement'

@Injectable()
export class FixtureService {
  constructor(
    @InjectRepository(FixtureEntity)
    private readonly fixtureRepository: Repository<FixtureEntity>,
    @InjectRepository(BetEntity)
    private readonly betRepository: Repository<BetEntity>
  ) {}

  async getFixturesWithBets(email: string) {
    const fixtures = await this.fixtureRepository.find()
    const bets = await this.betRepository.find({
      userEmail: email
    })

    return fixtures.map(fixture => {
      const fixtureBet = bets.find(bet => bet.fixtureId === fixture.id)

      return {
        ...fixture,
        betPlacement: fixtureBet ? fixtureBet.placement : BetPlacement.NotPlaced
      }
    })
  }
}
