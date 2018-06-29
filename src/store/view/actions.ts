import { Action, ThunkAction } from 'utils/redux'
import { AuthenticationError } from 'models/authentication-error'
import { Fixture } from 'models/fixture'
import { User } from 'models/user'
import { Placement } from 'models/placement'
import { Bet } from 'models/bet'
import { getUser } from 'utils/firebase/authentication'
import {
  getUsers,
  getFixtures,
  getCombinedBets,
  getMe,
  shouldUpdateFixtures,
  updateFixtureLastDate
} from 'utils/firebase/database'

export enum ActionTypes {
  authenticate = '[View] Authenticate',
  receiveApplicationData = '[View] Receive base data'
}

const url =
  'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json'

export class Authenticate implements Action {
  public readonly type = ActionTypes.authenticate
  constructor(public error: AuthenticationError) {}
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
    const shouldUpdate = await shouldUpdateFixtures(firebase)
    if (shouldUpdate) {
      const data = await fetch(url)
      const json = await data.json()
      await firebase.call('updateFixtures')(json)
      await updateFixtureLastDate(firebase)
    }
    const user = await getUser(firebase)

    if (user && user.email) {
      const me = await getMe(firebase, user.email || '')

      if (me && me.id) {
        firebase.userId = me.id

        dispatch(
          new ReceiveApplicationData(
            await getUsers(me.id, firebase),
            await getFixtures(firebase),
            await getCombinedBets(firebase, firebase.userId)
          )
        )
      } else {
        firebase.selectAuthAccount()
        dispatch(new Authenticate(AuthenticationError.Unauthorized))
      }
    } else {
      dispatch(new Authenticate(AuthenticationError.None))
    }
  }
}
