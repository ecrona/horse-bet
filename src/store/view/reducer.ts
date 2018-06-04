import { View } from 'models/view'
import { ActionTypes, ReceiveBaseData } from './actions'

export type State = View

type Action = ReceiveBaseData

export default function reducer(state = View.Splash, action: Action): State {
  switch (action.type) {
    case ActionTypes.receiveBaseData:
      return View.Dashboard
    default:
      return state
  }
}
