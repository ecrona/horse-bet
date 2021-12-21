import admin from '@client/features/Admin/store/reducer'
import dashboard from '@client/features/Dashboard/store/reducer'
import highscore from '@client/features/Highscore/store/reducer'
import tournaments from '@client/features/Tournaments/store/reducer'
import { combineReducers } from 'redux'
import common from './common/reducer'

const reducerMap = {
  // Common
  common,

  // Features
  admin,
  dashboard,
  highscore,
  tournaments,
}

export const rootReducer = combineReducers(reducerMap)

export type RootState = {} & {
  [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>
}
