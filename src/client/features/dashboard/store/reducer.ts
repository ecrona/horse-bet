import { Round } from '@shared/models/round'
import { Actions, ActionTypes } from 'store/actions'

enum ViewState {
  Fetching,
  PlacingBet,
  FinishedFetching
}

export interface State {
  viewState: ViewState
  data: Array<Round>
}

const initialState = {
  viewState: ViewState.Fetching,
  data: []
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.dashboard.requestData:
      return {
        ...state,
        viewState: ViewState.Fetching
      }
    case ActionTypes.dashboard.receiveData:
      return {
        ...state,
        viewState: ViewState.FinishedFetching,
        data: action.payload
      }
    default:
      return state
  }
}
