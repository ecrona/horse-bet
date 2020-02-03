import { connect } from 'react-redux'
import { mapDispatch, mapState } from 'store'
import { Dashboard as Component } from './Dashboard.component'
import { actions, placeBet } from '../Dashboard/store/actions'
import { getRounds } from '../Dashboard/store/selectors'

const mapStateToProps = mapState(state => ({
  viewState: state.dashboard.viewState,
  fixtures: state.dashboard.fixtures,
  rounds: getRounds(state),
  scrollPosition: state.dashboard.scrollPosition
}))

const mapDispatchToProps = mapDispatch({
  placeBet,
  toggleViewState: actions.toggleViewState,
  saveScrollPosition: actions.saveScrollPosition
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(Component)
