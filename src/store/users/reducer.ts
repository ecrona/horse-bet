import {
  ActionTypes as ViewActionTypes,
  ReceiveApplicationData
} from '../view/actions'
import { User } from 'models/user'

export type State = Array<User>

type Action = ReceiveApplicationData

const initialState = [
  { id: '1', email: '', name: 'Eddie' },
  { id: '2', email: '', name: 'Tommy' },
  { id: '3', email: '', name: 'Kevin' },
  { id: '4', email: '', name: 'Viktor' }
]

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ViewActionTypes.receiveApplicationData:
      return action.users.slice()
    default:
      return state
  }
}
