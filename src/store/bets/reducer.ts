import { Bet } from 'models/bet'
import {
  ActionTypes as DashboardActionTypes,
  ReceivePlaceBet
} from 'features/dashboard/store/actions'
import { Placement } from 'models/placement'
import { Winner } from 'models/winner'

export type State = Array<Bet>

type Action = ReceivePlaceBet

const initialState: State = [
  {
    user: 'Eddie',
    home: 'Liverpool',
    away: 'Real Madrid',
    date: '20180608',
    placement: 3
  },
  {
    user: 'Tommy',
    home: 'Liverpool',
    away: 'Real Madrid',
    date: '20180608',
    placement: 3
  },
  {
    user: 'Kevin',
    home: 'Liverpool',
    away: 'Real Madrid',
    date: '20180608',
    placement: 3
  },
  {
    user: 'Viktor',
    home: 'Liverpool',
    away: 'Real Madrid',
    date: '20180608',
    placement: 4
  },
  {
    user: 'Eddie',
    home: 'Roma',
    away: 'Liverpool',
    date: '20180603',
    placement: 1
  },
  {
    user: 'Tommy',
    home: 'Roma',
    away: 'Liverpool',
    date: '20180603',
    placement: 3
  },
  {
    user: 'Kevin',
    home: 'Roma',
    away: 'Liverpool',
    date: '20180603',
    placement: 3
  },
  {
    user: 'Viktor',
    home: 'Roma',
    away: 'Liverpool',
    date: '20180603',
    placement: 4
  },
  {
    user: 'Eddie',
    home: 'Real Madrid',
    away: 'Bayern Münich',
    date: '20180603',
    placement: 1
  },
  {
    user: 'Tommy',
    home: 'Real Madrid',
    away: 'Bayern Münich',
    date: '20180603',
    placement: 2
  },
  {
    user: 'Kevin',
    home: 'Real Madrid',
    away: 'Bayern Münich',
    date: '20180603',
    placement: 3
  },
  {
    user: 'Viktor',
    home: 'Real Madrid',
    away: 'Bayern Münich',
    date: '20180603',
    placement: 1
  }
]

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case DashboardActionTypes.receivePlaceBet:
      return state.map(
        bet =>
          bet.home === action.fixture.home &&
          bet.away === action.fixture.away &&
          bet.date === action.fixture.date
            ? { ...bet, placement: +action.winner }
            : bet
      )
    default:
      return state
  }
}
