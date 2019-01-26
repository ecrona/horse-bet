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
        placeable:
          new Date(`${fixture.startDate} ${fixture.startTime}`) >
          new Date(date),
        startTime: fixture.startTime,
        score: fixture.score
      })

      return rounds
    }, {})

    // return fixtures
    //   .map(fixture => fixture.round)
    //   .filter(isUnique)
    //   .map(round => ({
    //     name: getRoundName(round),
    //     fixtures: fixtures
    //       .filter(fixture => fixture.round === round)
    //       .map((startDate, index) => {
    //         console.log({ fixtures, startDate })

    //         return {
    //           matchDay: `Matchday ${index + 1}`,
    //           days: fixtures
    //             .filter(fixture => fixture.startDate === startDate)
    //             .map(fixture => fixture.startDay)
    //             .filter(isUnique)
    //             .map(startDay => ({
    //               weekDay: startDay,
    //               fixtures: fixtures
    //                 .filter(
    //                   fixture =>
    //                     fixture.startDate === fixture.startDate &&
    //                     fixture.startDay === startDay
    //                 )
    //                 .map(fixture => ({
    //                   awayTeam: fixture.awayTeam,
    //                   homeTeam: fixture.homeTeam,
    //                   betPlacement: fixture.betPlacement,
    //                   placeable:
    //                     new Date(`${fixture.startDate} ${fixture.startTime}`) >
    //                     new Date(date),
    //                   startTime: fixture.startTime
    //                 }))
    //             }))
    //         }
    //       })
    //   }))
  }
)
