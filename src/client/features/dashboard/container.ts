import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import {
  getStageTables,
  getSelectedBet,
  getTotalScores,
  hasSelectedFixtureStarted
} from './store/selectors'
import { Dashboard as Component } from './component'
import { actions, placeBet } from './store/actions'

const mapStateToProps = mapState(state => ({
  betModalState: state.dashboard.betModalState,
  selectedFixture: state.dashboard.selectedFixture,
  selectedFixtureStarted: hasSelectedFixtureStarted(state),
  selectedBet: getSelectedBet(state),
  stages: getStageTables(state),
  totalScores: getTotalScores(state),
  users: state.users
}))

const mapDispatchToProps = mapDispatch({
  openBetModal: actions.openBetModal,
  closeBetModal: actions.closeBetModal,
  placeBet
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
