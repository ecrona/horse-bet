import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Layout as Component } from './component'

const mapStateToProps = mapState(state => ({}))

const mapDispatchToProps = mapDispatch({})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Layout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
