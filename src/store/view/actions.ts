import { Action, ThunkAction } from 'utils/redux'
import { Fixture } from 'models/fixture'
import { User } from 'models/user'
import { Placement } from 'models/placement'
import { Bet } from 'models/bet'

export enum ActionTypes {
  receiveApplicationData = '[View] Receive base data'
}

const url =
  'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json'

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
    await firebase.init()
    const data = await fetch(url)
    const json = await data.json()
    const response = await firebase.call('updateFixtures')(json)

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
        userCollection.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)),
        fixtureCollection.docs.map(
          doc => ({ id: doc.id, ...doc.data() } as Fixture)
        ),
        bets
      )
    )
  }
}
