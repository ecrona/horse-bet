import { Bet } from 'models/bet'
import { FixtureWithPlacements } from '../models/fixture-with-placements'
import { Winner } from 'models/winner'
import {
  ActionTypes,
  OpenBetModalAction,
  CloseBetModalAction,
  RequestPlaceBet,
  ReceivePlaceBet
} from './actions'
import { Placement } from 'models/placement'
import { BetModalState } from '../models/bet-modal-state'

export type State = {
  betModalState: BetModalState
  selectedFixture: FixtureWithPlacements
}

type Action =
  | OpenBetModalAction
  | CloseBetModalAction
  | RequestPlaceBet
  | ReceivePlaceBet

const initialState = {
  betModalState: BetModalState.Closed,
  selectedFixture: {
    id: '',
    home: '',
    away: '',
    date: '',
    stage: '',
    winner: Winner.None,
    placements: [Placement.NotPlaced]
  }
}

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.openBetModal:
      return {
        ...state,
        betModalState: BetModalState.Opened,
        selectedFixture: action.fixture
      }
    case ActionTypes.closeBetModal:
      return { ...state, betModalState: BetModalState.Closed }
    case ActionTypes.requestPlaceBet:
      return { ...state, betModalState: BetModalState.PlacingBet }
    case ActionTypes.receivePlaceBet:
      return { ...state, betModalState: BetModalState.Closed }
    default:
      return state
  }
}
