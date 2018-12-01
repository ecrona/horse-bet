import * as React from 'react'
import { Button } from 'shared/components/Button/component'
import { BetPlacement } from '@shared/models/bet-placement'
import { DashboardFixture } from '../../models/dashboard-fixture'

interface Props {
  fixture: DashboardFixture
  placeBet: (
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) => void
}

export class MatchBet extends React.PureComponent<Props> {
  render() {
    const { fixture, placeBet } = this.props

    return (
      <div>
        <Button
          variant="primary"
          disabled={!fixture.placeable}
          onClick={() =>
            placeBet(
              fixture.awayTeam.name,
              fixture.homeTeam.name,
              BetPlacement.Home
            )
          }
        >
          {fixture.homeTeam.name}
        </Button>
        {fixture.startTime}
        <Button
          variant={
            fixture.betPlacement === BetPlacement.Away ? 'primary' : 'default'
          }
          disabled={!fixture.placeable}
          onClick={() =>
            placeBet(
              fixture.awayTeam.name,
              fixture.homeTeam.name,
              BetPlacement.Away
            )
          }
        >
          {fixture.awayTeam.name}
        </Button>
      </div>
    )
  }
}
