import { ActionTypes, Authenticate } from 'store/view/actions'
import { AuthenticationError } from 'models/authentication-error'

export type State = {
  error: AuthenticationError
}

type Action = Authenticate

const initialState = {
  error: AuthenticationError.None
}

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.authenticate:
      return { ...state, error: action.error }
    default:
      return state
  }
}
