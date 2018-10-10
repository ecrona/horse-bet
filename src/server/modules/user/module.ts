import { Module, MiddlewareConsumer, MiddlewareFunction } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { authenticate } from 'passport'
import { UserEntity } from 'entities/user'
import { AuthService } from 'services/auth'
import { UserService } from 'services/user'
import { JwtStrategy } from 'strategies/jwt'
import { GoogleJwtStrategy } from 'strategies/google-plus'
import { UserController } from './controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
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
