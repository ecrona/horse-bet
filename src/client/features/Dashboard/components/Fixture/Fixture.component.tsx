import { MatchWinner } from '@client/../shared/models/match-winner'
import LockIcon from '@material-ui/icons/LockOpen'
import { BetPlacement } from '@shared/models/bet-placement'
import { format } from 'date-fns'
import * as React from 'react'
import { Link } from 'react-router-dom'
import 'shared/components/horse-button'
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

    window['a'] = fixture.firstMatchStart

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

        <div style={{ textAlign: 'center', paddingTop: 20 }}>
          {fixture.placeable && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 500,
                paddingTop: 20,
                paddingBottom: 4,
                color: 'rgba(0, 0, 0, 0.5)'
              }}
            >
              <LockIcon style={{ fontSize: 16 }} />{' '}
              <span style={{ paddingLeft: 8 }}>
                Betting locks at{' '}
                {format(new Date(fixture.firstMatchStart), 'HH:mm DD/MM')}
              </span>
            </div>
          )}

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
