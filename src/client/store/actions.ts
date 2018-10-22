// Common
import {
  ActionTypes as CommonActionTypes,
  Actions as CommonActions
} from './common/actions'

// Features
import {
  ActionTypes as DashboardActionTypes,
  Actions as DashboardActions
} from 'features/dashboard/store/actions'

export const ActionTypes = {
  // Common
  common: CommonActionTypes,

  // Features
  dashboard: DashboardActionTypes
}

export type Actions = CommonActions | DashboardActions
