import { createSelector } from 'reselect'
import { RootState } from 'store/reducers'

export const getHighscores = createSelector(
  (state: RootState) => state.highscore.highscores,
  highscores => highscores
)

export const getMyHighscore = createSelector(
  (state: RootState) => state.highscore.highscores,
  highscores => highscores.find(highscore => highscore.me)
)
