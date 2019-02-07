import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { App as Component } from './App'

const mapStateToProps = mapState(state => ({
  authenticated: state.common.authenticated
}))

const mapDispatchToProps = mapDispatch({})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
