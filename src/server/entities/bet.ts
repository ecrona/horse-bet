import { BetPlacement } from '@shared/models/bet-placement'
import { Column, Entity } from 'typeorm'

@Entity('bets')
export class BetEntity {
  @Column({ primary: true })
  tournamentId: number

  @Column({ primary: true })
  homeTeam: string

  @Column({ primary: true })
  awayTeam: string

  @Column({ primary: true })
  userEmail: string

  @Column()
  placement: BetPlacement
}
