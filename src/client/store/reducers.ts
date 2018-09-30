import { combineReducers } from 'redux'
import { RouterState } from 'connected-react-router'

// Data sources
import viewReducer from './view/reducer'
import betsReducer from './bets/reducer'
import fixturesReducer from './fixtures/reducer'
import usersReducer from './users/reducer'

// Features
import dashboardReducer from 'features/dashboard/store/reducer'
import loginReducer from 'features/login/store/reducer'

const reducerMap = {
  // Data soruces
  view: viewReducer,
  bets: betsReducer,
  fixtures: fixturesReducer,
  users: usersReducer,

  // Features
  dashboard: dashboardReducer,
  login: loginReducer
}

export const rootReducer = combineReducers(reducerMap)

export type RootState = { router: RouterState } & {
  [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>
}
