import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BetEntity } from 'entities/bet'
import { UserEntity } from 'entities/user'
import { authenticate } from 'passport'
import { AuthService } from 'services/auth'
import { UserService } from 'services/user'
import { GoogleJwtStrategy } from 'strategies/google-plus'
import { UserController } from './controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([BetEntity]),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [AuthService, UserService /*JwtStrategy*/, GoogleJwtStrategy],
  controllers: [UserController],
  exports: [AuthService]
})
export class UserModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        authenticate('google', {
          scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/userinfo.email'
          ],
          session: false
        }),
        (req, res) => {
          console.log(req, res.req.user)
          res.cookie('token', res.req.user)
          res.redirect('/')
        }
      )
      .forRoutes('/auth/google')

    consumer
      .apply(
        authenticate('google', {
          session: false
        }),
        (req, res) => {
          console.log('san')
          res.redirect('/')
        }
      )
      .forRoutes('/auth/google/callback')
  }
}
