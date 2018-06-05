import {
  ActionTypes as ViewActionTypes,
  ReceiveApplicationData
} from '../view/actions'
import { Fixture } from 'models/fixture'

export type State = Array<Fixture>

type Action = ReceiveApplicationData

const initialState = [
  {
    id: '1',
    home: 'Liverpool',
    away: 'Real Madrid',
    date: '20180608',
    stage: 'Final',
    winner: 0
  },
  {
    id: '2',
    home: 'Roma',
    away: 'Liverpool',
    date: '20180603',
    stage: 'Semi finals',
    winner: 0
  },
  {
    id: '3',
    home: 'Real Madrid',
    away: 'Bayern Münich',
    date: '20180603',
    stage: 'Semi finals',
    winner: 0
  }
]

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ViewActionTypes.receiveApplicationData:
      return action.fixtures.slice()
    default:
      return state
  }
}
