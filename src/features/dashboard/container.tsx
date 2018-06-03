import { connect } from 'react-redux'
import { State } from 'store'
import { getStageTables } from './selectors'
import Component from './component'

const mapStateToProps = (state: State) => ({
  stages: getStageTables(state),
  users: state.users
})

export type StoreProps = ReturnType<typeof mapStateToProps>
export default connect(mapStateToProps)(Component)
