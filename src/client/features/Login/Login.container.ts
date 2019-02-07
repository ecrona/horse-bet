import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Login as Component } from './Login.component'

const mapStateToProps = mapState(state => ({}))

const mapDispatchToProps = mapDispatch({})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
