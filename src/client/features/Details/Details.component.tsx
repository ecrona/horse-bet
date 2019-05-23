import { BetPlacement } from '@client/../shared/models/bet-placement'
import { MatchWinner } from '@client/../shared/models/match-winner'
import { Toolbar } from '@client/shared/components/Toolbar/component'
import classnames from 'classnames'
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
                <span
                  className={classnames({
                    [styles.teamName]: true,
                    [styles.teamNameWinner]:
                      fixture.matchWinner === MatchWinner.Home,
                    [styles.teamNameLoser]:
                      fixture.matchWinner !== MatchWinner.Home
                  })}
                >
                  {fixture.homeTeam.name}
                </span>
                <img
                  className={classnames({
                    [styles.logo]: true,
                    [styles.logoLoser]: fixture.matchWinner === MatchWinner.Away
                  })}
                  src={fixture.homeTeam.logo}
                />
              </div>

              <div className={styles.score}>{fixture.score || '-'}</div>

              <div className={styles.team}>
                <span
                  className={classnames({
                    [styles.teamName]: true,
                    [styles.teamNameWinner]:
                      fixture.matchWinner === MatchWinner.Away,
                    [styles.teamNameLoser]:
                      fixture.matchWinner !== MatchWinner.Away
                  })}
                >
                  {fixture.awayTeam.name}
                </span>
                <img
                  className={classnames({
                    [styles.logo]: true,
                    [styles.logoLoser]: fixture.matchWinner === MatchWinner.Home
                  })}
                  src={fixture.awayTeam.logo}
                />
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
