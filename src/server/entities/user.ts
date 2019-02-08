import { Entity, Column, Index } from 'typeorm'

@Entity('users')
export class UserEntity {
  @Column()
  displayName: string

  @Column({ primary: true })
  email: string
}
