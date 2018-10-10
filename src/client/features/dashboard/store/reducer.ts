import { Actions, ActionTypes } from 'store/actions'

enum ViewState {
  Fetching,
  PlacingBet,
  FinishedFetching
}

export interface State {
  viewState: ViewState
  data: Array<any>
}

const initialState = {
  viewState: ViewState.Fetching,
  data: []
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.dashboard.openBetModal:
      return {
        ...state
      }
    default:
      return state
  }
}
