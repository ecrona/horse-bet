import { ThunkAction, ActionsUnion, createAction } from 'store'
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

export const actions = {
  authenticate: (error: AuthenticationError) =>
    createAction(ActionTypes.authenticate, error),
  receiveApplicationData: (
    users: Array<User>,
    fixtures: Array<Fixture>,
    bets: Array<Bet>
  ) =>
    createAction(ActionTypes.receiveApplicationData, { users, fixtures, bets })
}

const url =
  'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json'

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
          actions.receiveApplicationData(
            await getUsers(me.id, firebase),
            await getFixtures(firebase),
            await getCombinedBets(firebase, firebase.userId)
          )
        )
      } else {
        firebase.selectAuthAccount()
        dispatch(actions.authenticate(AuthenticationError.Unauthorized))
      }
    } else {
      dispatch(actions.authenticate(AuthenticationError.None))
    }
  }
}

export type Actions = ActionsUnion<typeof actions>
