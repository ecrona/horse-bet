import { Fixture } from 'models/fixture'

export type State = Array<Fixture>

type Action = any

const initialState = [
  {
    home: 'Liverpool',
    away: 'Real Madrid',
    date: '20180608',
    stage: 'Final',
    winner: 0
  },
  {
    home: 'Roma',
    away: 'Liverpool',
    date: '20180603',
    stage: 'Semi finals',
    winner: 0
  },
  {
    home: 'Real Madrid',
    away: 'Bayern Münich',
    date: '20180603',
    stage: 'Semi finals',
    winner: 0
  }
]

export default function reducer(state = initialState, action: Action): State {
  return state
}
