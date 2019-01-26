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
            // disabled={!fixture.placeable}
            selected={fixture.betPlacement === BetPlacement.Home}
            onClick={() =>
              placeBet(
                fixture.awayTeam.name,
                fixture.homeTeam.name,
                BetPlacement.Home
              )
            }
          >
            <img src={fixture.homeTeam.logo} className={styles.logotype} />
            <span>{fixture.homeTeam.name}</span>
          </Button>
        </div>

        <span className={styles.details}>
          {fixture.score || fixture.startTime || 'vs'}
        </span>

        <div className={styles.team}>
          <Button
            className={styles.buttonAway}
            // disabled={!fixture.placeable}
            selected={fixture.betPlacement === BetPlacement.Away}
            onClick={() =>
              placeBet(
                fixture.awayTeam.name,
                fixture.homeTeam.name,
                BetPlacement.Away
              )
            }
          >
            <span>{fixture.awayTeam.name}</span>
            <img src={fixture.awayTeam.logo} className={styles.logotype} />
          </Button>
        </div>
      </div>
    )
  }
}
