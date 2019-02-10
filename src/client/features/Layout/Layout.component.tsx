import React from 'react'
import { Login } from '../Login/Login.component'
import { StoreProps } from './Layout.container'

export class Layout extends React.PureComponent<StoreProps, any> {
  componentDidMount() {
    this.props.updateDate()
  }

  render() {
    return <Login show />
    return (
      <React.Fragment>
        {this.props.authenticated && this.props.children}
        {!this.props.authenticated && <Login show />}
      </React.Fragment>
    )
  }
}
