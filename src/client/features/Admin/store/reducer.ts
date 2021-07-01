import { Actions, ActionTypes } from 'store/actions'

export enum ViewState {
  None,
  Fetching,
}

export interface State {
  viewState: ViewState
}

const initialState: State = {
  viewState: ViewState.Fetching,
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.admin.requestUpdateFixture:
      return {
        ...state,
        viewState: ViewState.Fetching
      }
    case ActionTypes.admin.receiveUpdateFixture:
      return {
        ...state,
        viewState: ViewState.None
      }
    default:
      return state
  }
}
