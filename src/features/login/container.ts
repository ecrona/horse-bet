import { connect } from 'react-redux'
import { State } from 'store'
import Component from './component'
import { LoginMethod } from './models/login-method'

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = (dispatch: any) => ({
  login: (method: LoginMethod) => console.log('röv')
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
