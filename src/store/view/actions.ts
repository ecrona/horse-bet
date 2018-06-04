import firebase from 'utils/firebase'
import { Action, ThunkAction } from 'utils/redux'
import { User } from 'models/user'

export enum ActionTypes {
  receiveBaseData = '[View] Receive base data'
}

export class ReceiveBaseData implements Action {
  public readonly type = ActionTypes.receiveBaseData
  constructor(public users: Array<User>) {}
}

export function load(): ThunkAction {
  return async (dispatch, getState, endpoints) => {
    await firebase.init()
    const users = await endpoints.get('users')
    dispatch(new ReceiveBaseData(users))
  }
}
