import { ThunkAction } from 'utils/redux'
import { LoginMethod } from '../models/login-method'

export function authenticate(loginMethod: LoginMethod): ThunkAction {
  return async (dispatch, getState, firebase) => {
    console.log(firebase, loginMethod)
    switch (loginMethod) {
      case LoginMethod.Google:
        firebase.authenticate()
        break
    }
  }
}
