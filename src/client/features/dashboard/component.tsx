import * as React from 'react'
import { Button } from 'shared/components/Button/component'
import { Header } from 'shared/components/Header/component'
import { Section } from 'shared/components/Section/component'
import { SectionContent } from 'shared/components/SectionContent/component'
import { SectionTitle } from 'shared/components/SectionTitle/component'
import { SectionSubtitle } from 'shared/components/SectionSubtitle/component'
import { StoreProps } from './container'
import { ViewState } from './models/view-state'
import { MatchBet } from './components/match-bet'
import { MatchDetail } from './components/match-detail'

interface Props extends StoreProps {}

class EpicHorseLoader extends React.PureComponent<
  { show: boolean },
  { transition: boolean }
> {
  state = { transition: false }

  // How naughty
  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      setTimeout(() => this.setState({ transition: true }))
    }

    if (!nextProps.show) {
      setTimeout(() => this.setState({ transition: false }))
    }
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
    const { viewState, rounds, placeBet, toggleViewState } = this.props

    return (
      <React.Fragment>
        <EpicHorseLoader show={this.isLoading()} />
        {!this.isLoading() &&
          rounds.map(round => (
            <React.Fragment>
              <Header>{round.name}</Header>
              {round.matchDays.map(matchDay => (
                <div style={{ position: 'relative' }}>
                  <Section spaced>
                    <SectionTitle>{matchDay.matchDay}</SectionTitle>
                    {matchDay.days.map(day => (
                      <React.Fragment>
                        <SectionSubtitle>{day.weekDay}</SectionSubtitle>

                        <SectionContent>
                          {day.fixtures.map(fixture => (
                            <React.Fragment>
                              {viewState === ViewState.Bets && (
                                <MatchBet
                                  fixture={fixture}
                                  placeBet={placeBet}
                                />
                              )}
                              {viewState === ViewState.Details && (
                                <MatchDetail fixture={fixture} />
                              )}
                            </React.Fragment>
                          ))}
                        </SectionContent>
                      </React.Fragment>
                    ))}
                    <div
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px'
                      }}
                    >
                      <Button onClick={toggleViewState}>View Details</Button>
                    </div>
                  </Section>
                </div>
              ))}
            </React.Fragment>
          ))}
      </React.Fragment>
    )
  }
}
