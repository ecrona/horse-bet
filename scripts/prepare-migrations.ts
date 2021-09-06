import * as fs from 'fs'
import { serverEnv } from '../env/server'

fs.writeFile(
  'ormconfig.json',
  JSON.stringify({
    type: 'mysql',
    host: serverEnv.database.host,
    port: serverEnv.database.port,
    username: serverEnv.database.username,
    password: serverEnv.database.password,
    database: serverEnv.database.database,
    entities: [
      __dirname + `/../src/server/${serverEnv.database.entitiesDir}/**/*.ts`,
    ],
    synchronize: true,
    logging: serverEnv.database.logging,
    migrations: [`${serverEnv.database.migrationsDir}/*.ts`],
    cli: {
      migrationsDir: serverEnv.database.migrationsDir,
    },
  }),
  (err) => {
    if (err) {
      throw new Error('Could not save ormconfig.json')
    }
  }
)
