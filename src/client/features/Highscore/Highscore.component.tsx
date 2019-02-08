import React from 'react'
import classnames from 'classnames'
import { Toolbar } from '@client/shared/components/Toolbar/component'
import styles from './Highscore.styles.scss'
import { StoreProps } from './Highscore.container'
import { ViewState } from './models/view-state'
import CircularProgress from '@material-ui/core/CircularProgress'

interface Props extends StoreProps {}

export class Highscore extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchHighscores()
  }

  render() {
    const { viewState, highscores, myHighscore } = this.props

    return (
      <React.Fragment>
        <Toolbar subtitle="Highscore" canGoBack hideHighscore />

        {viewState === ViewState.Fetching && (
          <div className={styles.loader}>
            <CircularProgress size={56} />
          </div>
        )}

        {viewState === ViewState.Highscores && (
          <React.Fragment>
            <div className={styles.spacing} />

            {highscores.map(highscore => (
              <div
                key={highscore.name}
                className={classnames({
                  [styles.item]: true,
                  [styles.me]: highscore.me
                })}
              >
                <span className={styles.rank}>{highscore.rank}</span>
                <span className={styles.name}>
                  {highscore.name} ({highscore.score} rätt)
                </span>
              </div>
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
