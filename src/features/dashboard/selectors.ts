import { createSelector } from 'reselect'
import { State } from 'store'
import { Bet } from 'models/bet'
import { Fixture } from 'models/fixture'
import { Placement } from 'models/placement'

interface FixtureWithPlacements extends Fixture {
  placements: Array<Placement | undefined>
}

interface StageTable {
  name: string
  fixtures: Array<FixtureWithPlacements>
}

export const getStageTables = createSelector(
  (state: State) => state.fixtures,
  (state: State) => state.users,
  (state: State) => state.bets,
  (fixtures, users, bets): Array<StageTable> =>
    fixtures
      .map(fixture => fixture.stage)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(stage => ({
        name: stage,
        fixtures: fixtures
          .filter(fixture => fixture.stage === stage)
          .map(fixture => ({
            ...fixture,
            placements: users
              .map(user =>
                bets.find(
                  bet =>
                    bet.user === user.name &&
                    bet.home === fixture.home &&
                    bet.away === fixture.away &&
                    bet.date === fixture.date
                )
              )
              .map(bet => bet && bet.placement)
          }))
      }))
)
