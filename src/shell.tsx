import * as React from 'react'
import { Header } from './shared/components/Header/component'
import { Button } from './shared/components/Button/component'
import { Card } from 'shared/components/Card/component'
import { Toolbar } from 'shared/components/Toolbar/component'

interface Props {}

export class Shell extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <Toolbar />
        <Header>Header</Header>

        <Button>Button</Button>
        <Button disabled>Disabled</Button>
        <Button variant="primary">Primary</Button>
        <Button fullWidth>Full width</Button>

        <Card>Big card</Card>
        <Card spaced>Spacey</Card>
      </div>
    )
  }
}
