import { Actions, ActionTypes } from 'store/actions'
import { AuthenticationError } from 'models/authentication-error'

export interface State {
  error: AuthenticationError
}

const initialState = {
  error: AuthenticationError.None
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.view.authenticate:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
