import * as React from 'react'
import { Header } from 'shared/components/Header/component'
import { Section } from 'shared/components/Section/component'
import { Toolbar } from 'shared/components/Toolbar/component'
import { Fixture } from './components/Fixture'
import { StoreProps } from './Dashboard.container'
import styles from './Dashboard.styles.scss'
import { ViewState } from './models/view-state'

interface Props extends StoreProps {}

export class Dashboard extends React.PureComponent<Props> {
  isLoading() {
    return (
      this.props.viewState === ViewState.Fetching ||
      this.props.viewState === ViewState.PlacingBet
    )
  }

  componentDidMount() {
    window.scrollTo(0, this.props.scrollPosition)
  }

  componentWillUnmount() {
    this.props.saveScrollPosition(window.scrollY)
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
            lineHeight: '22px',
            backgroundColor: 'tan',
            fontWeight: 500,
            boxShadow: '0 1.5px 2px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}
        >
          <span>Bets are locked when the first match of a fixture begins</span>
          <br />
          <span style={{ fontSize: 14 }}>
            For fixture information see details
          </span>
        </div>

        {Object.keys(rounds)
          .map(key => rounds[key])
          .map(round => (
            <React.Fragment key={round.name}>
              <Header>{round.name}</Header>

              <Section>
                {round.fixtures.map((fixture, index) => (
                  <div key={index} className={styles.fixture}>
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
