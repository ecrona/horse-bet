import { connect } from 'react-redux'
import { State } from 'store'
import { View } from 'models/view'
import Component from './component'

const mapStateToProps = (state: State) => ({
  view: state.view
})

export type StoreProps = ReturnType<typeof mapStateToProps>
export default connect(mapStateToProps)(Component)
