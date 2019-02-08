import { createSelector } from 'reselect'
import { Round } from '@shared/models/round'
import { RootState } from 'store/reducers'

const isUnique = (value, index, self) => self.indexOf(value) === index
const getRoundName = (round: Round) => {
  switch (round) {
    case Round.Final:
      return 'Final'
    case Round.SemiFinals:
      return 'Semi Finals'
    case Round.QuarterFinals:
      return 'Quarter Finals'
    case Round.RoundOf16:
      return 'Round of 16'
  }
}

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
        placeable: new Date(fixture.firstMatchStart) > new Date(date),
        firstMatchStart: fixture.firstMatchStart,
        secondMatchStart: fixture.secondMatchStart,
        score: fixture.score
      })

      return rounds
    }, {})
  }
)
