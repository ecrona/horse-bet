import { createSelector } from 'reselect'
import { RootState } from 'store/reducers'
import { Placement } from 'models/placement'
import { FixtureWithPlacements } from '../models/fixture-with-placements'
import { Score } from '../models/score'
import { Winner } from 'models/winner'

interface StageTable {
  name: string
  fixtures: Array<FixtureWithPlacements>
  scores: Array<number>
}

export const getStageTables = createSelector(
  (state: RootState) => state.fixtures,
  (state: RootState) => state.users,
  (state: RootState) => state.bets,
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
          })),
        scores: []
      }))
      .map(stage => ({
        ...stage,
        scores: users.map(
          (user, userIndex) =>
            stage.fixtures.filter(
              fixture =>
                (fixture.placements[userIndex] === Placement.Home &&
                  fixture.winner === Winner.Home) ||
                (fixture.placements[userIndex] === Placement.Away &&
                  fixture.winner === Winner.Away)
            ).length
        )
      }))
)

export const getTotalScores = createSelector(
  (state: RootState) => state.fixtures,
  (state: RootState) => state.users,
  (state: RootState) => state.bets,
  (fixtures, users, bets): Array<Score> => {
    return users
      .map(user => {
        return {
          name: user.name,
          score: bets.filter(
            bet =>
              bet.userId === user.id &&
              fixtures.find(
                fixture =>
                  fixture.id === bet.fixtureId &&
                  ((fixture.winner == Winner.Home &&
                    bet.placement === Placement.Home) ||
                    (fixture.winner === Winner.Away &&
                      bet.placement === Placement.Away))
              )
          ).length
        }
      })
      .sort((a, b) => b.score - a.score)
  }
)

export const getSelectedBet = createSelector(
  (state: RootState) => state.dashboard.selectedFixture,
  selectedFixture => selectedFixture.placements[0] || Placement.NotPlaced
)

export const hasSelectedFixtureStarted = createSelector(
  (state: RootState) => state.dashboard.selectedFixture,
  selectedFixture =>
    console.log(new Date(), new Date(selectedFixture.date)) ||
    new Date() > new Date(selectedFixture.date)
)
