import { FixtureWithPlacements } from '../models/fixture-with-placements'
import { Winner } from 'models/winner'
import { Placement } from 'models/placement'
import { Actions, ActionTypes } from 'store/actions'
import { BetModalState } from '../models/bet-modal-state'

export type State = {
  betModalState: BetModalState
  selectedFixture: FixtureWithPlacements
}

const initialState = {
  betModalState: BetModalState.Closed,
  selectedFixture: {
    id: '',
    competitionId: '',
    home: '',
    away: '',
    date: '',
    stage: '',
    winner: Winner.None,
    placements: [Placement.NotPlaced]
  }
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.dashboard.openBetModal:
      return {
        ...state,
        betModalState: BetModalState.Opened,
        selectedFixture: action.payload
      }
    case ActionTypes.dashboard.closeBetModal:
      return { ...state, betModalState: BetModalState.Closed }
    case ActionTypes.dashboard.requestPlaceBet:
      return { ...state, betModalState: BetModalState.PlacingBet }
    case ActionTypes.dashboard.receivePlaceBet:
      return { ...state, betModalState: BetModalState.Closed }
    default:
      return state
  }
}
