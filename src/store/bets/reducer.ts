import {
  ActionTypes as DashboardActionTypes,
  ReceivePlaceBet
} from 'features/dashboard/store/actions'
import {
  ActionTypes as ViewActionTypes,
  ReceiveApplicationData
} from '../view/actions'
import { Bet } from 'models/bet'
import { Placement } from 'models/placement'
import { Winner } from 'models/winner'

export type State = Array<Bet>

type Action = ReceiveApplicationData | ReceivePlaceBet

const initialState: State = [
  {
    userId: 'Eddie',
    fixtureId: 'Liverpool',
    placement: 3
  },
  {
    userId: 'Tommy',
    fixtureId: 'Liverpool',
    placement: 3
  },
  {
    userId: 'Kevin',
    fixtureId: 'Liverpool',
    placement: 3
  },
  {
    userId: 'Viktor',
    fixtureId: 'Liverpool',
    placement: 4
  },
  {
    userId: 'Eddie',
    fixtureId: 'Roma',
    placement: 1
  },
  {
    userId: 'Tommy',
    fixtureId: 'Roma',
    placement: 3
  },
  {
    userId: 'Kevin',
    fixtureId: 'Roma',
    placement: 3
  },
  {
    userId: 'Viktor',
    fixtureId: 'Roma',
    placement: 4
  },
  {
    userId: 'Eddie',
    fixtureId: 'Real Madrid',
    placement: 1
  },
  {
    userId: 'Tommy',
    fixtureId: 'Real Madrid',
    placement: 2
  },
  {
    userId: 'Kevin',
    fixtureId: 'Real Madrid',
    placement: 3
  },
  {
    userId: 'Viktor',
    fixtureId: 'Real Madrid',
    placement: 1
  }
]

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ViewActionTypes.receiveApplicationData:
      return action.bets.slice()
    case DashboardActionTypes.receivePlaceBet:
      return state.filter(bet => bet.fixtureId !== action.fixture.id).concat([
        {
          userId: '5dvAPb52p1hDIJgXBvTS',
          fixtureId: action.fixture.id,
          placement:
            action.winner === Winner.Home ? Placement.Home : Placement.Away
        }
      ])
    default:
      return state
  }
}
