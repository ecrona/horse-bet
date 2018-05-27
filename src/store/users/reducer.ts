import { User } from 'models/user'

export type State = Array<User>

type Action = any

export default function reducer(state = [{ name: '' }], action: Action): State {
  return state
}
