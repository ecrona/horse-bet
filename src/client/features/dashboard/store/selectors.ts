import { createSelector } from 'reselect'
import { RootState } from 'store/reducers'

const isUnique = (value, index, self) => self.indexOf(value) === index

export const getRounds = createSelector(
  (state: RootState) => state.common.date,
  (state: RootState) => state.dashboard.fixtures,
  (date, fixtures) =>
    fixtures
      .map(fixture => fixture.round)
      .filter(isUnique)
      .map(round => ({
        round,
        matchDays: fixtures
          .filter(fixture => fixture.round === round)
          .map(fixture => fixture.startDate)
          .filter(isUnique)
          .map((startDate, index) => ({
            matchDay: `Matchday ${index + 1}`,
            days: fixtures
              .filter(fixture => fixture.startDate === startDate)
              .map(fixture => fixture.startDay)
              .filter(isUnique)
              .map(startDay => ({
                weekDay: startDay,
                fixtures: fixtures
                  .filter(
                    fixture =>
                      fixture.startDate === fixture.startDate &&
                      fixture.startDay === startDay
                  )
                  .map(fixture => ({
                    awayTeam: fixture.awayTeam,
                    homeTeam: fixture.homeTeam,
                    betPlacement: fixture.betPlacement,
                    placeable:
                      new Date(`${fixture.startDate} ${fixture.startTime}`) >
                      new Date(date)
                  }))
              }))
          }))
      }))
)
