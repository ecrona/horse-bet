import { createSelector } from 'reselect'
import { RootState } from 'store/reducers'

export const getFixture = createSelector(
  (state: RootState, homeTeam: string, awayTeam: string) =>
    state.dashboard.fixtures,
  (state: RootState, homeTeam: string, awayTeam: string) => homeTeam,
  (state: RootState, homeTeam: string, awayTeam: string) => awayTeam,
  (fixtures, homeTeam, awayTeam) =>
    fixtures.find(
      fixture =>
        fixture.homeTeam.name === homeTeam && fixture.awayTeam.name === awayTeam
    )
)
