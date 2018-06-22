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

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ViewActionTypes.receiveApplicationData:
      return action.bets.slice()
    case DashboardActionTypes.receivePlaceBet:
      return state.filter(bet => bet.fixtureId !== action.fixture.id).concat([
        {
          id: '',
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
