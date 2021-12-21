import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { Endpoints } from '@shared/endpoints'
import { RootState } from './reducers'

interface Action<T extends string> {
  type: T
}

interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

type Dispatchable =
  | ThunkAction
  | Action<string>
  | ActionWithPayload<string, any>

type Dispatch = (action: Dispatchable) => void

export type ThunkAction = (
  dispatch: Dispatch,
  getState: () => RootState,
  endpoints: Endpoints
) => void

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>

export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload }
}

export const mapState = <T>(
  stateMap: (state: RootState, ownProps?: any) => T
) => stateMap
export const mapDispatch = <T extends ActionCreatorsMapObject>(
  actions: T
): ((dispatch: any) => T) => dispatch => bindActionCreators(actions, dispatch)
