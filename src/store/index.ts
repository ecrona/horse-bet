import { combineReducers } from 'redux'
import viewReducer, { State as ViewState } from './view/reducer'
import betsReducer, { State as BetsState } from './bets/reducer'
import fixturesReducer, { State as FixturesState } from './fixtures/reducer'
import usersReducer, { State as UsersState } from './users/reducer'

export interface State {
  view: ViewState
  bets: BetsState
  fixtures: FixturesState
  users: UsersState
}

export const rootReducer = combineReducers({
  view: viewReducer,
  bets: betsReducer,
  fixtures: fixturesReducer,
  users: usersReducer
})
