import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Login as Component } from './component'
import { LoginMethod } from './models/login-method'
import { authenticate } from './store/actions'

const mapStateToProps = mapState(state => ({
  error: state.login.error
}))

const mapDispatchToProps = mapDispatch({
  login: authenticate
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
