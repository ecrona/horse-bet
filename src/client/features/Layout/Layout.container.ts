import React from 'react'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from 'store'
import { Layout as Component } from './Layout.component'

const mapStateToProps = mapState(state => ({
  authenticated: state.common.authenticated
}))

const mapDispatchToProps = mapDispatch({})

export type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const Layout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
