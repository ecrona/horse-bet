import { View } from 'models/view'
import { Actions, ActionTypes } from '../actions'

export interface State {
  date: string
}

const initialState = {
  date: '2018-01-01 10:10'
}

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.common.setDate:
      return { ...state, date: action.payload }
    default:
      return state
  }
}
