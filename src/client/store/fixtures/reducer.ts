import { Fixture } from 'models/fixture'
import { Actions, ActionTypes } from '../actions'

export type State = Array<Fixture>

const initialState = [
  {
    id: '1',
    competitionId: '',
    home: 'Liverpool',
    away: 'Real Madrid',
    date: '20180608',
    stage: 'Final',
    winner: 0
  },
  {
    id: '2',
    competitionId: '',
    home: 'Roma',
    away: 'Liverpool',
    date: '20180603',
    stage: 'Semi finals',
    winner: 0
  },
  {
    id: '3',
    competitionId: '',
    home: 'Real Madrid',
    away: 'Bayern Münich',
    date: '20180603',
    stage: 'Semi finals',
    winner: 0
  }
]

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.view.receiveApplicationData:
      return action.payload.fixtures.slice()
    default:
      return state
  }
}
