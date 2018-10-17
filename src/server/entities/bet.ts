import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { BetPlacement } from '@shared/models/bet-placement'
import { FixtureEntity } from './fixture'
import { UserEntity } from './user'

@Entity('bets')
export class BetEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fixtureId: number

  @Column()
  userEmail: string

  @Column()
  placement: BetPlacement
}
