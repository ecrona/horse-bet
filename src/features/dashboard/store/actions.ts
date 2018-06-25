import { Action, ThunkAction } from 'utils/redux'
import { saveBet } from 'utils/firebase/database'
import { Fixture } from 'models/fixture'
import { Winner } from 'models/winner'
import { FixtureWithPlacements } from '../models/fixture-with-placements'

export enum ActionTypes {
  openBetModal = '[Dashboard] Open bet modal',
  closeBetModal = '[Dashboard] Close bet modal',
  requestPlaceBet = '[Dashboard] Request place bet',
  receivePlaceBet = '[Dashboard] Receive place bet'
}

export class OpenBetModalAction implements Action {
  public readonly type = ActionTypes.openBetModal
  constructor(public fixture: FixtureWithPlacements) {}
}

export class CloseBetModalAction implements Action {
  public readonly type = ActionTypes.closeBetModal
}

export class RequestPlaceBet implements Action {
  public readonly type = ActionTypes.requestPlaceBet
}

export class ReceivePlaceBet implements Action {
  public readonly type = ActionTypes.receivePlaceBet
  constructor(
    public fixture: Fixture,
    public userId: string,
    public winner: Winner
  ) {}
}

export function placeBet(fixture: Fixture, winner: Winner): ThunkAction {
  return async (dispatch, getState, firebase) => {
    const existingBet = getState().bets.find(
      bet => bet.fixtureId === fixture.id && bet.userId === firebase.userId
    )
    dispatch(new RequestPlaceBet())
    await saveBet(firebase, fixture, winner, existingBet)
    dispatch(new ReceivePlaceBet(fixture, firebase.userId, winner))
  }
}
