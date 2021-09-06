import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tournaments')
export class TournamentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
