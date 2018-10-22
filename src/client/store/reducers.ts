import { combineReducers } from 'redux'
import { RouterState } from 'connected-react-router'

// Common
import common from './common/reducer'

// Features
import dashboard from 'features/dashboard/store/reducer'

const reducerMap = {
  // Common
  common,

  // Features
  dashboard
}

export const rootReducer = combineReducers(reducerMap)

export type RootState = { router: RouterState } & {
  [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>
}
