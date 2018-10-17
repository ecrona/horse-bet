import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn
} from 'typeorm'
import { Round } from '@shared/models/round'
import { BetEntity } from './bet'

@Entity('fixtures')
export class FixtureEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  awayTeam: string

  @Column()
  homeTeam: string

  @Column('timestamp')
  matchStart: string

  @Column()
  round: Round
}
