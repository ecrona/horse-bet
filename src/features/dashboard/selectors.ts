import { createSelector } from 'reselect'
import { State } from 'store'

export const getFixtureTables = createSelector(
  (state: State) => state.fixtures,
  (state: State) => state.users,
  (state: State) => state.bets,
  (fixtures, users, bets) => fixtures
)
