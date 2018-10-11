import React from 'react'
import { Button } from 'shared/components/Button/component'
import { Card } from 'shared/components/Card/component'
import { Header } from 'shared/components/Header/component'
import { Toolbar } from 'shared/components/Toolbar/component'

interface Props {}

export class Sandlåda extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <Toolbar />

        <div style={{ paddingTop: 40, paddingBottom: 40, textAlign: 'center' }}>
          <Header>Round of 16th</Header>
        </div>

        <Card spaced>
          <Button>Button</Button>
          <Button disabled>Disabled</Button>
          <Button variant="primary">Primary</Button>
          <Button fullWidth>Full width</Button>
        </Card>
      </div>
    )
  }
}
