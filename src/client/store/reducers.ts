import highscore from '@client/features/OldHighscore/store/reducer'
// Features
import dashboard from 'features/Dashboard/store/reducer'
import { combineReducers } from 'redux'
// Common
import common from './common/reducer'

const reducerMap = {
  // Common
  common,

  // Features
  dashboard,
  highscore
}

export const rootReducer = combineReducers(reducerMap)

export type RootState = {} & {
  [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>
}
