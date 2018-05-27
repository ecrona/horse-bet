import * as React from 'react'
import { StoreProps } from './container'

interface Props extends StoreProps {}

export default class Component extends React.PureComponent<Props> {
  render() {
    return <div>hej</div>
  }
}
