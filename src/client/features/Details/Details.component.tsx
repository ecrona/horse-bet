import * as React from 'react'
import styles from './Details.styles.scss'
import { Toolbar } from '@client/shared/components/Toolbar/component'
import { StoreProps } from './Details.container'
import { BetPlacement } from '@client/../shared/models/bet-placement'
import { Fixture } from '../Dashboard/components/Fixture'

export class Details extends React.PureComponent<StoreProps> {
  render() {
    const { fixture } = this.props
    console.log(fixture)

    return (
      <React.Fragment>
        <Toolbar subtitle="Game details" canGoBack hideHighscore />

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

        {fixture.bets.map(bet => (
          <div>
            {bet.name} -> {bet.placement}
          </div>
        ))}
      </React.Fragment>
    )
  }
}
