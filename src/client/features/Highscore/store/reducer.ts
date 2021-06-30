import { Highscore } from '@shared/models/highscore'
import { Actions, ActionTypes } from 'store/actions'
import { ViewState } from '../models/view-state'

export interface State {
  viewState: ViewState
  highscores: Array<Highscore>
}

const initialState: State = {
  viewState: ViewState.Fetching,
  highscores: []
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.highscore.requestHighscores:
      return {
        ...state,
        viewState: ViewState.Fetching
      }
    case ActionTypes.highscore.receiveHighscores:
      return {
        ...state,
        viewState: ViewState.Highscores,
        highscores: action.payload
      }
    default:
      return state
  }
}
