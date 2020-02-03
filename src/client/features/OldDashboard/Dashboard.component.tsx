import { bind } from 'bind-decorator'
import { debounce } from 'debounce'
import * as React from 'react'
import Toolbar from 'shared/components/Toolbar'
import { StoreProps } from './Dashboard.container'
import { ViewState } from '../Dashboard/models/view-state'

interface Props extends StoreProps {}

export class Dashboard extends React.PureComponent<Props> {
  constructor(props) {
    super(props)

    this.onScroll = debounce(this.onScroll, 200)
  }

  isLoading() {
    return (
      this.props.viewState === ViewState.Fetching ||
      this.props.viewState === ViewState.PlacingBet
    )
  }

  @bind
  onScroll() {
    this.props.saveScrollPosition(window.scrollY)
  }

  componentDidMount() {
    window.scrollTo(0, this.props.scrollPosition)
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
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
      </React.Fragment>
    )
  }
}
