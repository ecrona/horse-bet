import { View } from 'models/view'
import { ActionTypes, Authenticate, ReceiveApplicationData } from './actions'

export type State = View

type Action = Authenticate | ReceiveApplicationData

export default function reducer(state = View.Splash, action: Action): State {
  switch (action.type) {
    case ActionTypes.authenticate:
      return View.Login
    case ActionTypes.receiveApplicationData:
      return View.Dashboard
    default:
      return state
  }
}
