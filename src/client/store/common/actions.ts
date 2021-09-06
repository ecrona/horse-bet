import {
  format,
  getMinutes,
  setMinutes,
  setSeconds,
  setMilliseconds,
  differenceInMilliseconds
} from 'date-fns'
import { getFixtures } from 'features/Dashboard/store/actions'

import { ThunkAction, ActionsUnion, createAction } from 'store'

const minuteInterval = 5
const minuteCollection = Array.from(Array(60 / minuteInterval))
  .map((_, index) => index * minuteInterval)
  .reverse()

export enum ActionTypes {
  unauthenticate = '[Common] Unauthenticate',
  setDate = '[Common] Set date'
}

export const actions = {
  unauthenticate: () => createAction(ActionTypes.unauthenticate),
  setDate: (date: string) => createAction(ActionTypes.setDate, date)
}

export const updateDate = (): ThunkAction => dispatch => {
  const now = new Date()
  dispatch(actions.setDate(format(now, 'YYYY-MM-DD HH:mm')))

  // TODO: FIXME
  // dispatch(getFixtures())

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
