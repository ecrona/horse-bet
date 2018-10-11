import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Dashboard as Component } from './component'
import { getData } from './store/actions'

const mapStateToProps = mapState(state => ({
  rounds: state.dashboard.data
}))

const mapDispatchToProps = mapDispatch({
  getData
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
