import { ThunkAction, ActionsUnion, createAction } from 'store'
import { AuthenticationError } from 'models/authentication-error'

export enum ActionTypes {
  authenticate = '[Common] Authenticate',
  setDate = '[Common] Set date'
}

export const actions = {
  authenticate: (error: AuthenticationError) =>
    createAction(ActionTypes.authenticate, error),
  setDate: (date: string) => createAction(ActionTypes.setDate, date)
}

export const startDateUpdater = (): ThunkAction => dispatch => {}

export type Actions = ActionsUnion<typeof actions>
