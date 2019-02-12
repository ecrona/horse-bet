import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { updateDate } from 'store/common/actions'
import { Layout as Component } from './Layout.component'

const mapStateToProps = mapState(state => ({
  authenticated: state.common.authenticated
}))

const mapDispatchToProps = mapDispatch({
  updateDate
})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Layout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
