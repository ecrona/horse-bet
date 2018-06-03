import { connect } from 'react-redux'
import { State } from 'store'
import { getFixtureTables } from './selectors'
import Component from './component'

const mapStateToProps = (state: State) => ({
  fixtures: getFixtureTables(state)
})

export type StoreProps = ReturnType<typeof mapStateToProps>
export default connect(mapStateToProps)(Component)
