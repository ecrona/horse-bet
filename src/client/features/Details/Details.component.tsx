import * as React from 'react'
import styles from './Details.styles.scss'
import { Toolbar } from '@client/shared/components/Toolbar/component'
import { StoreProps } from './Details.container'
import { BetPlacement } from '@client/../shared/models/bet-placement'

export class Details extends React.PureComponent<StoreProps> {
  render() {
    console.log(this.props.fixture)

    return (
      <React.Fragment>
        <Toolbar subtitle="Game details" canGoBack hideHighscore />

        <div className={styles.container}>
          <div>
            <img src={this.props.fixture.homeTeam.logo} />
          </div>

          <div>{this.props.fixture.score}</div>

          <div>
            <img src={this.props.fixture.awayTeam.logo} />
          </div>
        </div>

        {this.props.fixture.bets.map(bet => (
          <div>
            {bet.name} -> {bet.placement}
          </div>
        ))}
      </React.Fragment>
    )
  }
}
