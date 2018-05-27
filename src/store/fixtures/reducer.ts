import { Fixture } from 'models/fixture'

export type State = Array<Fixture>

type Action = any

export default function reducer(
  state = [{ home: '', away: '', date: '', winner: 0 }],
  action: Action
): State {
  return state
}
