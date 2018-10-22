import { Fixture } from '@shared/models/fixture'
import { Actions, ActionTypes } from 'store/actions'

enum ViewState {
  Interactive,
  Fetching,
  PlacingBet
}

export interface State {
  viewState: ViewState
  fixtures: Array<Fixture>
}

const initialState = {
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
    case ActionTypes.dashboard.receiveFixtures:
      return {
        ...state,
        viewState: ViewState.Interactive,
        fixtures: action.payload
      }
    default:
      return state
  }
}
