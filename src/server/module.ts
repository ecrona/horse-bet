import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { serverEnv } from '@env/server'
import { EventModule } from 'modules/event/module'
import { UserModule } from 'modules/user/module'
import { UserService } from 'services/user'

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
    EventModule,
    UserModule
  ]
})
export class AppModule {}
