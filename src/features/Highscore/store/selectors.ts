import { RootState } from '@client/store/reducers'
import { createSelector } from 'reselect'

export const getHighscores = createSelector(
  (state: RootState) => state.highscore.highscores,
  (highscores) => highscores
)

export const getMyHighscore = createSelector(
  (state: RootState) => state.highscore.highscores,
  (highscores) => highscores.find((highscore) => highscore.me)
)
