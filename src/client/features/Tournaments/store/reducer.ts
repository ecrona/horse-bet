import { Tournament } from '@client/../shared/models/tournament'
import { Actions, ActionTypes } from 'store/actions'
import { ViewState } from '../models/view-state'

export interface State {
  list: Array<Tournament>
  viewState: ViewState
}

const initialState: State = {
  list: [],
  viewState: ViewState.Fetching
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.tournaments.requestTournaments:
      return {
        ...state,
        viewState: ViewState.Fetching
      }
    case ActionTypes.tournaments.receiveTournaments:
      return {
        ...state,
        list: action.payload,
        viewState: ViewState.Tournaments
      }
    default:
      return state
  }
}
