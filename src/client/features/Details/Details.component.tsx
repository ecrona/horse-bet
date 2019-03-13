import { BetPlacement } from '@client/../shared/models/bet-placement'
import { Toolbar } from '@client/shared/components/Toolbar/component'
import * as React from 'react'
import { Information } from './components/Information'
import { StoreProps } from './Details.container'
import styles from './Details.styles.scss'

export class Details extends React.PureComponent<StoreProps> {
  componentWillMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { fixture } = this.props

    const percentage =
      fixture &&
      Math.round(
        (fixture.bets.filter(bet => bet.placement === BetPlacement.Home)
          .length /
          fixture.bets.length) *
          100
      )

    return (
      <React.Fragment>
        <Toolbar subtitle="Fixture details" canGoBack hideHighscore />

        {fixture && (
          <React.Fragment>
            <div className={styles.container}>
              <div className={styles.team}>
                <span className={styles.teamName}>{fixture.homeTeam.name}</span>
                <img className={styles.logo} src={fixture.homeTeam.logo} />
              </div>

              <div className={styles.score}>{fixture.score || '-'}</div>

              <div className={styles.team}>
                <span className={styles.teamName}>{fixture.awayTeam.name}</span>
                <img className={styles.logo} src={fixture.awayTeam.logo} />
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                marginBottom: 24,
                padding: '16px 0',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
              <Information fixture={this.props.fixture} />
            </div>

            {!!fixture.bets.length && (
              <div className={styles.percentage}>
                <div
                  className={styles.percentageHomeTeam}
                  style={{ width: `${percentage}%` }}
                >
                  {percentage}%
                </div>

                <div className={styles.percentageAwayTeam}>
                  {100 - percentage}%
                </div>
              </div>
            )}

            <div>
              {fixture.bets.map((bet, index) => (
                <div key={index} className={styles.listItem}>
                  {bet.placement === BetPlacement.Home && (
                    <img
                      className={styles.listItemLogo}
                      src={fixture.homeTeam.logo}
                    />
                  )}
                  {bet.placement === BetPlacement.Away && (
                    <img
                      className={styles.listItemLogo}
                      src={fixture.awayTeam.logo}
                    />
                  )}

                  {bet.name}
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
