import * as React from 'react'
import { Header } from 'shared/components/Header/component'
import { Card } from 'shared/components/Card/component'
import { Toolbar } from 'shared/components/Toolbar/component'

interface Props {}

export class Page extends React.PureComponent<Props> {
  render() {
    return (
      <React.Fragment>
        <Toolbar />

        <Header>Round of 16th</Header>

        <Card>Hello</Card>
      </React.Fragment>
    )
  }
}