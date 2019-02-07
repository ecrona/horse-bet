import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Details as Component } from './Details.component'

const mapStateToProps = mapState(state => ({}))

const mapDispatchToProps = mapDispatch({})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Details = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
