import { combineReducers } from 'redux'
import viewReducer, { State as ViewState } from './view/reducer'

export interface State {
  view: ViewState
}

export const rootReducer = combineReducers({
  view: viewReducer
})
