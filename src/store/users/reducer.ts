import { User } from 'models/user'

export type State = Array<User>

type Action = any

const initialState = [
  { name: 'Eddie' },
  { name: 'Tommy' },
  { name: 'Kevin' },
  { name: 'Viktor' }
]

export default function reducer(state = initialState, action: Action): State {
  return state
}
