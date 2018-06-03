import { combineReducers } from 'redux'

// Data sources
import viewReducer, { State as ViewState } from './view/reducer'
import betsReducer, { State as BetsState } from './bets/reducer'
import fixturesReducer, { State as FixturesState } from './fixtures/reducer'
import usersReducer, { State as UsersState } from './users/reducer'

// Features
import dashboardReducer, {
  State as DashboardState
} from 'features/dashboard/store/reducer'

export interface State {
  // Data sources
  view: ViewState
  bets: BetsState
  fixtures: FixturesState
  users: UsersState

  // Features
  dashboard: DashboardState
}

export const rootReducer = combineReducers({
  // Data soruces
  view: viewReducer,
  bets: betsReducer,
  fixtures: fixturesReducer,
  users: usersReducer,

  // Features
  dashboard: dashboardReducer
})
