import { createSelector } from 'reselect'
import { State } from 'store'
import { Placement } from 'models/placement'
import { FixtureWithPlacements } from '../models/fixture-with-placements'

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
              .map(
                user =>
                  bets.find(
                    bet =>
                      bet.userId === user.id && bet.fixtureId === fixture.id
                  ) || { placement: Placement.NotPlaced }
              )
              .map(bet => bet && bet.placement)
          }))
      }))
)

export const getSelectedBet = createSelector(
  (state: State) => state.dashboard.selectedFixture,
  selectedFixture => selectedFixture.placements[0] || Placement.NotPlaced
)
