import { BaseEnv } from './base'

export interface ServerEnv extends BaseEnv {
  database: {
    type: string
    host: string
    port: number
    username: string
    password: string
    database: string
    entities: Array<string>
    synchronize: boolean
    migrations: Array<string>
    cli: {
      migrationsDir: string
    }
  }
}
