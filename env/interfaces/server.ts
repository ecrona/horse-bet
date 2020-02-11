import { BaseEnv } from './base';

export interface ServerEnv extends BaseEnv {
  authRedirectUrl: string
  authorizationSecret: string
  database: {
    host: string
    port: number
    username: string
    password: string
    database: string
    synchronize: boolean
    logging: boolean
    entitiesDir: string
    migrationsDir: string
  }
  email: {
    host: string
    port: number
    secure: boolean
    auth: {
      user: string
      pass: string
    }
  }
}
