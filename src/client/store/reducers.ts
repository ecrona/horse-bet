import highscore from '@client/features/Highscore/store/reducer'
// Features
import admin from 'features/Admin/store/reducer'
import dashboard from 'features/Dashboard/store/reducer'
import tournaments from 'features/Tournaments/store/reducer'
import { combineReducers } from 'redux'
// Common
import common from './common/reducer'

const reducerMap = {
  // Common
  common,

  // Features
  admin,
  dashboard,
  highscore,
  tournaments
}

export const rootReducer = combineReducers(reducerMap)

export type RootState = {} & {
  [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>
}
