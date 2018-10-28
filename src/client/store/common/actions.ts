import {
  format,
  getMinutes,
  setMinutes,
  setSeconds,
  setMilliseconds,
  differenceInMilliseconds
} from 'date-fns'

import { ThunkAction, ActionsUnion, createAction } from 'store'
import { AuthenticationError } from 'models/authentication-error'

const minuteInterval = 5
const minuteCollection = Array.from(Array(60 / minuteInterval))
  .map((_, index) => index * minuteInterval)
  .reverse()

export enum ActionTypes {
  authenticate = '[Common] Authenticate',
  setDate = '[Common] Set date'
}

export const actions = {
  authenticate: (error: AuthenticationError) =>
    createAction(ActionTypes.authenticate, error),
  setDate: (date: string) => createAction(ActionTypes.setDate, date)
}

export const updateDate = (): ThunkAction => dispatch => {
  const now = new Date()
  dispatch(actions.setDate(format(now, 'YYYY-MM-DD HH:mm')))

  const currentMinute = getMinutes(now)
  const closestMinute =
    minuteCollection.find(minute => currentMinute >= minute) + minuteInterval
  const nextUpdate = setMilliseconds(
    setSeconds(setMinutes(new Date(), closestMinute), 0),
    0
  )

  setTimeout(
    () => dispatch(updateDate()),
    differenceInMilliseconds(nextUpdate, now)
  )
}

export type Actions = ActionsUnion<typeof actions>
