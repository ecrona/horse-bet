import * as React from 'react'
import { BetPlacement } from '@shared/models/bet-placement'
import { DashboardFixture } from '../../models/dashboard-fixture'
import styles from './Fixture.styles.scss'
import 'shared/components/horse-button'
import { MatchWinner } from '@client/../shared/models/match-winner'
import { Link } from 'react-router-dom'
import LockIcon from '@material-ui/icons/LockOpen'

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
    const disabled = !fixture.placeable ? { disabled: true } : undefined

    return (
      <div className={styles.container}>
        {fixture.placeable && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 20,
              padding: 12,
              color: 'rgba(0, 0, 0, 0.67)'
            }}
          >
            <LockIcon style={{ fontSize: 16 }} />{' '}
            <span style={{ paddingLeft: 8 }}>
              Locks at {fixture.firstMatchStart}
            </span>
          </div>
        )}

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

        <div style={{ textAlign: 'center', paddingTop: 20 }}>
          <Link
            className={styles.detailsButtonLink}
            to={`/fixture/${fixture.homeTeam.name}/${fixture.awayTeam.name}`}
            title="Click to view fixture details"
          >
            <button className={styles.detailsButton}>View details</button>
          </Link>
        </div>
      </div>
    )
  }
}
