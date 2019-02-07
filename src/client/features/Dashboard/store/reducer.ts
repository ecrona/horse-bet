import { Fixture } from '@shared/models/fixture'
import { Actions, ActionTypes } from 'store/actions'
import { ViewState } from '../models/view-state'
import { toggleViewState } from './helpers'

export interface State {
  viewState: ViewState
  fixtures: Array<Fixture>
}

const initialState: State = {
  viewState: ViewState.Fetching,
  fixtures: []
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.dashboard.requestFixtures:
      return {
        ...state,
        viewState: ViewState.Fetching
      }
    case ActionTypes.dashboard.requestPlaceBet:
      return {
        ...state,
        viewState: ViewState.PlacingBet
      }
    case ActionTypes.dashboard.receiveFixtures:
      return {
        ...state,
        viewState: ViewState.Bets,
        fixtures: action.payload
      }
    case ActionTypes.dashboard.receivePlaceBet:
      return {
        ...state,
        viewState: ViewState.Bets,
        fixtures: state.fixtures.map(
          fixture =>
            fixture.awayTeam.name === action.payload.awayTeam &&
            fixture.homeTeam.name === action.payload.homeTeam
              ? { ...fixture, betPlacement: action.payload.placement }
              : fixture
        )
      }
    case ActionTypes.dashboard.toggleViewState:
      return {
        ...state,
        viewState: toggleViewState(state.viewState)
      }
    default:
      return state
  }
}
