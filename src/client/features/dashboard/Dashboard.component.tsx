import * as React from 'react'
import { Header } from 'shared/components/Header/component'
import { Section } from 'shared/components/Section/component'
import { SectionContent } from 'shared/components/SectionContent/component'
import { SectionTitle } from 'shared/components/SectionTitle/component'
import { SectionSubtitle } from 'shared/components/SectionSubtitle/component'
import { StoreProps } from './Dashboard.container'
import { ViewState } from './models/view-state'
import { Fixture } from './components/Fixture'
import { Toolbar } from 'shared/components/Toolbar/component'

interface Props extends StoreProps {}

class EpicHorseLoader extends React.PureComponent<
  { show: boolean },
  { transition: boolean }
> {
  state = { transition: false }

  // How naughty
  componentDidUpdate(prevProps) {
    // if (this.props.show !== prevProps.show) {
    //   setTimeout(() => this.setState({ transition: this.props.show }))
    // }
  }

  render() {
    return (
      <div
        style={{
          display: this.props.show ? 'flex' : 'none',
          alignItems: 'center',
          height: '50vh'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '180px',
            width: '180px',
            margin: '20px auto',
            background: '#fff',
            boxShadow: '0px 2px 10px 4px #fdfdfd',
            borderRadius: '100%',
            fontFamily: 'Segoe Print',
            fontSize: '24px',
            transform: this.state.transition
              ? 'rotate(8000deg)'
              : 'rotate(0deg)',
            transition: 'transform 20s linear'
          }}
        >
          <img style={{ height: '100px' }} src="/assets/logo.png" />
          <span>Hästbett</span>
        </div>
      </div>
    )
  }
}

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

    // if (this.isLoading()) {
    //   return <EpicHorseLoader show={this.isLoading()} />
    // }

    return rounds.map(round => (
      <React.Fragment>
        <Toolbar />

        <Header>{round.name}</Header>

        {round.matchDays.map(matchDay => (
          <Section spaced>
            <SectionTitle>{matchDay.matchDay}</SectionTitle>

            {matchDay.days.map(day => (
              <React.Fragment>
                <SectionSubtitle>{day.weekDay}</SectionSubtitle>

                <SectionContent>
                  {day.fixtures.map(fixture => (
                    <Fixture fixture={fixture} placeBet={placeBet} />
                  ))}
                </SectionContent>
              </React.Fragment>
            ))}
          </Section>
        ))}
      </React.Fragment>
    ))
  }
}
