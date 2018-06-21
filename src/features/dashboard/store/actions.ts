import { Action, ThunkAction } from 'utils/redux'
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
  constructor(public fixture: Fixture, public winner: Winner) {}
}

export function placeBet(fixture: Fixture, winner: Winner): ThunkAction {
  return async (dispatch, getState, firebase) => {
    console.log(fixture, winner)
    dispatch(new RequestPlaceBet())
    await fetch('/')
    await new Promise(resolve => setTimeout(resolve, 2000))
    dispatch(new ReceivePlaceBet(fixture, winner))
  }
}
