import * as React from 'react'
import { Header } from 'shared/components/Header/component'
import { Section } from 'shared/components/Section/component'
import { StoreProps } from './Dashboard.container'
import { ViewState } from './models/view-state'
import { Fixture } from './components/Fixture'
import { Toolbar } from 'shared/components/Toolbar/component'
import styles from './Dashboard.styles.scss'

interface Props extends StoreProps {}

export class Dashboard extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.getFixtures()
    // TODO: Put this in a layout wrapper
    this.props.updateDate()
  }

  isLoading() {
    return (
      this.props.viewState === ViewState.Fetching ||
      this.props.viewState === ViewState.PlacingBet
    )
  }

  render() {
    const { rounds, placeBet } = this.props

    return (
      <React.Fragment>
        <Toolbar subtitle="Champions League" />

        <div
          style={{
            margin: '16px 0 0',
            padding: '16px',
            borderRadius: 4,
            backgroundColor: 'tan',
            fontWeight: 500,
            boxShadow: '0 1.5px 2px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}
        >
          <span>Betting will be locked after the first match has started</span>
        </div>

        {Object.keys(rounds)
          .map(key => rounds[key])
          .map(round => (
            <React.Fragment>
              <Header>{round.name}</Header>

              <Section>
                {round.fixtures.map((fixture, index) => (
                  <div key={index} className={styles.fixture}>
                    {/* <LockIcon /> */}
                    <Fixture fixture={fixture} placeBet={placeBet} />
                  </div>
                ))}
              </Section>
            </React.Fragment>
          ))}
      </React.Fragment>
    )
  }
}
