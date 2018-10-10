import { ThunkAction, ActionsUnion, createAction } from 'store'
import { AuthenticationError } from 'models/authentication-error'

export enum ActionTypes {
  authenticate = '[View] Authenticate',
  receiveApplicationData = '[View] Receive base data'
}

export const actions = {
  authenticate: (error: AuthenticationError) =>
    createAction(ActionTypes.authenticate, error)
}

export type Actions = ActionsUnion<typeof actions>
