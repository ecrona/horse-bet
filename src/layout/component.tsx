import * as React from 'react'
import { View } from 'models/view'
import { StoreProps } from './container'
import dashboard from 'features/dashboard'
import login from 'features/login'

interface Props extends StoreProps {}

export default class Component extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        Layout
        {this.props.view === View.Dashboard ? dashboard : login}
      </div>
    )
  }
}
