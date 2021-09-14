// Common
// Features
import {
  Actions as AdminActions,
  ActionTypes as AdminActionTypes,
} from '@client/features/Admin/store/actions'
import {
  Actions as DashboardActions,
  ActionTypes as DashboardActionTypes,
} from '@client/features/Dashboard/store/actions'
import {
  Actions as HighscoreActions,
  ActionTypes as HighscoreActionTypes,
} from '@client/features/Highscore/store/actions'
import {
  Actions as TournamentsActions,
  ActionTypes as TournamentsActionTypes,
} from '@client/features/Tournaments/store/actions'
import {
  Actions as CommonActions,
  ActionTypes as CommonActionTypes,
} from './common/actions'

export const ActionTypes = {
  // Common
  common: CommonActionTypes,

  // Features
  admin: AdminActionTypes,
  dashboard: DashboardActionTypes,
  highscore: HighscoreActionTypes,
  tournaments: TournamentsActionTypes,
}

export type Actions =
  | CommonActions
  | AdminActions
  | DashboardActions
  | HighscoreActions
  | TournamentsActions
