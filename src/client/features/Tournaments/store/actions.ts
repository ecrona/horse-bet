import { Tournament } from '@client/../shared/models/tournament'
import { ActionsUnion, createAction, ThunkAction } from 'store'

export enum ActionTypes {
  requestTournaments = '[Tournaments] Request tournaments',
  receiveTournaments = '[Tournaments] Receive tournaments',
}

export const actions = {
  requestTournaments: () => createAction(ActionTypes.requestTournaments),
  receiveTournaments: (tournaments: Array<Tournament>) =>
    createAction(ActionTypes.receiveTournaments, tournaments)
}

export const getTournaments = (): ThunkAction => async (
  dispatch,
  getState,
  endpoints
) => {
  dispatch(actions.requestTournaments())
  dispatch(actions.receiveTournaments(await endpoints.tournaments.getAll()))
}
export type Actions = ActionsUnion<typeof actions>
