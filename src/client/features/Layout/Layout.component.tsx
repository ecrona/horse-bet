import React from 'react'
import { Login } from '../Login/Login.component'
import { StoreProps } from './Layout.container'

export class Layout extends React.Component<StoreProps, any> {
  render() {
    return (
      <React.Fragment>
        {this.props.authenticated && this.props.children}
        {!this.props.authenticated && <Login show />}
      </React.Fragment>
    )
  }
}
