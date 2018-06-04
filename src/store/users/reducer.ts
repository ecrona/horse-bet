import { User } from 'models/user'
import {
  ActionTypes as ViewActionTypes,
  ReceiveBaseData
} from '../view/actions'

export type State = Array<User>

type Action = ReceiveBaseData

const initialState = [
  { name: 'Eddie' },
  { name: 'Tommy' },
  { name: 'Kevin' },
  { name: 'Viktor' }
]

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ViewActionTypes.receiveBaseData:
      return action.users.slice()
    default:
      return state
  }
}
