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
        <img src={this.props.fixture.awayTeam.logo} />
        {this.props.fixture.bets.map(bet => (
          <div>
            {bet.name} -> {bet.placement}
          </div>
        ))}
      </React.Fragment>
    )
  }
}
