import { MatchWinner } from '@shared/models/match-winner'
import { Round } from '@shared/models/round'
import { Column, Entity } from 'typeorm'

@Entity('fixtures')
export class FixtureEntity {
  @Column({ primary: true })
  tournamentId: number

  @Column({ primary: true })
  awayTeam: string

  @Column({ primary: true })
  homeTeam: string

  @Column()
  round: Round

  @Column({ type: 'timestamp', nullable: true })
  firstMatchStart: Date

  @Column({ type: 'timestamp', nullable: true })
  secondMatchStart: Date

  @Column()
  matchWinner: MatchWinner

  @Column()
  score: string

  @Column({ type: 'timestamp', nullable: true })
  lastSync: string
}
