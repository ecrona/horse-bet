import { ThunkAction, ActionsUnion, createAction } from 'store'
import { Round } from '@shared/models/round'

export enum ActionTypes {
  requestData = '[Dashboard] Request data',
  receiveData = '[Dashboard] Receive data'
}

export const actions = {
  requestData: () => createAction(ActionTypes.requestData),
  receiveData: (data: Array<Round>) =>
    createAction(ActionTypes.receiveData, data)
}

export const getData = (): ThunkAction => {
  return async (dispatch, getState, endpoints) => {
    dispatch(actions.requestData())
    const data = await endpoints.dashboard.get()
    dispatch(actions.receiveData(await endpoints.dashboard.get()))
  }
}

export type Actions = ActionsUnion<typeof actions>
