import { BetPlacement } from '@shared/models/bet-placement'
import { Fixture } from '@shared/models/fixture'
import { ThunkAction, ActionsUnion, createAction } from 'store'

export enum ActionTypes {
  requestFixtures = '[Dashboard] Request fixtures',
  receiveFixtures = '[Dashboard] Receive fixtures',
  requestPlaceBet = '[Dashboard] Request place bet',
  receivePlaceBet = '[Dashboard] Receive place bet',
  toggleViewState = '[Dashboard] Toggle view state'
}

export const actions = {
  requestFixtures: () => createAction(ActionTypes.requestFixtures),
  receiveFixtures: (fixtures: Array<Fixture>) =>
    createAction(ActionTypes.receiveFixtures, fixtures),
  requestPlaceBet: () => createAction(ActionTypes.requestPlaceBet),
  receivePlaceBet: (
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) =>
    createAction(ActionTypes.receivePlaceBet, {
      awayTeam,
      homeTeam,
      placement
    }),
  toggleViewState: () => createAction(ActionTypes.toggleViewState)
}

export const getFixtures = (): ThunkAction => async (
  dispatch,
  getState,
  endpoints
) => {
  dispatch(actions.requestFixtures())
  dispatch(actions.receiveFixtures(await endpoints.dashboard.get()))
}

export const placeBet = (
  awayTeam: string,
  homeTeam: string,
  placement: BetPlacement
): ThunkAction => async (dispatch, getState, endpoints) => {
  dispatch(actions.requestPlaceBet())
  await endpoints.dashboard.placeBet({ awayTeam, homeTeam, placement })
  dispatch(actions.receivePlaceBet(awayTeam, homeTeam, placement))
}

export type Actions = ActionsUnion<typeof actions>
