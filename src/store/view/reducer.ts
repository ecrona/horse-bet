import { View } from 'models/view'

export type State = View

type Action = any

export default function reducer(state = View.Dashboard, action: Action): State {
  return state
}
