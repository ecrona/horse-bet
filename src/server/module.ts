import { serverEnv } from '@env/server'
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailModule } from 'commands/mail/module'
import { SyncModule } from 'commands/sync/module'
import { AdminModule } from 'modules/admin/module'
import { DashboardModule } from 'modules/dashboard/module'
import { HighscoresModule } from 'modules/highscores/module'
import { UserModule } from 'modules/user/module'
import { CommandModule } from 'nestjs-command'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: serverEnv.database.host,
      port: serverEnv.database.port,
      username: serverEnv.database.username,
      password: serverEnv.database.password,
      database: serverEnv.database.database,
      entities: [__dirname + `/${serverEnv.database.entitiesDir}/**/*.ts`],
      synchronize: serverEnv.database.synchronize,
      logging: serverEnv.database.logging,
      migrations: [`${serverEnv.database.migrationsDir}/*.js`],
      cli: {
        migrationsDir: serverEnv.database.migrationsDir,
      },
    }),
    MailerModule.forRoot({
      transport: serverEnv.email,
      defaults: {
        forceEmbeddedImages: true,
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    CommandModule,
    DashboardModule,
    HighscoresModule,
    UserModule,
    SyncModule,
    MailModule,
    AdminModule,
  ],
})
export class AppModule {}
