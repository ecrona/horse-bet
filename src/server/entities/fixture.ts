import { Entity, Column } from 'typeorm'
import { BetPlacement } from '@shared/models/bet-placement'
import { Round } from '@shared/models/round'

@Entity('fixtures')
export class FixtureEntity {
  @Column({ primary: true })
  awayTeam: string

  @Column({ primary: true })
  homeTeam: string

  @Column()
  round: Round

  @Column('timestamp')
  matchStart: string

  @Column()
  winner: BetPlacement
}
