import { View } from 'models/view'
import { Actions, ActionTypes } from '../actions'

export type State = View

export default function reducer(state = View.Splash, action: Actions): State {
  switch (action.type) {
    case ActionTypes.view.authenticate:
      return View.Login
    default:
      return state
  }
}
