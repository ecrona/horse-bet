import { Action, ThunkAction } from 'utils/redux'
import { Fixture } from 'models/fixture'
import { User } from 'models/user'
import { Placement } from 'models/placement'
import { Bet } from 'models/bet'
import { isAuthenticated } from 'utils/firebase/authentication'
import { getUsers, getFixtures, getCombinedBets } from 'utils/firebase/database'

export enum ActionTypes {
  authenticate = '[View] Authenticate',
  receiveApplicationData = '[View] Receive base data'
}

export class Authenticate implements Action {
  public readonly type = ActionTypes.authenticate
}

export class ReceiveApplicationData implements Action {
  public readonly type = ActionTypes.receiveApplicationData
  constructor(
    public users: Array<User>,
    public fixtures: Array<Fixture>,
    public bets: Array<Bet>
  ) {}
}

export function load(): ThunkAction {
  return async (dispatch, getState, firebase) => {
    ;(window as any).f = firebase.authenticate.bind(firebase)
    const authenticated = await isAuthenticated(firebase)

    if (authenticated) {
      const userId = '5dvAPb52p1hDIJgXBvTS'

      dispatch(
        new ReceiveApplicationData(
          await getUsers(firebase),
          await getFixtures(firebase),
          await getCombinedBets(firebase, userId)
        )
      )
    } else {
      dispatch(new Authenticate())
    }
  }
}
