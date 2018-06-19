import { Action, ThunkAction } from 'utils/redux'
import { Fixture } from 'models/fixture'
import { User } from 'models/user'
import { Placement } from 'models/placement'
import { Bet } from 'models/bet'
import { isAuthenticated } from 'utils/firebase/authentication'
import { getUsers, getFixtures } from 'utils/firebase/database'

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
    await firebase.authenticate()
    const authenticated = await isAuthenticated(firebase)

    if (authenticated) {
      const userId = '5dvAPb52p1hDIJgXBvTS'
      const userCollection = await firebase.db.collection('users').get()
      const fixtureCollection = await firebase.db.collection('fixtures').get()
      const betCollection = await firebase.db.collection('bets').get()
      const betPlacementCollection = await firebase.db
        .collection('betPlacements')
        .where('date', '<=', new Date())
        .get()
      const userBetPlacementCollection = await firebase.db
        .collection('betPlacements')
        .where('userId', '==', userId)
        .get()

      const mapBetPlacement = (bet: any) => ({
        userId: bet.userId,
        fixtureId: bet.fixtureId,
        placement: bet.winner ? Placement.Home : Placement.Away
      })

      const betPlacements = betPlacementCollection.docs
        .map(doc => doc.data())
        .map(mapBetPlacement)
        .filter(bet => bet.userId !== userId)
        .concat(
          userBetPlacementCollection.docs
            .map(doc => doc.data())
            .map(mapBetPlacement)
        )

      const bets = betCollection.docs
        .map(doc => ({ ...doc.data(), placement: Placement.Placed } as Bet))
        .map(
          bet =>
            betPlacements.find(
              betPlacement =>
                betPlacement.userId === bet.userId &&
                betPlacement.fixtureId === bet.fixtureId
            ) || bet
        )

      dispatch(
        new ReceiveApplicationData(
          await getUsers(firebase),
          await getFixtures(firebase),
          bets
        )
      )
    } else {
      dispatch(new Authenticate())
    }
  }
}
