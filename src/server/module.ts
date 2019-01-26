import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommandModule } from 'nestjs-command'
import { serverEnv } from '@env/server'
import { DashboardModule } from 'modules/dashboard/module'
import { HighscoresModule } from 'modules/highscores/module'
import { UserModule } from 'modules/user/module'
import { SyncModule } from 'commands/sync/module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: serverEnv.database.host,
      port: serverEnv.database.port,
      username: serverEnv.database.username,
      password: serverEnv.database.password,
      database: serverEnv.database.database,
      entities: [__dirname + '/entities/**/*.ts'],
      synchronize: true,
      logging: true,
      migrations: ['migration/*.js'],
      cli: {
        migrationsDir: 'migration'
      }
    }),
    CommandModule,
    DashboardModule,
    HighscoresModule,
    UserModule,
    SyncModule
  ]
})
export class AppModule {}
