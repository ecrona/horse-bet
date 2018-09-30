import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100, unique: true })
  displayName: string

  @Column({ length: 50, unique: true })
  username: string

  @Column({ length: 100, nullable: true })
  password: string
}
