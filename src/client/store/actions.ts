// Features
import {
  ActionTypes as DashboardActionTypes,
  Actions as DashboardActions
} from 'features/dashboard/store/actions'

// Common
import {
  ActionTypes as ViewActionTypes,
  Actions as ViewActions
} from './view/actions'

export const ActionTypes = {
  // Features
  dashboard: DashboardActionTypes,

  // Common
  view: ViewActionTypes
}

export type Actions = DashboardActions | ViewActions
