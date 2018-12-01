import * as React from 'react'
import { DashboardFixture } from '../../models/dashboard-fixture'

interface Props {
  fixture: DashboardFixture
}

export class MatchDetail extends React.PureComponent<Props> {
  render() {
    const { fixture } = this.props

    return (
      <div style={{ background: 'grey' }}>
        <div>{fixture.homeTeam.name}</div>
        Ended
        <div>{fixture.awayTeam.name}</div>
      </div>
    )
  }
}
