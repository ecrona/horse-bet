import * as React from 'react'
import { BetPlacement } from '@shared/models/bet-placement'
import { DashboardFixture } from '../../models/dashboard-fixture'
import styles from './Fixture.styles.scss'
import 'shared/components/horse-button'
import { Information } from './components/Information'
import { MatchWinner } from '@client/../shared/models/match-winner'

interface Props {
  fixture: DashboardFixture
  placeBet: (
    awayTeam: string,
    homeTeam: string,
    placement: BetPlacement
  ) => void
}

export class Fixture extends React.PureComponent<Props> {
  getColor(
    selected: boolean,
    winnerType: MatchWinner,
    matchWinner: MatchWinner
  ): HorseButton.ColorType {
    if (!selected) return 'default'
    if (matchWinner === MatchWinner.None) return 'tertiary'
    if (matchWinner === winnerType) return 'primary'
    return 'secondary'
  }

  render() {
    const { fixture, placeBet } = this.props

    // React wrongly adds the attribute regardless of true | false.
    // Prevent by spreading an object with the attribute.
    const disabled = !fixture.placeable ? { disabled: true } : undefined

    return (
      <div className={styles.container}>
        <div className={styles.matchup}>
          <div className={styles.team}>
            <horse-button
              fullWidth
              {...disabled}
              color={this.getColor(
                fixture.betPlacement === BetPlacement.Home,
                MatchWinner.Home,
                fixture.matchWinner
              )}
              onClick={() =>
                !disabled &&
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
              color={this.getColor(
                fixture.betPlacement === BetPlacement.Away,
                MatchWinner.Away,
                fixture.matchWinner
              )}
              onClick={() =>
                !disabled &&
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

        <div className={styles.information}>
          <Information fixture={fixture} />
        </div>
      </div>
    )
  }
}
