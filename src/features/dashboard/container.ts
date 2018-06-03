import { connect } from 'react-redux'
import { State } from 'store'
import { getStageTables, getSelectedBet } from './store/selectors'
import Component from './component'
import {
  OpenBetModalAction,
  CloseBetModalAction,
  placeBet
} from './store/actions'
import { Fixture } from 'models/fixture'
import { Winner } from 'models/winner'
import { FixtureWithPlacements } from './models/fixture-with-placements'

const mapStateToProps = (state: State) => ({
  betModalState: state.dashboard.betModalState,
  selectedFixture: state.dashboard.selectedFixture,
  selectedBet: getSelectedBet(state),
  stages: getStageTables(state),
  users: state.users
})

const mapDispatchToProps = (dispatch: any) => ({
  openBetModal: (fixture: FixtureWithPlacements) =>
    dispatch(new OpenBetModalAction(fixture)),
  closeBetModal: () => dispatch(new CloseBetModalAction()),
  placeBet: (fixture: Fixture, winner: Winner) =>
    dispatch(placeBet(fixture, winner))
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Component)
