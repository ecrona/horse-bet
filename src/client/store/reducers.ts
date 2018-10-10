import { combineReducers } from 'redux'
import { RouterState } from 'connected-react-router'

// Features
import dashboardReducer from 'features/dashboard/store/reducer'
import loginReducer from 'features/login/store/reducer'

const reducerMap = {
  // Features
  dashboard: dashboardReducer,
  login: loginReducer
}

export const rootReducer = combineReducers(reducerMap)

export type RootState = { router: RouterState } & {
  [K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>
}
