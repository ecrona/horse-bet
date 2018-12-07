import * as React from 'react'
import { Button } from 'shared/components/Button/component'
import { BetPlacement } from '@shared/models/bet-placement'
import { DashboardFixture } from '../../models/dashboard-fixture'
import styles from './Fixture.styles.scss'

interface Props {
  fixture: DashboardFixture
  placeBet: (
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) => void
}

export class Fixture extends React.PureComponent<Props> {
  render() {
    const { fixture, placeBet } = this.props

    return (
      <div className={styles.root}>
        <div className={styles.team}>
          <Button
            className={styles.buttonHome}
            disabled={!fixture.placeable}
            selected={fixture.betPlacement === BetPlacement.Home}
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

          <img src={fixture.homeTeam.logo} className={styles.logotype} />
        </div>

        <span className={styles.details}>{fixture.startTime}</span>

        <div className={styles.team}>
          <img src={fixture.awayTeam.logo} className={styles.logotype} />

          <Button
            className={styles.buttonAway}
            disabled={!fixture.placeable}
            selected={fixture.betPlacement === BetPlacement.Away}
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
      </div>
    )
  }
}
