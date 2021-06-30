import highscore from '@client/features/Highscore/store/reducer'
// Features
import dashboard from 'features/Dashboard/store/reducer'
import tournaments from 'features/Tournaments/store/reducer'
import { combineReducers } from 'redux'
// Common
import common from './common/reducer'

const reducerMap = {
  // Common
  common,

  // Features
  dashboard,
  highscore,
  tournaments
}

export const rootReducer = combineReducers(reducerMap)

export type RootState = {} & {
  [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>
}
