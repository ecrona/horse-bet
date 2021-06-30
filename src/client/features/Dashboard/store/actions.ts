import { BetPlacement } from '@shared/models/bet-placement'
import { Fixture } from '@shared/models/fixture'
import { ActionsUnion, createAction, ThunkAction } from 'store'

export enum ActionTypes {
  requestFixtures = '[Dashboard] Request fixtures',
  receiveFixtures = '[Dashboard] Receive fixtures',
  requestPlaceBet = '[Dashboard] Request place bet',
  receivePlaceBet = '[Dashboard] Receive place bet',
  toggleViewState = '[Dashboard] Toggle view state',
  saveScrollPosition = '[Dashboard] Save scroll position'
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
  toggleViewState: () => createAction(ActionTypes.toggleViewState),
  saveScrollPosition: (scrollPosition: number) =>
    createAction(ActionTypes.saveScrollPosition, scrollPosition)
}

export const getFixtures = (): ThunkAction => async (
  dispatch,
  getState,
  endpoints
) => {
  dispatch(actions.requestFixtures())
  dispatch(actions.receiveFixtures(await endpoints.fixtures.get()))
}

export const placeBet = (
  tournamentId: number,
  awayTeam: string,
  homeTeam: string,
  placement: BetPlacement
): ThunkAction => async (dispatch, getState, endpoints) => {
  dispatch(actions.requestPlaceBet())
  await endpoints.fixtures.placeBet({ tournamentId, awayTeam, homeTeam, placement })
  dispatch(actions.receivePlaceBet(awayTeam, homeTeam, placement))
}

export type Actions = ActionsUnion<typeof actions>
