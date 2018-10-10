import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Dashboard as Component } from './component'

const mapStateToProps = mapState(state => ({}))

const mapDispatchToProps = mapDispatch({})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
