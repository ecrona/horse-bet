import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import * as passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from 'services/auth'

import * as GoogleStrategy from 'passport-google-oauth'

@Injectable()
export class GoogleJwtStrategy extends PassportStrategy(
  GoogleStrategy.OAuth2Strategy
) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        clientID:
          '819322914036-35v2lon8ubg5rjjh94p1j3e49p1ukasv.apps.googleusercontent.com',
        clientSecret: 'Dor48ryavMaCp4XUd0kNZLGr',
        callbackURL: 'http://localhost:3000/auth/google/callback'
      },
      (accessToken, refreshToken, profile, done) =>
        this.verify(accessToken, refreshToken, profile, done)
    )
  }

  public async verify(accessToken, refreshToken, profile, done) {
    try {
      const email = profile.emails[0].value
      const user = await this.authService.validateUser(email)

      if (!user) {
        throw new Error()
      }

      done(null, await this.authService.createToken(email))
    } catch (e) {
      return done(new UnauthorizedException(), false)
    }
  }
}
