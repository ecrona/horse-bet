import { User } from 'models/user'
import { Actions, ActionTypes } from '../actions'

export type State = Array<User>

const initialState = [
  { id: '1', email: '', name: 'Eddie' },
  { id: '2', email: '', name: 'Tommy' },
  { id: '3', email: '', name: 'Kevin' },
  { id: '4', email: '', name: 'Viktor' }
]

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.view.receiveApplicationData:
      return action.payload.users.slice()
    default:
      return state
  }
}
