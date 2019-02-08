import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Highscore as Component } from './Highscore.component'
import { fetchHighscores, actions } from './store/actions'
import { getHighscores, getMyHighscore } from './store/selectors'

const mapStateToProps = mapState(state => ({
  viewState: state.highscore.viewState,
  highscores: getHighscores(state),
  myHighscore: getMyHighscore(state)
}))

const mapDispatchToProps = mapDispatch({
  fetchHighscores
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Highscore = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
