import * as React from 'react'
import { StoreProps } from './container'

interface Props extends StoreProps {}

export class Dashboard extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.getFixtures()
  }

  render() {
    console.log(this.props)

    return <div>hej</div>
  }
}
