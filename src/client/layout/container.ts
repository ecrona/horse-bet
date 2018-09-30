import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { load } from 'store/view/actions'
import { Layout as Component } from './component'

const mapStateToProps = mapState(state => ({
  view: state.view
}))

const mapDispatchToProps = mapDispatch({
  load
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Layout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
