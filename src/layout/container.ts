import { connect } from 'react-redux'
import { State } from 'store'
import { View } from 'models/view'
import Component from './component'
import { load } from 'store/view/actions'

const mapStateToProps = (state: State) => ({
  view: state.view
})

const mapDispatchToProps = (dispatch: any) => ({
  load: () => dispatch(load())
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>
export default connect(mapStateToProps, mapDispatchToProps)(Component)
