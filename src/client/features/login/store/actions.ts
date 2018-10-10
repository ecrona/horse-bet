import { ThunkAction } from 'store'
import { LoginMethod } from '../models/login-method'

export function authenticate(loginMethod: LoginMethod): ThunkAction {
  return async (dispatch, getState, firebase) => {
    switch (loginMethod) {
      case LoginMethod.Google:
        console.log('google auth')
        break
    }
  }
}
