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
  getColor(selected: boolean): HorseButton.ColorType {
    if (!selected) return 'default'

    // if win/loss
    // win === primary
    // loss === secondary

    return 'tertiary'
  }

  render() {
    const { fixture, placeBet } = this.props

    console.log({ fixture })
    /*
      @placeable
      # selected = tertiary default
      # unselected = default

      @locked
      # selected = tertiary default
      # unselected = outlined default

      @win
      # selected = primary outlined or default
      # unselected = outlined default

      @loss
      # selected = secondary outlined or default
      # unselected = outlined default
    */

    // React wrongly adds the attribute regardless of true | false.
    // Prevent by spreading an object with the attribute.
    const disabled = !fixture.placeable ? { disabled: true } : undefined

    return (
      <div className={styles.root}>
        <div className={styles.team}>
          <horse-button
            fullWidth
            {...disabled}
            color={this.getColor(fixture.betPlacement === BetPlacement.Home)}
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
            fullWidth
            {...disabled}
            color={this.getColor(fixture.betPlacement === BetPlacement.Away)}
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
