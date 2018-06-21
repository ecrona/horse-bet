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

const url =
  'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json'
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
    const data = await fetch(url)
    const json = await data.json()
    const response = await firebase.call('updateFixtures')(json)
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
