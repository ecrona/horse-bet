import { ThunkAction, ActionsUnion, createAction } from 'store'

export enum ActionTypes {
  openBetModal = '[Dashboard] Open bet modal'
}

export const actions = {
  openBetModal: () => createAction(ActionTypes.openBetModal)
}

export type Actions = ActionsUnion<typeof actions>
