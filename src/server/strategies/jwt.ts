import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import * as passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from 'services/auth'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'secret'
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    )
    passport.use(this)
  }

  public async verify(req, payload, done) {
    await this.authService.validateUser(payload)
    const authenticatedUser = this.authService.getAuthenticatedUser()
    if (!authenticatedUser) {
      return done(new UnauthorizedException(), false)
    }
    done(null, payload)
  }
}
