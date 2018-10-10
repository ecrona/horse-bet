import { State } from 'store'
import { Firebase } from './firebase'

interface Dispatch {
  (action: Dispatchable): void
}

type Dispatchable = Action | ThunkAction

export interface Action {
  type: string
}

export type ThunkAction = (
  dispatch: Dispatch,
  getState: () => State,
  endpoints: Firebase
) => void
