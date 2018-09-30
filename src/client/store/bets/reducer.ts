import { Bet } from 'models/bet'
import { Placement } from 'models/placement'
import { Winner } from 'models/winner'
import { Actions, ActionTypes } from '../actions'

export type State = Array<Bet>

const initialState: State = [
  {
    id: '',
    userId: 'Eddie',
    fixtureId: 'Liverpool',
    placement: 3
  },
  {
    id: '',
    userId: 'Tommy',
    fixtureId: 'Liverpool',
    placement: 3
  },
  {
    id: '',
    userId: 'Kevin',
    fixtureId: 'Liverpool',
    placement: 3
  },
  {
    id: '',
    userId: 'Viktor',
    fixtureId: 'Liverpool',
    placement: 4
  },
  {
    id: '',
    userId: 'Eddie',
    fixtureId: 'Roma',
    placement: 1
  },
  {
    id: '',
    userId: 'Tommy',
    fixtureId: 'Roma',
    placement: 3
  },
  {
    id: '',
    userId: 'Kevin',
    fixtureId: 'Roma',
    placement: 3
  },
  {
    id: '',
    userId: 'Viktor',
    fixtureId: 'Roma',
    placement: 4
  },
  {
    id: '',
    userId: 'Eddie',
    fixtureId: 'Real Madrid',
    placement: 1
  },
  {
    id: '',
    userId: 'Tommy',
    fixtureId: 'Real Madrid',
    placement: 2
  },
  {
    id: '',
    userId: 'Kevin',
    fixtureId: 'Real Madrid',
    placement: 3
  },
  {
    id: '',
    userId: 'Viktor',
    fixtureId: 'Real Madrid',
    placement: 1
  }
]

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.view.receiveApplicationData:
      return action.payload.bets.slice()
    case ActionTypes.dashboard.receivePlaceBet:
      return state
        .filter(
          bet =>
            bet.fixtureId !== action.payload.id ||
            bet.userId !== action.payload.userId
        )
        .concat([
          {
            id: action.payload.id,
            userId: action.payload.userId,
            fixtureId: action.payload.fixture.id,
            placement:
              action.payload.winner === Winner.Home
                ? Placement.Home
                : Placement.Away
          }
        ])
    default:
      return state
  }
}
