import { Bet } from 'models/bet'

export type State = Array<Bet>

type Action = any

export default function reducer(
  state = [{ user: '', away: '', home: '', date: '', winner: 0 }],
  action: Action
): State {
  return state
}
