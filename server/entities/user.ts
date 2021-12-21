import { Column, Entity } from 'typeorm'

@Entity('users')
export class UserEntity {
  @Column()
  displayName: string

  @Column({ primary: true })
  email: string

  @Column({ default: false })
  admin: boolean

  @Column({ default: true })
  active: boolean
}
