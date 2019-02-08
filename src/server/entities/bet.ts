import { Entity, Column } from 'typeorm'
import { BetPlacement } from '@shared/models/bet-placement'

@Entity('bets')
export class BetEntity {
  @Column({ primary: true })
  homeTeam: string

  @Column({ primary: true })
  awayTeam: string

  @Column({ primary: true })
  userEmail: string

  @Column()
  placement: BetPlacement
}
