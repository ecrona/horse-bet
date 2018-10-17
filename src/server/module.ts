import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { serverEnv } from '@env/server'
import { UserModule } from 'modules/user/module'
import { DashboardModule } from 'modules/dashboard/module'

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
    UserModule,
    DashboardModule
  ]
})
export class AppModule {}
