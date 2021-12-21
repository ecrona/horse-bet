import { Highscore } from '@shared/models/highscore'
import { ActionsUnion, createAction, ThunkAction } from '../../../store'

export enum ActionTypes {
  requestHighscores = '[Highscore] Request highscores',
  receiveHighscores = '[Highscore] Receive highscores',
  requestPlaceBet = '[Highscore] Request place bet',
  receivePlaceBet = '[Highscore] Receive place bet',
  toggleViewState = '[Highscore] Toggle view state',
}

export const actions = {
  requestHighscores: () => createAction(ActionTypes.requestHighscores),
  receiveHighscores: (highscores: Array<Highscore>) =>
    createAction(ActionTypes.receiveHighscores, highscores),
}

export const fetchHighscores =
  (tournamentId: number): ThunkAction =>
  async (dispatch, getState, endpoints) => {
    dispatch(actions.requestHighscores())
    dispatch(
      actions.receiveHighscores(
        await endpoints.highscores.get({ tournamentId })
      )
    )
  }

export type Actions = ActionsUnion<typeof actions>
