import { connect } from 'react-redux'
import { State } from 'store'
import { View } from 'models/view'
import Component from './component'

export interface StoreProps {
  view: View
}

const mapStateToProps = (state: State): StoreProps => ({
  view: state.view
})

export default connect(mapStateToProps)(Component)
