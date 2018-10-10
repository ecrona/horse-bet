import { ServerEnv } from '@env/interfaces/server'
import { baseEnv } from './base'

export const serverEnv: ServerEnv = {
  ...baseEnv,
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'enjoy_food',
    entities: [__dirname + '/entities/**/*.ts'],
    synchronize: false,
    migrations: ['migrations/*.ts'],
    cli: {
      migrationsDir: 'migrations'
    }
  }
}
