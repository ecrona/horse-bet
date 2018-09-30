import { Fixture } from 'models/fixture'
import { Winner } from 'models/winner'
import { saveBet } from 'utils/firebase/database'
import { ThunkAction, ActionsUnion, createAction } from 'store'
import { FixtureWithPlacements } from '../models/fixture-with-placements'

export enum ActionTypes {
  openBetModal = '[Dashboard] Open bet modal',
  closeBetModal = '[Dashboard] Close bet modal',
  requestPlaceBet = '[Dashboard] Request place bet',
  receivePlaceBet = '[Dashboard] Receive place bet'
}

export const actions = {
  openBetModal: (fixture: FixtureWithPlacements) =>
    createAction(ActionTypes.openBetModal, fixture),
  closeBetModal: () => createAction(ActionTypes.closeBetModal),
  requestPlaceBet: () => createAction(ActionTypes.requestPlaceBet),
  receivePlaceBet: (
    id: string,
    fixture: Fixture,
    userId: string,
    winner: Winner
  ) =>
    createAction(ActionTypes.receivePlaceBet, { id, fixture, userId, winner })
}

export function placeBet(fixture: Fixture, winner: Winner): ThunkAction {
  return async (dispatch, getState, firebase) => {
    const existingBet = getState().bets.find(
      bet => bet.fixtureId === fixture.id && bet.userId === firebase.userId
    )
    dispatch(actions.requestPlaceBet())
    const id = await saveBet(firebase, fixture, winner, existingBet)
    dispatch(actions.receivePlaceBet(id, fixture, firebase.userId, winner))
  }
}

export type Actions = ActionsUnion<typeof actions>
