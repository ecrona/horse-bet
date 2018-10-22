import { Fixture } from '@shared/models/fixture'
import { ThunkAction, ActionsUnion, createAction } from 'store'

export enum ActionTypes {
  requestFixtures = '[Dashboard] Request fixtures',
  receiveFixtures = '[Dashboard] Receive fixtures'
}

export const actions = {
  requestFixtures: () => createAction(ActionTypes.requestFixtures),
  receiveFixtures: (fixtures: Array<Fixture>) =>
    createAction(ActionTypes.receiveFixtures, fixtures)
}

export const getFixtures = (): ThunkAction => async (
  dispatch,
  getState,
  endpoints
) => {
  dispatch(actions.requestFixtures())
  dispatch(actions.receiveFixtures(await endpoints.dashboard.get()))
}

export type Actions = ActionsUnion<typeof actions>
