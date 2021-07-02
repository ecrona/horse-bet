import { getRoundName } from '@client/utils'
import { createSelector } from 'reselect'
import { RootState } from 'store/reducers'


export const getRounds = createSelector(
  (state: RootState) => state.common.date,
  (state: RootState) => state.dashboard.fixtures,
  (date, fixtures) => {
    return fixtures.reduce((rounds, fixture) => {
      if (!rounds[fixture.round]) {
        rounds[fixture.round] = {
          name: getRoundName(fixture.round),
          fixtures: []
        }
      }

      rounds[fixture.round].fixtures.push({
        awayTeam: fixture.awayTeam,
        homeTeam: fixture.homeTeam,
        betPlacement: fixture.betPlacement,
        matchWinner: fixture.matchWinner,
        // TODO: More reliable IOS fix
        placeable:
          new Date(fixture.firstMatchStart.replace(' ', 'T')) >
          new Date(date.replace(' ', 'T')),
        firstMatchStart: fixture.firstMatchStart,
        secondMatchStart: fixture.secondMatchStart,
        score: fixture.score
      })

      return rounds
    }, {})
  }
)
