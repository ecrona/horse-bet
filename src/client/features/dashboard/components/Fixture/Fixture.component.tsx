import * as React from 'react'
import { BetPlacement } from '@shared/models/bet-placement'
import { DashboardFixture } from '../../models/dashboard-fixture'
import styles from './Fixture.styles.scss'
import 'shared/components/horse-button'

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

    /*
      Button states
      - Selectable & not selected
        # Grey color, normal button state
      - Selectable & selected
        # Green color & white text, normal button state
      - Not selected & disabled
        # Grey color & outlined button
      - Selected & disabled
        # Green color & outlined button
      - Selected & lost
        
      - Selected & won
    */

    return (
      <div className={styles.root}>
        <div className={styles.team}>
          <horse-button
            fullWidth
            disabled={!fixture.placeable}
            color={
              fixture.betPlacement === BetPlacement.Home ? 'primary' : undefined
            }
            onClick={() =>
              placeBet(
                fixture.awayTeam.name,
                fixture.homeTeam.name,
                BetPlacement.Home
              )
            }
          >
            <div className={styles.buttonHome}>
              <img src={fixture.homeTeam.logo} className={styles.logotype} />
              <span>{fixture.homeTeam.name}</span>
            </div>
          </horse-button>
        </div>

        <span className={styles.details}>{fixture.score || '-'}</span>

        <div className={styles.team}>
          <horse-button
            disabled={!fixture.placeable}
            fullWidth
            color={
              fixture.betPlacement === BetPlacement.Away ? 'primary' : undefined
            }
            onClick={() =>
              placeBet(
                fixture.awayTeam.name,
                fixture.homeTeam.name,
                BetPlacement.Away
              )
            }
          >
            <div className={styles.buttonAway}>
              <span>{fixture.awayTeam.name}</span>
              <img src={fixture.awayTeam.logo} className={styles.logotype} />
            </div>
          </horse-button>
        </div>
      </div>
    )
  }
}
