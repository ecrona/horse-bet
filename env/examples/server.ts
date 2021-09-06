import { ServerEnv } from '@env/interfaces/server'
import { baseEnv } from './base'

export const serverEnv: ServerEnv = {
  ...baseEnv,
  authRedirectUrl: 'http://localhost:3000',
  authorizationSecret: 'secret',
  database: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'horseBet',
    synchronize: false,
    logging: true,
    entitiesDir: 'entities',
    migrationsDir: 'migrations',
  },
  email: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ecrona@gmail.com',
      pass: '',
    },
  },
}
