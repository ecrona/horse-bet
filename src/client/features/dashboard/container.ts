import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Dashboard as Component } from './component'
import { getFixtures } from './store/actions'
import { getRounds } from './store/selectors'

const mapStateToProps = mapState(state => ({
  fixtures: state.dashboard.fixtures,
  rounds: getRounds(state)
}))

const mapDispatchToProps = mapDispatch({
  getFixtures
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
