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
import {
  ActionTypes as HighscoreActionTypes,
  Actions as HighscoreActions
} from 'features/Highscore/store/actions'

export const ActionTypes = {
  // Common
  common: CommonActionTypes,

  // Features
  dashboard: DashboardActionTypes,
  highscore: HighscoreActionTypes
}

export type Actions = CommonActions | DashboardActions | HighscoreActions
