import * as React from 'react'
import { Button } from 'shared/components/Button/component'
import { Section } from 'shared/components/Section/component'
import { Header } from 'shared/components/Header/component'
import { Toolbar } from 'shared/components/Toolbar/component'
import { SectionTitle } from 'shared/components/SectionTitle/component'
import { SectionSubtitle } from 'shared/components/SectionSubtitle/component'
import { SectionContent } from 'shared/components/SectionContent/component'
import { StoreProps } from './container'
import { BetPlacement } from '@shared/models/bet-placement'
import { ViewState } from './models/view-state'

interface Props extends StoreProps {}

class EpicHorseLoader extends React.PureComponent<
  { show: boolean },
  { transition: boolean }
> {
  state = { transition: false }

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
    this.props.updateDate()
  }

  render() {
    const { viewState, rounds } = this.props

    return (
      <React.Fragment>
        <EpicHorseLoader
          show={
            viewState === ViewState.Fetching ||
            viewState === ViewState.PlacingBet
          }
        />
        {viewState === ViewState.Interactive &&
          rounds.map(round => (
            <React.Fragment>
              <Header>{round.name}</Header>
              {round.matchDays.map(matchDay => (
                <Section spaced>
                  <SectionTitle>{matchDay.matchDay}</SectionTitle>
                  {matchDay.days.map(day => (
                    <React.Fragment>
                      <SectionSubtitle>{day.weekDay}</SectionSubtitle>

                      <SectionContent>
                        {day.fixtures.map(fixture => (
                          <div>
                            <Button
                              variant={
                                fixture.betPlacement === BetPlacement.Home
                                  ? 'primary'
                                  : 'default'
                              }
                              disabled={!fixture.placeable}
                              onClick={() =>
                                this.props.placeBet(
                                  fixture.awayTeam.name,
                                  fixture.homeTeam.name,
                                  BetPlacement.Home
                                )
                              }
                            >
                              {fixture.homeTeam.name}
                            </Button>
                            {fixture.startTime}
                            <Button
                              variant={
                                fixture.betPlacement === BetPlacement.Away
                                  ? 'primary'
                                  : 'default'
                              }
                              disabled={!fixture.placeable}
                              onClick={() =>
                                this.props.placeBet(
                                  fixture.awayTeam.name,
                                  fixture.homeTeam.name,
                                  BetPlacement.Away
                                )
                              }
                            >
                              {fixture.awayTeam.name}
                            </Button>
                          </div>
                        ))}
                      </SectionContent>
                    </React.Fragment>
                  ))}
                </Section>
              ))}
            </React.Fragment>
          ))}
      </React.Fragment>
    )
  }
}
