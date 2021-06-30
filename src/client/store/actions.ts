// Common
import {
    Actions as HighscoreActions,
    ActionTypes as HighscoreActionTypes
} from '@client/features/Highscore/store/actions'
// Features
import {
    Actions as DashboardActions,
    ActionTypes as DashboardActionTypes
} from 'features/Dashboard/store/actions'
import {
    Actions as TournamentsActions,
    ActionTypes as TournamentsActionTypes
} from 'features/Tournaments/store/actions'
import {
    Actions as CommonActions,
    ActionTypes as CommonActionTypes
} from './common/actions'

export const ActionTypes = {
  // Common
  common: CommonActionTypes,

  // Features
  dashboard: DashboardActionTypes,
  highscore: HighscoreActionTypes,
  tournaments: TournamentsActionTypes
}

export type Actions = CommonActions | DashboardActions | HighscoreActions |TournamentsActions
