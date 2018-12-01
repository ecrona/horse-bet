import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { updateDate } from 'store/common/actions'
import { Dashboard as Component } from './component'
import { getFixtures, placeBet, actions } from './store/actions'
import { getRounds } from './store/selectors'

const mapStateToProps = mapState(state => ({
  viewState: state.dashboard.viewState,
  fixtures: state.dashboard.fixtures,
  rounds: getRounds(state)
}))

const mapDispatchToProps = mapDispatch({
  getFixtures,
  updateDate,
  placeBet,
  toggleViewState: actions.toggleViewState
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
