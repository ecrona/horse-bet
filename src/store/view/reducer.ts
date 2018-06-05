import { View } from 'models/view'
import { ActionTypes, ReceiveApplicationData } from './actions'

export type State = View

type Action = ReceiveApplicationData

export default function reducer(state = View.Splash, action: Action): State {
  switch (action.type) {
    case ActionTypes.receiveApplicationData:
      return View.Dashboard
    default:
      return state
  }
}
